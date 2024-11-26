import React from 'react';
import styles from '../../styles/notfound.module.css';
import ParticlesBG from "../../../public/Components/Particles/ParticlesBG";
import { jwtDecode } from 'jwt-decode';

const NotFound = () => {
  const token = localStorage.getItem('token');
  let decodedToken, userRole;
  
  if (token) {
    decodedToken = jwtDecode(token);
    userRole = decodedToken.rol;
  }


  const redirectTo = ['administrador', 'revisor', 'co.admin'].includes(userRole) ? '/dashboard' : '/mainClient';

  return (
    <>
      <ParticlesBG />
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.icon}>🔒</div> {/* Puedes cambiar el icono por algo similar a GitHub */}
          <h1 className={styles.title}>404 - Página No Encontrada</h1>
          <p className={styles.message}>
            No tienes permiso para acceder a esta página o la página no existe.
          </p>
          {/* El enlace redirige según el rol del usuario */}
          <a href={redirectTo} className={styles.button}>Volver al Inicio</a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
