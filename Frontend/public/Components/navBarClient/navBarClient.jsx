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
            Home
          </a>
          <a href='/UsInfo' tabIndex='-1'>
            Nosotros
          </a>
          <a href='/Bolsas' tabIndex='-1'>
            Bolsas
          </a>
          <a href='/Docs' tabIndex='-1'>  
            Docs
          </a>
        </div>
        <a>Mi Perfil</a>
      </div>
    </>
  );
}

export default navBar;