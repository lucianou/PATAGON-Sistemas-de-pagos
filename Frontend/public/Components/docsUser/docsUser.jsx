import React from 'react';
import styles from './docsUser.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faBriefcase, faBook } from '@fortawesome/free-solid-svg-icons';


const DocsUser = () => {
  return (
    <>
    <div className={styles.header}>
      <h1>Documentación</h1>
      <h3>Tu supercomputador distribuido para cálculos de alto rendimiento</h3>
    </div>
    <section className={styles.section1}>
      <div className={styles.card}>
        <div className={styles.background}></div>
        <header>
          <div className={styles.icon}><FontAwesomeIcon icon={faUserGraduate}/></div>
          <h3>Como usarlo</h3>
        </header>
        <p>
          En esta sección podrás encontrar una documentación
          completa de acceso de uso al Supercomputador Patagon.
        </p>
        <button>
          <a href="https://patagon.uach.cl/patagon/tutoriales" className={styles.link} target="_blank" rel="noopener noreferrer">Ver más</a>
        </button>

      </div>

      <div className={styles.card}>
        <div className={styles.background}></div>
        <header>
          <div className={styles.icon}><FontAwesomeIcon icon={faBriefcase} /></div>
          <h3>Externos</h3>
        </header>
        <p>Si eres dueño de una empresa o trabajas en una,
          esta sección te servirá para saber más informacion
          de nuestras normativas de uso con el supercomputador
          Patagon. Como equipo es crucial que nuestros clientes
          tengan la mayor transparencia ante todo.
        </p>
        <button>
          <a href="/external" className={styles.link}>Ver más</a>
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.background}></div>
        <header>
          <div className={styles.icon}><FontAwesomeIcon icon={faBook}/></div>
          <h3>Estudiantes</h3>
        </header>
        <p>
          Si eres estudiante o miembro de la Uach, ¡esto es para ti!
          A continuación encontrarás información
          importante diseñada especialmente para
          quienes forman parte del ámbito académico.
          Es crucial que prestes atención a todos los detalles
          que te ayudarán a aprovechar al máximo los recursos
          y beneficios disponibles para ti.
        </p>
        <button>
          <a href="/students" className={styles.link}>Ver más</a>
        </button>
      </div>
    </section>
    </>
  )
}

export default DocsUser;