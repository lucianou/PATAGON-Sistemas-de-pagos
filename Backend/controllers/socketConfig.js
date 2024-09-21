// controllers/socketConfig.js
import { Server } from 'socket.io';

export const configureSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // Escucha un evento
    socket.on('testEvent', (data) => {
      console.log('Datos recibidos:', data);
      // Emitir un evento de vuelta al cliente
      socket.emit('responseEvent', { message: '¡Conexión exitosa!' });
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });

  return io;
};
