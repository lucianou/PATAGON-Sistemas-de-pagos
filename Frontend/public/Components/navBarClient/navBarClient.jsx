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
          <a href='/mainClient' tabIndex='-1'>
            <span>Inicio</span>
          </a>
          <a href='/UsInfo' tabIndex='-1'>
            <span>Nosotros</span>
          </a>
          <a href='/Bolsa' tabIndex='-1'>
            <span>Bolsas</span>
          </a>
          <a href='/Docs' tabIndex='-1'>
            <span>Docs</span>
          </a>
        </div>
        <span>Mi Perfil</span>
      </div>
    </>
  );
}

export default navBar;