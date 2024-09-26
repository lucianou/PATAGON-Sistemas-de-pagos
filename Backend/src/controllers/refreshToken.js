import { pool } from "../middleware/authenticateDB.js";
import jwt from "jsonwebtoken"; 
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

export async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh Token requerido' });
  }

  try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
      const { email, username, rol } = decoded;

      // Generar un nuevo Access Token
      const newAccessToken = jwt.sign(
          { email, username, rol },
          SECRET_KEY,
          { expiresIn: '1h' }
      );

      const newRefreshToken = jwt.sign(
          { email, username, rol },
          REFRESH_SECRET_KEY,
          { expiresIn: '30d' }
      );

      //Actualizar el Refresh Token en la base de datos si lo estás rotando
      await pool.query('UPDATE public."Users" SET refresh_token = $1 WHERE email = $2', [newRefreshToken, email]);

      res.status(200).json({
          token: newAccessToken,
          refreshToken: newRefreshToken, // Enviar solo si se está regenerando
      });

  } catch (error) {
      console.error('Error al verificar el Refresh Token', error);
      res.status(401).json({ error: 'Token inválido o expirado' });
  }
}
