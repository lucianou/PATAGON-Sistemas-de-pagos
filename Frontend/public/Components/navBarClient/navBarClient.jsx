import React from "react";
import styles from "./navBarClient.module.css";

const navBar = () => {
  const isActive = (path) => location.pathname === path;
  
  return (
    <>
      <div className={styles.header}>
        {/* <img src={wave} alt="wave" className={styles.wave}/> */}
        <div className={styles.sectionIzq}>
          <a href='/mainClient' className={isActive("/mainClient") ? styles.active : ''} tabIndex='-1'>
            Home
          </a>
          <a href='/UsInfo' className={isActive("/UsInfo") ? styles.active : ''} tabIndex='-1'>
            Nosotros
          </a>
          <a href='/Bolsas' className={isActive("/Bolsas") ? styles.active : ''} tabIndex='-1'>
            Bolsas
          </a>
          <a href='/Docs' className={isActive("/Docs") ? styles.active : ''} tabIndex='-1'>  
            Docs
          </a>
        </div>
        <a>Mi Perfil</a>
      </div>
    </>
  );
}

export default navBar;