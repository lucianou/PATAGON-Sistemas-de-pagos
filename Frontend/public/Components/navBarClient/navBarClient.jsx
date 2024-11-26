import React from "react";
import styles from "./navBarClient.module.css";
import logo from "../../../src/assets/SoloLogo_Patagon.png"

const navBar = () => {
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
    <>
      <div className={styles.header}>
        {/* <img src={wave} alt="wave" className={styles.wave}/> */}
        <div className={styles.sectionIzq}>
        <a href="/mainClient" >
        <img src={logo} alt="logo" className={styles.logo} />
        </a>

        <div className={styles.btnGroup}>
          <a href='/mainClient' className={isActive("/mainClient") ? styles.active : ''} tabIndex='-1'>
            Home
          </a>
        </div>
        <div className={styles.btnGroup}>
          <a href='/about-us' className={isActive("/about-us") ? styles.active : ''} tabIndex='-1'>
            Nosotros
          </a>
        </div>
        <div className={styles.btnGroup}>
          <a href='/docs' className={isActive("/docs") ? styles.active : ''} tabIndex='-1'>  
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
    </>
  );
}

export default navBar;