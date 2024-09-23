import React, { useState } from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard'; // Importa el componente del menú
import Card from '../../public/Components/Tarjeta/Card.jsx';
import style1 from '../styles/DashboardGeneral.module.css'; // Para estilos personalizados
import style from '../styles/Dashboard.module.css'; // Para estilos personalizados
import Notifications from './Notifications.jsx';
import Notification_dashboard from '../../public/Components/notificaciones/notificaciones_dashboard.jsx';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={style1.dashboardContainer}>
      <MenuDashboard  toggleMenu={ () => {setIsOpen(!isOpen)} } isOpen={isOpen}/>
      <Notifications/>
      
      <main className={`${style1.content} ${isOpen ? style1.open : ''}`}>
        <div className={style1.header}>
          <h1>Dashboard</h1>  
          <Notification_dashboard/>
        </div>

        <div className={style.dashboardWidgets}>
        <Card
            nombre="Bolsa 1"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 2"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 3"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 4"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 5"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 6"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 7"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 8"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 9"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 10"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        <Card
            nombre="Bolsa 11"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
        />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
