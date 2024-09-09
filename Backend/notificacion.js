const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = new sqlite3.Database('./usuarios.db');

const port = 3000;

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

function getUserData(rut, callback) {
    const query = 'SELECT * FROM usuarios WHERE rut = ?';

    db.get(query, [rut], (err, row) => {
        if (err) {
            console.error(err);
            callback(null);
        } else {
            callback(row);
        }
    });
}

// Configurar Socket.io para manejar las conexiones de los administradores
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Evento para unir a un administrador a la sala "admin"
    socket.on('joinAdmin', (rol) => {
        if (rol === 'admin') {
            socket.join('admin'); // Unir al cliente a la sala "admin"
            console.log('Un administrador se ha conectado');
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Middleware para procesar las solicitudes y enviar notificaciones
app.use((req, res, next) => {
    const rut = req.headers['user-rut'];
    const requestedHours = req.body.horas; // Horas requeridas en la solicitud

    getUserData(rut, (user) => {
        if (user) {
            if (user.horas_restantes >= requestedHours) {
                const notificationMessage = `
                    Nueva solicitud recibida de ${user.nombre} (${user.rut}):
                    Método: ${req.method}
                    Ruta: ${req.path}
                    Fecha y hora: ${new Date().toLocaleString()}
                    Empresa: ${user.empresa}
                    Horas restantes: ${user.horas_restantes}
                    Horas solicitadas: ${requestedHours}
                `;

                io.to('admin').emit('newNotification', notificationMessage);

                db.run('UPDATE usuarios SET horas_restantes = horas_restantes - ? WHERE rut = ?', [requestedHours, rut]);

                console.log(`Solicitud procesada. Usuario ${user.nombre}, horas restantes actualizadas.`);
            } else {
                console.log(`Usuario ${user.nombre} no tiene horas suficientes. Horas restantes: ${user.horas_restantes}, Horas solicitadas: ${requestedHours}`);
            }
        } else {
            console.log(`Usuario con RUT ${rut} no encontrado.`);
        }

        next();
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
