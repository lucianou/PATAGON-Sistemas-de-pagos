import React from 'react';
import styles from '../../styles/client/Docs.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
const Docs = ({ }) => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Patagon Docs</h1>
          <h3>Tu supercomputador distribuido para cálculos de alto rendimiento</h3>
        </div>
        <section className={styles.section1}>
          <div className={styles.card}>
            <div className={styles.icon}><img src="https://i.imgur.com/a5OCfiR.jpg" alt="student icon"></img></div>
            <h3>Estudiantes</h3>
            <p>
              Si eres estudiante o miembro de una
              fundación educativa, ¡esto es para ti!
              A continuación encontrarás información
              importante diseñada especialmente para
              quienes forman parte del ámbito académico.
              Es crucial que prestes atención a todos los detalles
              que te ayudarán a aprovechar al máximo los recursos
              y beneficios disponibles para ti.
            </p>
            <a href="#" className={styles.link}>Ver más</a>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}><img src='https://i.imgur.com/a5OCfiR.jpg' alt="business icon"></img></div>
            <h3>Externos</h3>
            <p>Si eres dueño de una empresa o trabajas en una,
              esta sección te servirá para saber más informacion
              de nuestras normativas de uso con el supercomputador
              Patagon. Como equipo es crucial que nuestros clientes
              tengan la mayor transparencia ante todo.
            </p>
            <a href="#" className={styles.link}>Ver más</a>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}><img src='https://i.imgur.com/a5OCfiR.jpg' alt="tool icon"></img></div>
            <h3>Como usarlo</h3>
            <p>En esta sección podrás encontrar una documentación
              completa de acceso de uso al Supercomputador Patagon.
              Es necesario que conozcas tus posibilidades y puedas
              explorar al máximo tus capacidades.

            </p>
            <a href="#" className={styles.link}>Ver más</a>
          </div>
        </section>
        {/* <h1>aqui pongan footers</h1> */}
      </div>
      <Footer></Footer>
    </>
  )
}

export default Docs;