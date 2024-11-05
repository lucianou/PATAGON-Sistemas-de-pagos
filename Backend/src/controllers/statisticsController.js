import LoginHistory from "../models/loginHistory.js";
import Orders from "../models/transactions.js";
import { Sequelize, Op } from "sequelize";

//Obtener los datos de de registro de usuarios
export async function getUsersStats(req, res) {
  try {
    const users = await LoginHistory.findAll({
      attributes: ['user', 'login_time'],
      order: [['nombre', 'ASC']],
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
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 6);  

    // Consultar el número de usuarios registrados agrupados por día
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

    // Convertir los resultados en un objeto clave-valor para un fácil acceso
    const usersCount = {};
    users.forEach((record) => {
      usersCount[record.get('date')] = parseInt(record.get('count'), 10);
    });

    // Generar los últimos 7 días en formato YYYY-MM-DD
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      const dateKey = date.toISOString().slice(0, 10); // Formato YYYY-MM-DD

      // Agregar al resultado la cuenta o 0 si no hay registros para ese día
      result.push({ date: dateKey, count: usersCount[dateKey] || 0 });
    }

    res.json(result);
  } catch (error) {
    console.error('Error al obtener los datos de registro de usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los datos de registro de usuarios' });
  }
}


export async function getUsersStats3Months(req, res) {
  try {
    // Obtener la fecha actual y la fecha hace 3 meses
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 2); // Incluye el mes actual y los dos anteriores

    // Consultar el número de usuarios registrados agrupados por año y mes
    const users = await LoginHistory.findAll({
      attributes: [
        [Sequelize.fn('TO_CHAR', Sequelize.col('login_time'), 'YYYY-MM'), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('user')), 'count']
      ],
      where: {
        login_time: { [Op.gte]: threeMonthsAgo }
      },
      group: [Sequelize.fn('TO_CHAR', Sequelize.col('login_time'), 'YYYY-MM')],
      order: [[Sequelize.fn('TO_CHAR', Sequelize.col('login_time'), 'YYYY-MM'), 'ASC']]
    });

    // Convertir los resultados en un objeto clave-valor para un fácil acceso
    const usersCount = {};
    users.forEach((record) => {
      usersCount[record.get('month')] = parseInt(record.get('count'), 10);
    });

    // Generar los últimos tres meses en formato YYYY-MM
    const result = [];
    for (let i = 2; i >= 0; i--) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);
      const monthKey = date.toISOString().slice(0, 7); // Formato YYYY-MM

      // Agregar al resultado la cuenta o 0 si no hay registros para ese mes
      result.push({ month: monthKey, count: usersCount[monthKey] || 0 });
    }

    res.json(result);
  } catch (error) {
    console.error('Error al obtener los datos de registro de usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los datos de registro de usuarios' });
  }
}



//obtener ganancias totales
export async function getGananciasTotales(req, res) {
  try {
    const orders = await Orders.findAll({
      attributes: ['amount'],
      where: { status: "Pagado" },
    });

    const totalGanancias = orders.reduce((total, order) => {
      // Convertir order.amount a número usando parseFloat
      return total + parseFloat(order.amount) || 0; // Usa || 0 para manejar posibles NaN
    }, 0);

    res.json({ totalGanancias });
  } catch (error) {
    console.error('Error al obtener las ganancias totales:', error);
    res.status(500).json({ error: 'Error al obtener las ganancias totales' });
  }
}

//obtener todos los ingresos con sus detalles
export async function getIngresos(req, res) {
  try {
    const orders = await Orders.findAll({
      attributes: ['user_email', 'amount', 'payment_method', 'created_at'],
    });

    res.json(orders);
  } catch (error) {
    console.error('Error al obtener los ingresos:', error);
    res.status(500).json({ error: 'Error al obtener los ingresos' });
  }
}