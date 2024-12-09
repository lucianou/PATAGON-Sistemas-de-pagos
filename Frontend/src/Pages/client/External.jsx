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
                      Espera la llegada de un correo electrónico que declare que su solicitud fue aceptada, en ella se encontran los datos para poder ingresar a la supercomputadora <b>(recuerde que hasta que no compre una bolsa de tiempo estos datos no le serviran)</b>. Si ya te llegó el correo electronico entonces puedes registrarte en la página a través de este link <a href="/registro" target="_blank" rel="noopener noreferrer" className={styles.link}>Sistemas-De-Pagos-Patagon</a>.
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
                <span>Compra de bolsas para usar el Patagon</span>
              </div>
              <div className={`${styles.stepContent} ${activeIndices.includes(1) ? styles.open : ''} ${closingIndex === 1 ? styles.closing : ''}`}>
                <ul>
                  <li>
                    <span>1</span>
                    <span>
                      Para poder ingresar a la supercomputadora se deben comprar unas bolsas de tiempo que determinaran cuanto tiempo puede estar usando el Patagon. Puede ver las opciones de bolsas que hay en la sección de "Productos"
                    </span>
                  </li>
                  <li>
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
                  </li>
                </ul>
              </div>
            </li>
            {/* <li className={styles.step}>
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
            </li> */}
          </ol>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Externos;
  