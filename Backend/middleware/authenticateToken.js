import jwt from 'jsonwebtoken';

// Middleware para verificar el token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token del encabezado

  if (token == null) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user; // Agregar la información del usuario al objeto de solicitud
    next(); // Continuar con la solicitud
  });
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next(); // El usuario tiene acceso
  };
}

export {authenticateToken, authorizeRoles};
