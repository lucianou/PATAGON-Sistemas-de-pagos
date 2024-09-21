// socket.js
import { Server } from 'socket.io';

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Cambiar en producción, va la ip del dominio del front
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
  });

  return io;
}
