import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la URL actual
import styles from './MenuDashboard.module.css'; // Importa tu archivo de estilos como módulo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faClipboard, faUsers, faDollarSign, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
          &#9776;
        </button>
        <div className={styles.profile}>
          <img className={styles.profilePic} src='../../src/assets/perro.png' alt='Profile'></img>
          <h2>Admin_name</h2>
        </div>
        <nav className={styles.menu}>
          <ul>
            <li className={isActive('/dashboard') ? styles.active : ''}>
              <FontAwesomeIcon icon={faTachometerAlt} className={styles.faIcon}/> 
              <a href='/dashboard'>
                Dashboard
              </a>
            </li>
            <li className={isActive('/dashboard-solicitudes') ? styles.active : ''}>
              <FontAwesomeIcon icon={faClipboard} className={styles.faIcon}/>
              <a href='/dashboard-solicitudes'>
                Solicitudes
              </a>
            </li>
            <li className={isActive('/dashboard-user') ? styles.active : ''}>
              <FontAwesomeIcon icon={faUsers} className={styles.faIcon}/> 
              <a href='/dashboard-user'>
                Usuarios
              </a>
            </li>
            <li className={isActive('/dashboard-profit') ? styles.active : ''}>
              <FontAwesomeIcon icon={faDollarSign} className={styles.faIcon}/> 
              <a href='/dashboard-profit'>
                Ganancias
              </a>
            </li>
            <li className={isActive('/dashboard-config') ? styles.active : ''}>
              <FontAwesomeIcon icon={faCog} className={styles.faIcon}/>
              <a href='/dashboard-config'>
                Configuración
              </a>
            </li>
            <li className={isActive('/') ? styles.active : ''}>
              <FontAwesomeIcon icon={faSignOutAlt} className={styles.faIcon}/>
              <a href='/' onClick={logout}>
                Cerrar sesión
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MenuDashboard;