import React from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la URL actual
import styles from '../menuDashboard/menuDashboard.module.css'; // Importa tu archivo de estilos como módulo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faClipboard, faUsers, faDollarSign, faCog, faSignOutAlt, faTimes, faBars, faUserShield} from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';


const MenuDashboard = ({ toggleMenu, isOpen }) => {
  const location = useLocation(); // Obtén la URL actual  
  const token = localStorage.getItem('token'); // Obtiene el token del localStorage
  const decodedToken = jwtDecode(token); // Decodifica el token
  const userRole = decodedToken.rol; // Obtén el rol del token decodificado

  // Verifica si la ruta actual es la misma que la ruta del enlace
  const isActive = (path) => location.pathname === path;

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('rol'); // Elimina el rol del localStorage
    localStorage.removeItem('token'); // Elimina el token del localStorage
    localStorage.removeItem('email'); // Elimina el refreshToken del localStorage
    localStorage.removeItem('username'); // Elimina el nombre de usuario del localStorage
    localStorage.removeItem('refreshToken'); // Elimina el refreshToken del localStorage
    window.location.href = event.target.href; // Redirige al usuario a la ruta especificada en el enlace
  };

  return (
    <div>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu} tabIndex='-1'>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className={styles.faIcon}/>
        </button>
        <div className={styles.profile}>
          <img className={styles.profilePic} src='../../src/assets/perro.png' alt='Profile'></img>
          <h2>{decodedToken.username !== '' ? decodedToken.username : 'Administrador' }</h2>
        </div>
        <nav className={styles.menu}>
          <ul>

            {(userRole === 'Administrador' || userRole === 'Co-admin') && (
            <li className={isActive('/dashboard') ? styles.active : ''} onClick={() => window.location.href = '/dashboard'}>
              <a href='/dashboard' tabIndex='-1'>
                <FontAwesomeIcon icon={faTachometerAlt} className={styles.faIcon} />
                <span>Dashboard</span>
              </a>
            </li>
            )}

            {(userRole === 'Administrador' || userRole === 'Co-admin' || userRole == 'Revisor') && (
            <li className={isActive('/admin/dashboard-requests') ? styles.active : ''} onClick={() => window.location.href = '/admin/dashboard-requests'}>
              <a href='/admin/dashboard-requests' tabIndex='-1'>
                <FontAwesomeIcon icon={faClipboard} className={styles.faIcon} />
                <span>Solicitudes</span>
              </a>
            </li>
            )}

            {(userRole === 'Administrador') && (
            <li className={isActive('/admin/dashboard-roles') ? styles.active : ''} onClick={() => window.location.href = '/admin/dashboard-roles'}>
              <a href='/admin/dashboard-roles' tabIndex='-1'>
                <FontAwesomeIcon icon={faUserShield} className={styles.faIcon} />
                <span>Administrador</span>
              </a>
            </li>
            )}

            {(userRole === 'Administrador' || userRole === 'Co-admin') && (
            <li className={isActive('/admin/dashboard-users') ? styles.active : ''} onClick={() => window.location.href = '/admin/dashboard-users'}>
              <a href='/admin/dashboard-users' tabIndex='-1'>
                <FontAwesomeIcon icon={faUsers} className={styles.faIcon} />
                <span>Usuarios</span>
              </a>
            </li>
            )}

            {(userRole === 'Administrador' || userRole === 'Co-admin') && (
            <li className={isActive('/admin/dashboard-profit') ? styles.active : ''} onClick={() => window.location.href = '/admin/dashboard-profit'}>
              <a href='/admin/dashboard-profit' tabIndex='-1'>
                <FontAwesomeIcon icon={faDollarSign} className={styles.faIcon} />
                <span>Ganancias</span>
              </a>
            </li>
            )}

            {(userRole === 'Administrador' || userRole === 'Co-admin') && (
            <li className={isActive('/dashboard-config') ? styles.active : ''} onClick={() => window.location.href = '/dashboard-config'}>
              <a href='/dashboard-config' tabIndex='-1'>
                <FontAwesomeIcon icon={faCog} className={styles.faIcon} />
                <span>Configuración</span>
              </a>
            </li>
            )}

            <li className={isActive('/') ? styles.active : ''} onClick={() => window.location.href = '/'}>
              <a href='/' onClick={logout} tabIndex='-1'>
                <FontAwesomeIcon icon={faSignOutAlt} className={styles.faIcon} />
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
