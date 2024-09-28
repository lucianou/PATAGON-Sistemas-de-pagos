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

  const obtenerSolicitudes = async () => {
    try {
      const data = await fetchSolicitudes();
      setSolicitudes(data); 
    } catch (error) {
      setError('Error al obtener las solicitudes'); 
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);


  return(
    <div className={styles.SolicitudesContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />
      <Notifications/>

      <main className={`${styles.content} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h1>Solicitudes</h1>
          <Notification_dashboard />
        </div>
       
        <div className={styles.solicitudesList}>
          {solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => (
              <Card key={solicitud.id} solicitud={solicitud} />
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