import React from 'react';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
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
            <p>Nuestra Misión es ofrecer capacidad computacional...</p>
            <p>Nuestra Visión es brindar un servicio de excelencia...</p>
          </div>
          <div>
            <h2>Por qué preferirnos</h2>
            <p>Somos un equipo comprometido con la excelencia...</p>
            <p>Ofrecemos una experiencia optimizada...</p>
          </div>
        </section>

        <section className={styles.trustedPartner}>
          <h2>Un aliado seguro</h2>
          <p>Proveemos recursos altamente confiables...</p>
        </section>

        <section className={styles.values}>
          <h2>Valores</h2>
          <div className={styles.valueItems}>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
            <div><p>Logo Provisional</p><p>Descripción</p></div>
          </div>
        </section>

        <section className={styles.team}>
          <h2>Equipo</h2>
          <div className={styles.teamMembers}>
            <div className={styles.member}>Nombre aquí</div>
            <div className={styles.member}>Nombre aquí</div>
            <div className={styles.member}>Nombre aquí</div>
          </div>
        </section>
        
      </div>
      <Footer></Footer>
    </>
  );
}

export default UsInfo;
