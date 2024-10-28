import React from "react";
import styles from "./navBarClient.module.css";
import logo from "../../../src/assets/patagon-logo-text-color.png";

const navBar = () => {
  return (
    <>
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
    </>
  );
}

export default navBar;