import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la URL actual
import styles from './MenuDashboard.module.css'; // Importa tu archivo de estilos como módulo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faClipboard, faUsers, faDollarSign, faCog, faSignOutAlt, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const MenuDashboard = ({ toggleMenu, isOpen }) => {
  const location = useLocation(); // Obtén la URL actual  

  // Verifica si la ruta actual es la misma que la ruta del enlace
  const isActive = (path) => location.pathname === path;

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token'); // Elimina el token del localStorage
    localStorage.removeItem('rol'); // Elimina el rol del localStorage
    window.location.href = event.target.href; // Redirige al usuario a la ruta especificada en el enlace
  };

  return (
    <div>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className={styles.faIcon}/>
        </button>
        <div className={styles.profile}>
          <img className={styles.profilePic} src='../../src/assets/perro.png' alt='Profile'></img>
          <h2>Admin_name</h2>
        </div>
        <nav className={styles.menu}>
          <ul>
            <li className={isActive('/dashboard') ? styles.active : ''}>
              <a href='/dashboard'>
                <FontAwesomeIcon icon={faTachometerAlt} className={styles.faIcon}/> 
                <span>Dashboard</span>
              </a>
            </li>
            <li className={isActive('/dashboard-solicitudes') ? styles.active : ''}>
              <a href='/dashboard-solicitudes'>
                <FontAwesomeIcon icon={faClipboard} className={styles.faIcon}/>
                <span>Solicitudes</span>
              </a>
            </li>
            <li className={isActive('/dashboard-user') ? styles.active : ''}>
              <a href='/dashboard-user'>
                <FontAwesomeIcon icon={faUsers} className={styles.faIcon}/> 
                <span>Usuarios</span>
              </a>
            </li>
            <li className={isActive('/dashboard-profit') ? styles.active : ''}>
              <a href='/dashboard-profit'>
                <FontAwesomeIcon icon={faDollarSign} className={styles.faIcon}/> 
                <span>Ganancias</span>
              </a>
            </li>
            <li className={isActive('/dashboard-config') ? styles.active : ''}>
              <a href='/dashboard-config'>
                <FontAwesomeIcon icon={faCog} className={styles.faIcon}/>
                <span>Configuración</span>
              </a>
            </li>
            <li className={isActive('/') ? styles.active : ''}>
              <a href='/' onClick={logout }>
                <FontAwesomeIcon icon={faSignOutAlt} className={styles.faIcon}/>
                <span>Cerrar</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MenuDashboard;