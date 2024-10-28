import LoginHistory from "../models/loginHistory.js";
import { Sequelize, Op } from "sequelize";

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


// Obtener la cantidad de usuarios que ingresaron por día en los últimos 7 días
export async function getUsersStatsWeek(req, res) {
  try {
    // Obtener la fecha actual y la fecha hace 7 días
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);  

    const users = await LoginHistory.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('login_time')), 'date'],  
        [Sequelize.fn('COUNT', Sequelize.col('user')), 'count']        
      ],
      where: {
        login_time: { [Op.gte]: sevenDaysAgo }  
      },
      group: [Sequelize.fn('DATE', Sequelize.col('login_time'))],     
      order: [[Sequelize.fn('DATE', Sequelize.col('login_time')), 'ASC']] 
    });

   
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los datos de registro de usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los datos de registro de usuarios' });
  }
}

