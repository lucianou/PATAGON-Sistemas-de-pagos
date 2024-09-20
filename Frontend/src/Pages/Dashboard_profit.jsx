import React, { useState } from 'react';
import MenuDashboard from "../../public/Components/menuDashboard/menuDashboard"; // Importa el componente del menú
import styles1 from "../styles/DashboardGeneral.module.css"; // Para estilos personalizados
import styles from "../styles/DashboardProfit.module.css"; // Para estilos personalizados

const Dashboard_profit = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={ () => {setIsOpen(!isOpen)} } isOpen={isOpen}/>
      <main className={`${styles1.content} ${isOpen  ? styles1.open : ''} `}>
        <div className={styles1.header}>
          <h1>Ganancias</h1>
          <div></div>
          <div></div>
          <div></div>
          </div>
      </main>
    </div>
  );
};  

export default Dashboard_profit;
