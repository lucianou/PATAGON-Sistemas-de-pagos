import React, { useState } from "react";
import MenuDashboard from "../../public/Components/menuDashboard/menuDashboard"; // Importa el componente del menú
import styles1 from "../styles/DashboardGeneral.module.css"; // Para estilos personalizados
import styles from "../styles/DashboardProfit.module.css"; // Para estilos personalizados
import LinearGraphic from "../../public/Components/Graphics/LinearGraphic";
import BarGraphic from "../../public/Components/Graphics/BarGraphic";

const Dashboard_profit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDiv, setActiveDiv] = useState(null); // Nuevo estado para controlar qué div está expandido

  const handleDivClick = (divNumber) => {
    setActiveDiv(activeDiv === divNumber ? null : divNumber); // Alterna el div seleccionado
  };

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard
        toggleMenu={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
      />
      <main className={`${styles1.content} ${isOpen ? styles1.open : ""} `}>
        <div className={styles1.header}>
          <h1>Ganancias</h1>
        </div>
        <div className={styles.graphContent}>
          
          <div className={`${styles.graph} ${activeDiv === 1 ? styles.expanded : ''}`} onClick={() => handleDivClick(1)}>
            <LinearGraphic />
          </div>

          <div className={`${styles.graph} ${activeDiv === 2 ? styles.expanded : ''}`} onClick={() => handleDivClick(2)}>
            <BarGraphic />
          </div>
          <div className={`${styles.graph} ${activeDiv === 3 ? styles.expanded : ''}`} onClick={() => handleDivClick(3)}>
            <BarGraphic />  
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard_profit;
