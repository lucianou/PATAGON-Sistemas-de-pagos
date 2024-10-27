import LoginHistory from "../models/loginHistory.js";


//Obtener los datos de de registro de usuarios
export async function getUsersStats(req, res) {
  try {
    const users = await LoginHistory.findAll({
      attributes: ['user', 'login_time'],
      order: [['login_time', 'DESC']],
    });
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los datos de registro de usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los datos de registro de usuarios' });
  }
}
