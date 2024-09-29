import React, { useState } from "react";
import MenuDashboard from "../../public/Components/menuDashboard/menuDashboard"; // Importa el componente del menú
import styles1 from "../styles/DashboardGeneral.module.css"; // Para estilos personalizados
import styles from "../styles/DashboardProfit.module.css"; // Para estilos personalizados
import LinearGraphic from "../../public/Components/Graphics/LinearGraphic";
import BarGraphic from "../../public/Components/Graphics/BarGraphic";
import logo from '../assets/SoloLogo_Patagon.png';

const Dashboard_profit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDiv, setActiveDiv] = useState(null); // Nuevo estado para controlar qué div está expandido

  const handleDivClick = (divNumber) => {
    setActiveDiv(activeDiv === divNumber ? null : divNumber); // Alterna el div seleccionado
  };

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={ () => { setIsOpen(!isOpen)} } isOpen={ isOpen } />
      <main className={`${styles1.content} ${isOpen ? styles1.open : ""} `} id={styles.main}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon}/>
            <h1>Dashboard Profit</h1>
          </div>
        </div>
        <div className={styles.contenedor}>
          <div className={`${styles.div1} ${activeDiv === 1 ? styles.expanded : ''}`} >
            <LinearGraphic />
          </div>

          <div className={`${styles.div2} ${activeDiv === 2 ? styles.expanded : ''}`} >
            <BarGraphic />
          </div>
          <div className={`${styles.div3} ${activeDiv === 3 ? styles.expanded : ''}`} >
            <BarGraphic />  
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard_profit;