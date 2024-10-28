import React from "react";
import styles from "../../styles/client/main.module.css";
import logo from "../../assets/patagon-logo-text-color.png";

const MainClient = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerLogo}>
        <img src={logo} alt="logo" className={styles.logo}/>
      </div>
      <div className={styles.header}>
        <div className={styles.sectionIzq}>
          <span>Inicio</span>
          <span>Nosotros</span>
          <span>Bolsas</span>
          <span>Docs</span>
        </div>
        <span>Mi Perfil</span>
      </div>
    </div>
  );
}

export default MainClient;