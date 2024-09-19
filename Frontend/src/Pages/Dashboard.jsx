import React, { useState } from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard'; // Importa el componente del menú
import Card from '../../public/Components/Tarjeta/Card.jsx';
import style from '../styles/Dashboard.module.css'; // Para estilos personalizados

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Cambia el estado para abrir o cerrar el menú
  };
  
  return (
    <div className={style.dashboardContainer}>
      <MenuDashboard  toggleMenu={toggleMenu} isOpen={isOpen}/>{" "}
      {/* Pasa las props */}
      <main className={`${style.content} ${isOpen ? style.open : ''}`}>
        <div className={style.dashboardHeader}>
          <h1>Dashboard</h1>  
        </div>

        <div className={style.dashboardWidgets}>
          <div className={`${style.widget} ${style.smallWidget}`}></div>
          <div className={`${style.widget} ${style.smallWidget}`}></div>

          <Card
            nombre="Bolsa Economica"
            tiempo="25 horas"
            precio="$25.000"
            detalles={['Rtx 3090 ti x4', '16 gb', '128 gb']}
            ram="64 gb"
          />
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
