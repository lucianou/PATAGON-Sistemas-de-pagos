import React, { useState } from 'react';
import styles from '@clientStyles/EstudianteExternos.module.css';
import NavBar from "@components/navBarClient/navBarClient";
import Footer from "@components/FooterUser/Footer.jsx";
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'; // Usaremos íconos de react-icons


const Estudiante = () => {
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
        <h1 className={styles.title}>Si eres estudiante, debes:</h1>
        <ol className={styles.stepsList}>
          <li className={styles.step}>
            <div 
              onClick={() => toggleAccordion(0)} 
              className={styles.stepTitle}
            >
              {activeIndices.includes(0) ? <FaChevronDown /> : <FaChevronRight />}
              <span>Ingresar al Sistema de Pagos Patagon</span>
            </div>
            <div className={`${styles.stepContent} ${activeIndices.includes(0) ? styles.open : ''} ${closingIndex === 0 ? styles.closing : ''}`}>
              <ul>
                <li>
                  <span>1</span>
                  <span>
                    Para poder ingresar al sistema primero debes realizar la solicitud de ingreso. Para hacer esto debes ir a la pagina del patagon y dirigirse a "Contacto", o bien hacer click en este link  <a href="https://patagon.uach.cl/contacto" target="_blank" rel="noopener noreferrer" className={styles.link}>contacto</a>.
                  </span>
                </li>
                <li>
                  <span>2</span>
                  <span>
                    Espera la llegada de un correo electrónico que declare que su solicitud fue aceptada, en ella se encontran los datos para poder ingresar a la supercomputadora. Si ya te llegó el correo electronico entonces puedes registrarte en la página a través de este link <a href="/registro" target="_blank" rel="noopener noreferrer" className={styles.link}>Sistemas-De-Pagos-Patagon</a>.
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
              <span>Ingresar a la supercomputadora</span>
            </div>
            <div className={`${styles.stepContent} ${activeIndices.includes(1) ? styles.open : ''} ${closingIndex === 1 ? styles.closing : ''}`}>
              <ul>
                <li>
                  <span>1</span>
                  <span>
                    Con los datos que se le fueron entregados al correo con el que hizo la solicitud usted puede ingresar a la supercomputadora via linea de comando (bash).
                  </span>
                </li>
                {/* <li>
                  <span>2</span>
                  <span>
                    Segun las descripciones de cada bolsa, elige la que más te convenga y haz click en "Comprar". Luego de esto, seleccionas tu metodo de pago, aceptas los terminos y condiciones, y haces click en "comprar ahora". 
                  </span>
                </li>
                <li>
                  <span>3</span>
                  <span>
                    Serás redireccionado a la pagina correspondiente de tu metodo de compra, ahí rellenas los datos necesarios y haces click en "pagar". Si todo sale bien, tendras acceso a la supercomputadora y podras ver el tiempo restante de tu bolsa en tu perfil.
                  </span>
                </li> */}
              </ul>
            </div>
          </li>
        </ol>
      </main>
      <Footer />
    </div>
  );
}

export default Estudiante;
