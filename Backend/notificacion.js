const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = new sqlite3.Database('./usuarios.db');

const port = 3000;

// Middleware para manejar solicitudes y enviar notificaciones
app.use(express.json()); // Para manejar JSON en las solicitudes

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

                // Enviar notificación a todos los clientes conectados
                io.emit('newNotification', notificationMessage);

                // Aquí puedes descontar las horas solicitadas de las horas restantes, si es necesario
                db.run('UPDATE usuarios SET horas_restantes = horas_restantes - ? WHERE rut = ?', [requestedHours, rut]);
                
            } else {
                console.log(`Usuario ${user.nombre} no tiene horas suficientes. Horas restantes: ${user.horas_restantes}, Horas solicitadas: ${requestedHours}`);
            }
        } else {
            console.log(`Usuario con RUT ${rut} no encontrado.`);
        }

        next();
    });
});

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});