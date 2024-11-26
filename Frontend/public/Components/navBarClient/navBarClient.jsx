import React, { useState } from "react";
import styles from "./navBarClient.module.css";
import logo from "../../../src/assets/SoloLogo_Patagon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isActive = (path) => location.pathname === path;
  const token = localStorage.getItem('token');
  
  const handleOut = (event) =>{
    event.preventDefault();
    localStorage.removeItem('rol'); // Elimina el rol del localStorage
    localStorage.removeItem('token'); // Elimina el token del localStorage
    localStorage.removeItem('email'); // Elimina el refreshToken del localStorage
    localStorage.removeItem('username'); // Elimina el nombre de usuario del localStorage
    localStorage.removeItem('refreshToken'); // Elimina el refreshToken del localStorage
    window.location.href = event.target.href; // Redirige al usuario a la ruta especificada en el enlace
  };
  return (
    <div className={styles.header}>
      <div className={styles.sectionIzq}>
        <FontAwesomeIcon icon={ faBars } className={styles.logo} id={styles.l1}/>
        <img src={logo} alt="logo" className={styles.logo} id={styles.l2}/>
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
          { token ? (
            <>
            <a className={styles.user}>Usuario</a>
            <ul>
              <li><a href="/account/profile">Mi Perfil</a></li>
              <li><a href="/account/purchase-history">Historial de compras</a></li>
              <li><a href="/" onClick={ handleOut }>Cerrar sesión</a></li>
            </ul>
            </>
          ) : (
            <a href="/login" className={styles.user}>Iniciar sesión</a>
          )
          
          }
          
        </div>
      </div>
  );
};

export default NavBar;
