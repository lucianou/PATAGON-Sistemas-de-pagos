import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la URL actual
import './MenuDashboard.css'; // Importa tu archivo de estilos

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
      <button 
        className={`hamburger ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
      >
        &#9776;
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="profile">
          <div className="profile-pic"></div>
          <h2>Admin_name</h2>
        </div>
        <nav className="menu">
          <ul>
            <li className={isActive('/dashboard') ? 'active' : ''}>
              <a href='/dashboard'>Dashboard</a>
            </li>
            <li className={isActive('/dashboard-solicitudes') ? 'active' : ''}>
              <a href='/dashboard-solicitudes'>Solicitudes</a>
            </li>
            <li className={isActive('/dashboard-user') ? 'active' : ''}>
              <a href='/dashboard-user'>Usuarios</a>
            </li>
            <li className={isActive('/dashboard-profit') ? 'active' : ''}>
              <a href='/dashboard-profit'>Ganancias</a>
            </li>
            <li className={isActive('/dashboard-config') ? 'active' : ''}>
              <a href='/dashboard-config'>Configuración</a>
            </li>
            <li className={isActive('/') ? 'active' : ''}>
              <a href='/'>Cerrar sesión</a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MenuDashboard;
