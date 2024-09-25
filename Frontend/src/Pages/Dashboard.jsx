import React, { useState, useEffect } from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import Card from '../../public/Components/Tarjeta/Card.jsx';
import style1 from '../styles/DashboardGeneral.module.css'; // Para Menu
import style from '../styles/Dashboard.module.css'; // Para Bolsas
import Notifications from './Notifications.jsx';
import Notification_dashboard from '../../public/Components/notificaciones/notificaciones_dashboard.jsx';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bolsas, setBolsas] = useState([]); // Estado para almacenar las bolsas
  const ipserver = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;

  
  useEffect(() => {
    const fetchBolsas = async () => {
      try {
        const response = await fetch(`http://${ipserver}:${port}/api/bolsas`); // URL del endpoint
        if (!response.ok) {
          throw new Error('Error en la red al obtener las bolsas'); // Manejo de errores
        }
        const data = await response.json(); // Convierte la respuesta a JSON
        setBolsas(data); // Actualiza el estado con las bolsas
      } catch (error) {
        console.error('Error al obtener las bolsas:', error);
      }
    };

    fetchBolsas(); // Llama a la función para obtener las bolsas
  }, []);

  return (
    <div className={style1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />
      <Notifications />

      <main className={`${style1.content} ${isOpen ? style1.open : ''}`}>
        <div className={style1.header}>
          <h1>Dashboard</h1>
          <Notification_dashboard />
        </div>

        <div className={style.dashboardWidgets}>
          { (
            bolsas.map(bolsa => ( // Itera sobre las bolsas obtenidas y muestra una Card para cada una
              <Card
                key={bolsa.id} // Asegúrate de usar un key único
                nombre={bolsa.nombre}
                tiempo={bolsa.tiempo}
                precio={bolsa.precio}
                detalles={bolsa.detalles} // Pasamos el arreglo de detalles
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
