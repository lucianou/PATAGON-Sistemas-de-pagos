// NotFound.js
import React from 'react';
import styles from '../../styles/notfound.module.css';
import ParticlesBG from "../../../public/Components/Particles/ParticlesBG";

const NotFound = () => {
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
          <a href="/" className={styles.button}>Volver al Inicio</a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
