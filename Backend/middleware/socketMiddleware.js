export const addSocketIo = (io) => {
    return (req, res, next) => {
      req.io = io;  // Agregar `io` al request
      next();  // Continuar al siguiente middleware o ruta
    };
  };
  