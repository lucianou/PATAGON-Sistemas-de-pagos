import React, { useState, useEffect } from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import Card from '../../public/Components/Tarjeta/Card.jsx';
import style1 from '../styles/DashboardGeneral.module.css'; // Para Menu
import style from '../styles/Dashboard.module.css'; // Para Bolsas
import Notification_dashboard from '../../public/Components/notificaciones/notificaciones_dashboard.jsx';
import refreshAccessToken from '../../public/Components/RefreshToken';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bolsas, setBolsas] = useState([]); 
  const ipserver = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;

  
  useEffect(() => {
    const fetchBolsas = async () => {
      const token = localStorage.getItem('token'); 
  
      try {
        const response = await fetch(`http://${ipserver}:${port}/api/bolsas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        if(response.status == 403){
          return refreshAccessToken().then(newToken => {
            return fetch(`http://${ipserver}:${port}/api/bolsas`,{
              method: 'GET',
              headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newToken}` 
              }
            });
          });
        }

        if (!response.ok) {
          throw new Error('Error en la red al obtener las bolsas'); 
        }
  
        const data = await response.json(); 
        setBolsas(data);
      } catch (error) {
        console.error('Error al obtener las bolsas:', error);
      }
    };
  
    fetchBolsas();
  }, []);
  

  return (
    <div className={style1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />
      <main className={`${style1.content} ${isOpen ? style1.open : ''}`}>
        <div className={style1.header}>
          <h1>Dashboard</h1>
          <Notification_dashboard/>
        </div>

        <div className={style.dashboardWidgets}>
          { (
            bolsas.map((bolsa, index) => ( // Itera sobre las bolsas obtenidas y muestra una Card para cada una
              <Card
                key={index} // Asegúrate de usar un key único
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
