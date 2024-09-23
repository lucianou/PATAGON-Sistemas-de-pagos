//para validar solicitudes de logeo/registro solo desde el frontend
export const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }
  next();
};