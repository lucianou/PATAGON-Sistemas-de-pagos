import { Server } from 'socket.io';

export function configureSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",  // Puedes especificar los orígenes permitidos
    }
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Desconexión del cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });

    // Aquí puedes agregar más lógica de eventos si es necesario
    // socket.on('algúnEvento', (data) => { ... });
  });

  return io;  
}
