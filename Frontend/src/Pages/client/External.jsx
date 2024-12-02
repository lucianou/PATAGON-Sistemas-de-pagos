import React, { useState } from 'react';
import styles from '@clientStyles/EstudianteExternos.module.css';
import NavBar from "@components/navBarClient/navBarClient";
import Footer from "@components/FooterUser/Footer.jsx";

const Externos = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [closingIndex, setClosingIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setClosingIndex(index);
      setTimeout(() => {
        setActiveIndex(null);
        setClosingIndex(null);
      }, 200); // Duración de la animación en ms
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Si eres externo, debes:</h1>
        <ol className={styles.stepsList}>
          <li className={styles.step}>
            <div onClick={() => toggleAccordion(0)} className={styles.stepTitle}>
              Realizar Solicitud
            </div>
            <div className={`${styles.stepContent} ${activeIndex === 0 ? styles.open : ''} ${closingIndex === 0 ? styles.closing : ''}`}>
              <p>
                Realizar una solicitud siguiendo este <a href="https://patagon.uach.cl/contacto" target="_blank" rel="noopener noreferrer" className={styles.link}>enlace</a>.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <div onClick={() => toggleAccordion(1)} className={styles.stepTitle}>
              Una vez aceptado por el administrador, ya puedes registrarte.
            </div>
            <div className={`${styles.stepContent} ${activeIndex === 1 ? styles.open : ''} ${closingIndex === 1 ? styles.closing : ''}`}>
              <p>
                Una vez aceptado por el administrador, ya puedes registrarte en la página <a href="/registro" target="_blank" rel="noopener noreferrer" className={styles.link}>Sistemas-De-Pagos-Patagon</a>.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <div onClick={() => toggleAccordion(2)} className={styles.stepTitle}>
              Completar el formulario con los datos necesarios y enviarlo.
            </div>
            <div className={`${styles.stepContent} ${activeIndex === 2 ? styles.open : ''} ${closingIndex === 2 ? styles.closing : ''}`}>
              <p>
                Completar el formulario con los datos necesarios y enviarlo.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <div onClick={() => toggleAccordion(3)} className={styles.stepTitle}>
              Esperar la confirmación por correo electrónico o por teléfono.
            </div>
            <div className={`${styles.stepContent} ${activeIndex === 3 ? styles.open : ''} ${closingIndex === 3 ? styles.closing : ''}`}>
              <p>
                Esperar la confirmación por correo electrónico o por teléfono.
              </p>
            </div>
          </li>
        </ol>
      </main>
      <Footer />
    </div>
  );
}

export default Externos;
