import React, { useState } from 'react';
import styles from '@clientStyles/EstudianteExternos.module.css';
import NavBar from "@components/navBarClient/navBarClient";
import Footer from "@components/FooterUser/Footer.jsx";
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'; // Usaremos íconos de react-icons

const Externos = () => {
  const [activeIndices, setActiveIndices] = useState([]);
  const [closingIndex, setClosingIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndices.includes(index)) {
      setClosingIndex(index);
      setTimeout(() => {
        setActiveIndices(activeIndices.filter(i => i !== index));
        setClosingIndex(null);
      }, 200); // Duración de la animación en ms
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };
  
  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Si eres externo, debes:</h1>
        <ol className={styles.stepsList}>
          <li className={styles.step}>
            <div 
              onClick={() => toggleAccordion(0)} 
              className={styles.stepTitle}
            >
              {activeIndices.includes(0) ? <FaChevronDown /> : <FaChevronRight />}
              <span>1 - Realizar Solicitud</span>
            </div>
            <div className={`${styles.stepContent} ${activeIndices.includes(0) ? styles.open : ''} ${closingIndex === 0 ? styles.closing : ''}`}>
              <p>
                Para realizar la solicitud debe ir a la pagina del patagon y dirigirse a "Contacto", o bien hacer click en este link  <a href="https://patagon.uach.cl/contacto" target="_blank" rel="noopener noreferrer" className={styles.link}>contacto</a>.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <div 
              onClick={() => toggleAccordion(1)} 
              className={styles.stepTitle}
            >
              {activeIndices.includes(1) ? <FaChevronDown /> : <FaChevronRight />}
              <span>2 - Registro</span>
            </div>
            <div className={`${styles.stepContent} ${activeIndices.includes(1) ? styles.open : ''} ${closingIndex === 1 ? styles.closing : ''}`}>
              <p>
                Esperar la llegada de un correo electrónico que declare que su solicitud fue aceptada. Si ya te llegó el correo electronico entonces puedes registrarte en la página a través de este link <a href="/registro" target="_blank" rel="noopener noreferrer" className={styles.link}>Sistemas-De-Pagos-Patagon</a>.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <div 
              onClick={() => toggleAccordion(2)} 
              className={styles.stepTitle}
            >
              {activeIndices.includes(2) ? <FaChevronDown /> : <FaChevronRight />}
              <span>3 - Ingreso</span>
            </div>
            <div className={`${styles.stepContent} ${activeIndices.includes(2) ? styles.open : ''} ${closingIndex === 2 ? styles.closing : ''}`}>
              <p>
                Una vez registrado, debes dirigirte a login para ingresar a la página con tu email y contraseña.
              </p>
            </div>
          </li>
        </ol>
      </main>
      <Footer />
    </div>
  );
};

export default Externos;
  