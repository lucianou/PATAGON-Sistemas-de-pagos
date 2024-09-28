import { useState , useEffect} from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import Notification_dashboard from '../../public/Components/notificaciones/notificaciones_dashboard';
import { fetchSolicitudes } from '../Hooks/solicitudes';
import styles from '../styles/requests.module.css'
import Notifications from './Notifications';
import Card from '../../public/Components/RequestCard/Card';


const Solicitudes = () =>{
  const [isOpen, setIsOpen] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null); 
  const ipserver = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT; 

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const token = localStorage.getItem('token'); // Obtén el token almacenado
  
      try {
        const response = await fetch(`http://${ipserver}:${port}/api/command/requests`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Envía el token en los headers
          }
        });
  
        if (!response.ok) {
          throw new Error('Error en la red al obtener las solicitudes'); // Manejo de errores
        }
  
        const data = await response.json(); // Convierte la respuesta a JSON
        setSolicitudes(data); // Actualiza el estado con las solicitudes
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };
  
    fetchSolicitudes(); // Llama a la función para obtener las solicitudes
  }, []);
  


  return(
    <div className={styles.SolicitudesContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />
       <main className={`${styles.content} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h1>Solicitudes</h1>
          <Notification_dashboard/>
        </div>
       
        <div className={styles.solicitudesList}>
          {solicitudes.length > 0 ? (
              solicitudes.map((solicitud) => (
      <Card key={solicitud.ID_request} solicitud={solicitud} />
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