import React, { useState, useEffect } from 'react';
import MenuDashboard from '../../../public/Components/menuDashboard/menuDashboard.jsx';
import Card from '../../../public/Components/Tarjeta/Card.jsx';
import styles1 from '../../styles/DashboardGeneral.module.css'; // Para Menu
import styles from '../../styles/Dashboard.module.css'; // Para Bolsas
import Notification_dashboard from '../../../public/Components/notificaciones/notificaciones_dashboard.jsx';
import refreshAccessToken from '../../../public/Components/RefreshToken.jsx';
import logo from '../../assets/SoloLogo_Patagon.png';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bolsas, setBolsas] = useState([]); 
  const ipserver = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;
  const token = localStorage.getItem('token'); 
  const decodedToken = jwtDecode(token); 
  const userRole = decodedToken.rol; 

  useEffect(() => {
    const fetchBolsas = async () => {
      const token = localStorage.getItem('token'); 
  
      try {
        const response = await fetch(`http://${ipserver}:${port}/api/command/get-products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        if(response.status == 403){
          return refreshAccessToken().then(newToken => {
            return fetch(`http://${ipserver}:${port}/api/command/get-products`,{
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
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />

      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon}/>
            <h1>Dashboard</h1>
          </div>
         {userRole === 'Administrador' && <Notification_dashboard />}
        </div>
        <div className={styles.dashboardWidgets}>
          { (
            bolsas.map((bolsa, index) => {
              const delay = `${index * 100}ms`; // Incrementar el delay por cada usuario
              return ( // Itera sobre las bolsas obtenidas y muestra una Card para cada una
                <Card
                  key={index} // Asegúrate de usar un key único
                  nombre={bolsa.nombre}
                  tiempo={bolsa.tiempo}
                  precio={bolsa.precio}
                  detalles={bolsa.detalles} // Pasamos el arreglo de detalles
                  delay={delay} // Pasamos el delay como prop
                  ID = {bolsa.ID}
                />
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
