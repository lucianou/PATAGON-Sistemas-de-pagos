import { useState, useEffect } from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import Notification_dashboard from '../../public/Components/notificaciones/notificaciones_dashboard';
import styles from '../styles/requests.module.css';
import Card from '../../public/Components/RequestCard/Card';
import refreshAccessToken from '../../public/Components/RefreshToken';
import Notifications from './Notifications';

const Solicitudes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [filter, setFilter] = useState('pendiente'); 
  const ipserver = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://${ipserver}:${port}/api/command/requests`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if(response.status == 403){
          return refreshAccessToken().then(newToken => {
            return fetch(`http://${ipserver}:${port}/api/command/users`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newToken}` 
              }
            });
          });
        }

        if (!response.ok) {
          throw new Error('Error en la red al obtener las solicitudes');
        }

        const data = await response.json();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const updateSolicitudes = (updatedSolicitud) => {
    setSolicitudes(prevSolicitudes => 
      prevSolicitudes.map(solicitud => 
        solicitud.ID_request === updatedSolicitud.ID_request ? updatedSolicitud : solicitud
      )
    );
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    switch (filter) {
      case 'pendiente':
        return solicitud.estado === 'pendiente';
      case 'aceptado':
        return solicitud.estado === 'aceptado';
      case 'rechazado':
        return solicitud.estado === 'rechazado';
      default:
        return true;
    }
  });

  return (
    <div className={styles.SolicitudesContainer}>
      <MenuDashboard toggleMenu={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <Notifications/>
      
      <main className={`${styles.content} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h1>Solicitudes</h1>
          <Notification_dashboard />
        </div>

        <div className={styles.filterButtons}>
          <button className={filter === 'pendiente' ? styles.active : ''} onClick={() => setFilter('pendiente')}>Pendientes</button>
          <button className={filter === 'aceptado' ? styles.active : ''} onClick={() => setFilter('aceptado')}>Aceptadas</button>
          <button className={filter === 'rechazado' ? styles.active : ''} onClick={() => setFilter('rechazado')}>Rechazadas</button>
        </div>

        <div className={styles.solicitudesList}>
          {filteredSolicitudes.length > 0 ? (
            filteredSolicitudes.map((solicitud) => (
              <Card key={solicitud.ID_request} solicitud={solicitud} updateSolicitudes={updateSolicitudes} />
            ))
          ) : (
            <p>No hay solicitudes disponibles.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Solicitudes;