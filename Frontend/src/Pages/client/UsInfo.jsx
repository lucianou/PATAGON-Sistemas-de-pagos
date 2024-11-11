import React from 'react';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import styles from '../../styles/client/UsInfo.module.css';

const UsInfo = () => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <section className={styles.header}>
          <h1>SOMOS</h1>
          <p>Tu Partner en computación de alto rendimiento</p>
        </section>

        <section className={styles.missionVision}>
          <div>
            <h2>Misión y Visión</h2>
            <p>Nuestra misión es brindar soluciones de computación de alto rendimiento, ofreciendo tecnología avanzada para resolver desafíos complejos de manera rápida y eficiente.</p>
            <p>Queremos ser líderes en el campo, proporcionando infraestructura confiable y accesible que impulse la innovación en ciencia, tecnología y negocios.</p>
          </div>
          <div>
            <h2>Por qué preferirnos</h2>
            <p>Contamos con un equipo comprometido y experimentado, ofreciendo soluciones personalizadas y un servicio al cliente excepcional.</p>
            <p>Brindamos acceso a recursos de alto rendimiento a precios competitivos, asegurando siempre calidad y resultados rápidos.</p>
          </div>
        </section>


        <section className={styles.trustedPartner}>
          <h2>Un aliado seguro</h2>
          <p>Ofrecemos recursos de confianza, garantizando estabilidad y rendimiento para tus proyectos más exigentes.</p>
        </section>

        {/* <section className={styles.values}>
          <h2>Valores</h2>
          <div className={styles.valueItems}>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
          </div>
        </section> */}

        {/* <section className={styles.team}>
          <h2>Equipo</h2>
          <div className={styles.teamMembers}>
            <div className={styles.member}>Nombre aquí</div>
            <div className={styles.member}>Nombre aquí</div>
            <div className={styles.member}>Nombre aquí</div>
          </div>
        </section> */}
      </div>
    </>
  );
}

export default UsInfo;
