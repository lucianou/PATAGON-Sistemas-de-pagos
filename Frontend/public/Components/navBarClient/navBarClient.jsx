import React, { useState } from "react";
import styles from "./navBarClient.module.css";
import logo from "../../../src/assets/SoloLogo_Patagon.png";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.header}>
      <div className={styles.sectionIzq}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`${styles.navMenu} ${menuOpen ? styles.show : ""}`}>
          <a href="/mainClient" className={isActive("/mainClient") ? styles.active : ""}>
            Home
          </a>
          <a href="/about-us" className={isActive("/about-us") ? styles.active : ""}>
            Nosotros
          </a>
          <a href="/docs" className={isActive("/docs") ? styles.active : ""}>
            Documentación
          </a>
        </div>
      </div>
      <div className={styles.userDiv}>
        <a className={styles.user}>Usuario</a>
        <ul>
          <li><a href="/account/profile">Mi Perfil</a></li>
          <li><a href="/account/purchase-history">Historial de compras</a></li>
          <li><a href="/">Cerrar sesión</a></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
