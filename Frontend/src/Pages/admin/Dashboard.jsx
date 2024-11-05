import React, { useState, useEffect } from 'react';
import MenuDashboard from '../../../public/Components/menuDashboard/menuDashboard.jsx';
import styles1 from '../../styles/DashboardGeneral.module.css'; // Para Menu
import styles from '../../styles/Dashboard.module.css';
import Notification_dashboard from '../../../public/Components/notificaciones/notificaciones_dashboard.jsx';
import refreshAccessToken from '../../../public/Components/RefreshToken.jsx';
import logo from '../../assets/SoloLogo_Patagon.png';
import LinearGraphic from "../../../public/Components/Graphics/LinearGraphic.jsx";
import CircularGraphic from "../../../public/Components/Graphics/CircularGraphic.jsx";
import { jwtDecode } from 'jwt-decode';
import { FaDollarSign, FaUsers, FaChartLine } from 'react-icons/fa'; // Importa íconos específicos



// Componente para cada card de información importante con íconos
const InfoCard = ({ title, value, change, icon }) => (
  <div className={styles.infoCard}>
    <div className={styles.iconContainer}>{icon}</div>
    <div className={styles.textContainer}>
      <h2>{title}</h2>
      <p>${value}</p>
      {change && <span>{change}</span>}
    </div>
  </div>
);

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ipserver = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.rol;
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    const fetchDataWeek = async () => {
      try {
        const response = await fetch(`http://${ipserver}:3003/api/command/get-users-stats-week`);
        const result = await response.json();

        const newLabels = result.map(item => item.date); 
        const newDataPoints = result.map(item => item.count);

        setLabels(newLabels);
        setDataPoints(newDataPoints);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
      }
    };

    fetchDataWeek();
  }, []);

  useEffect(() => {
    const obtenerIngresos = async () => {
      try {
        const response = await fetch(`http://${ipserver}:${port}/api/command/get-total-gains`);
        const ingresosUsers = await response.json();
        setIngresos(ingresosUsers); 
      } catch (error) {
        console.error('Error fetching ingresos:', error);
      }
    };
    obtenerIngresos(); 
  }, []);

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />
      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon} />
            <h1>Dashboard</h1>
          </div>
          {userRole === 'Administrador' && <Notification_dashboard />}
        </div>

        {/* Contenedor de las 3 cards superiores */}
        <div className={styles.cardContainer}>
          <InfoCard title="Total ingresos" value={ingresos.totalGanancias} change="+2,031" icon={<FaDollarSign />} />
          <InfoCard title="Usuarios registrados" value="221,324" change="-$2,201" icon={<FaUsers />} />
          <InfoCard title="Solicitudes recibidas" value="12.8%" change="-1.22%" icon={<FaChartLine />} />
        </div>
        <div className={styles.graphContainer}>
          <div className={styles.graph1}>
            <LinearGraphic
              labels={labels}
              dataPoints={dataPoints}
              title="Ingresos últimos 7 días"
              color="#0b6730"
            />
          </div>
          <div className={styles.graph2}>
            <CircularGraphic
              labels={['Pagado', 'UACh']}
              dataPoints={[300, 50]}
              title="Distribución de usuarios"
              colors={['#FF6384', '#36A2EB']}
            />
          </div>
        </div>
        <div className={styles.infoTableContainer}>
          <h3 className={styles.infoTableTitle}>Lista de solicitudes</h3>
          <table className={styles.infoTable}>
            <thead className={styles.infoTableThead}>
              <tr className={styles.infoTableTr}>
                <th className={styles.infoTableTh}>#</th>
                <th className={styles.infoTableTh}>Email</th>
                <th className={styles.infoTableTh}>Estado</th>
                <th className={styles.infoTableTh}>Fecha</th>
                <th className={styles.infoTableTh}>Institución</th>
                <th className={styles.infoTableTh}>Nombre</th>
              </tr>
            </thead>
            <tbody className={styles.infoTableTbody}>
              <tr>
                <td>10</td>
                <td>fernacastillo.perez0607@gmail.com</td>
                <td>Aceptado</td>
                <td>2024-09-19</td>
                <td>UACh</td>
                <td>Fernando Castillo Perez</td>
              </tr>
              <tr>
                <td>10</td>
                <td>fernacastillo.perez0607@gmail.com</td>
                <td>Aceptado</td>
                <td>2024-09-19</td>
                <td>UACh</td>
                <td>Fernando Castillo Perez</td>
              </tr>
              <tr>
                <td>10</td>
                <td>fernacastillo.perez0607@gmail.com</td>
                <td>Aceptado</td>
                <td>2024-09-19</td>
                <td>UACh</td>
                <td>Fernando Castillo Perez</td>
              </tr>
            </tbody>
          </table>
        </div>


      </main>
    </div>
  );
};

export default Dashboard;
