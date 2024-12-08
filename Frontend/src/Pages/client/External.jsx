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
        <div className={styles.section}>
          {/* <button className={styles.headerClick}>Registrarse en la pagina</button> */}
          <ol className={styles.stepsList}>
            <li className={styles.step}>
              <div 
                onClick={() => toggleAccordion(0)} 
                className={styles.stepTitle}
              >
                {activeIndices.includes(0) ? <FaChevronDown /> : <FaChevronRight />}
                <span>Realizar Solicitud</span>
              </div>
              <div className={`${styles.stepContent} ${activeIndices.includes(0) ? styles.open : ''} ${closingIndex === 0 ? styles.closing : ''}`}>
                <ul>
                  <li>
                    <span>1</span>
                    <span>
                      Para realizar la solicitud debe ir a la pagina del patagon y dirigirse a "Contacto", o bien hacer click en este link  <a href="https://patagon.uach.cl/contacto" target="_blank" rel="noopener noreferrer" className={styles.link}>contacto</a>.
                    </span>
                  </li>
                  <li>
                    <span>2</span>
                    <span>
                      Esperar la llegada de un correo electrónico que declare que su solicitud fue aceptada. Si ya te llegó el correo electronico entonces puedes registrarte en la página a través de este link <a href="/registro" target="_blank" rel="noopener noreferrer" className={styles.link}>Sistemas-De-Pagos-Patagon</a>.
                    </span>
                  </li>
                  <li>
                    <span>3</span>
                    <span>
                      Una vez registrado, debes dirigirte a login para ingresar a la página con tu email y contraseña.
                    </span>
                  </li>
                </ul>
              </div>
            </li>
            <li className={styles.step}>
              <div 
                onClick={() => toggleAccordion(1)} 
                className={styles.stepTitle}
              >
                {activeIndices.includes(1) ? <FaChevronDown /> : <FaChevronRight />}
                <span>Registro</span>
              </div>
              <div className={`${styles.stepContent} ${activeIndices.includes(1) ? styles.open : ''} ${closingIndex === 1 ? styles.closing : ''}`}>
                <p>
                  
                </p>
              </div>
            </li>
            <li className={styles.step}>
              <div 
                onClick={() => toggleAccordion(2)} 
                className={styles.stepTitle}
              >
                {activeIndices.includes(2) ? <FaChevronDown /> : <FaChevronRight />}
                <span>Ingreso</span>
              </div>
              <div className={`${styles.stepContent} ${activeIndices.includes(2) ? styles.open : ''} ${closingIndex === 2 ? styles.closing : ''}`}>
                <p>
                  
                </p>
              </div>
            </li>
          </ol>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Externos;
  