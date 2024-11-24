import React from 'react';
import styles from '../../styles/client/EstudianteExternos.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";

const Estudiante = () => {
  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Si eres estudiante, debes:</h1>
        <ol className={styles.stepsList}>
          <li className={styles.step}>
            Primero, dirígete a la pestaña de contacto que podrás encontrar en la sección inferior de cualquier página 
            o sigue este <a href="https://patagon.uach.cl/contacto" target="_blank" rel="noopener noreferrer" className={styles.link}>enlace</a>.
          </li>
          <li className={styles.step}>
            Completa la solicitud con cada campo solicitado.
          </li>
          <li className={styles.step}>
            Envía el formulario y espera a que te contacten con más detalles.
          </li>
          <li className={styles.step}>
            Si tienes problemas, revisa la sección de preguntas frecuentes o contáctanos directamente.
          </li>
        </ol>
      </main>
      <Footer />
    </div>
  );
}

export default Estudiante;
