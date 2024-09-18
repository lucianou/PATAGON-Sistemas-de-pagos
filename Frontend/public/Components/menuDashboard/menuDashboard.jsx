import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la URL actual
import styles from './MenuDashboard.module.css'; // Importa tu archivo de estilos como módulo

const MenuDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Obtén la URL actual

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Cambia el estado para abrir o cerrar el menú
  };

  // Verifica si la ruta actual es la misma que la ruta del enlace
  const isActive = (path) => location.pathname === path;

  return (
    <div>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={styles.profile}>
          <div className={styles.profilePic}></div>
          <h2>Admin_name</h2>
        </div>
        <nav className={styles.menu}>
          <ul>
            <li className={isActive('/dashboard') ? styles.active : ''}>
              <a href='/dashboard'>Dashboard</a>
            </li>
            <li className={isActive('/dashboard-solicitudes') ? styles.active : ''}>
              <a href='/dashboard-solicitudes'>Solicitudes</a>
            </li>
            <li className={isActive('/dashboard-user') ? styles.active : ''}>
              <a href='/dashboard-user'>Usuarios</a>
            </li>
            <li className={isActive('/dashboard-profit') ? styles.active : ''}>
              <a href='/dashboard-profit'>Ganancias</a>
            </li>
            <li className={isActive('/dashboard-config') ? styles.active : ''}>
              <a href='/dashboard-config'>Configuración</a>
            </li>
            <li className={isActive('/') ? styles.active : ''}>
              <a href='/'>Cerrar sesión</a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MenuDashboard;