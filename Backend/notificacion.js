// npm install express socket.io mysql2
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = mysql.createConnection({
    host: 'localhost',    // Cambia por tu host
    user: 'root',         // Cambia por tu usuario MySQL
    password: 'password', // Cambia por tu contraseña MySQL
    database: 'pagos_patagon' // Cambia por el nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos MySQL:', err);
    } else {
        console.log('Conectado a la base de datos MySQL.');
    }
});

const port = 3004;

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

function getUserData(rut, callback) {
    const query = 'SELECT * FROM usuarios WHERE rut = ?';

    db.query(query, [rut], (err, result) => {
        if (err) {
            console.error(err);
            callback(null);
        } else {
            callback(result[0]); // El RUT es unico asi que se devuelve el primer resultado
        }
    });
}

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('joinAdmin', (rol) => {
        if (rol === 'admin') {
            socket.join('admin');
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
    const requestedHours = req.body.horas;

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
                db.query('UPDATE usuarios SET horas_restantes = horas_restantes - ? WHERE rut = ?', [requestedHours, rut], (err, result) => {
                    if (err) {
                        console.error('Error al actualizar las horas restantes:', err);
                    } else {
                        console.log(`Horas restantes actualizadas para el usuario ${user.nombre}.`);
                    }
                });
            } else {
                console.log(`Usuario ${user.nombre} no tiene horas suficientes. Horas restantes: ${user.horas_restantes}, Horas solicitadas: ${requestedHours}`);
            }
        } else {
            console.log(`Usuario con RUT ${rut} no encontrado.`);
        }

        next(); // Continuar con el procesamiento de la solicitud
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
