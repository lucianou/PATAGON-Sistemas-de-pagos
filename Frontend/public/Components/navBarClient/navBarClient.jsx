import React from "react";
import styles from "./navBarClient.module.css";
import logo from "../../../src/assets/patagon-logo-text-color.png";
import wave from "../../../src/assets/wave.svg";

const navBar = () => {
  return (
    <>
      <div className={styles.header}>
        {/* <img src={wave} alt="wave" className={styles.wave}/> */}
        <div className={styles.sectionIzq}>
          <span>Home</span>
          <span>Nosotros</span>
          <span>Bolsas</span>
          <span>Docs</span>
        </div>
        <span>Mi Perfil</span>
      </div>
      <div className={styles.headerLogo}>
        <img src={logo} alt="logo" className={styles.logo}/>
        <h2>LA SUPERCOMPUTADORA DE LA UACH</h2>
      </div>
    </>
  );
}

export default navBar;