import React from "react";
import styles from "../../styles/client/main.module.css";
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
import Card from '../../../public/Components/Tarjeta/Card.jsx';
import logo from "../../../src/assets/patagon-logo-text-color.png";
import DashboardBolsasUser from "../../Hooks/useDashboardBolsasUser.js";
import DocsUser from '../../../public/Components/docsUser/docsUser.jsx';

const MainClient = () => {
  const { bolsas, loading, error } = DashboardBolsasUser();

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.headerLogo}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h2>LA SUPERCOMPUTADORA DE LA UACH</h2>
      </div>
      <div>

      </div>
      <section className={styles.section1}>
        {/* <h1>Bolsas</h1> */}
        <div className={styles.dashboardWidgets}>
        {loading ? (
            <div className={styles.spinner}></div>
          ) : error ? (
            <p>Error al cargar bolsas: {error}</p>
          ) : bolsas && bolsas.length > 0 ? (  
            bolsas.map((bolsa, index) => {
              const delay = `${index * 100}ms`; 
              return (
                <Card
                  key={index} 
                  nombre={bolsa.nombre}
                  tiempo={bolsa.time}
                  precio={bolsa.precio}
                  detalles={bolsa.detalles} 
                  delay={delay} 
                  ID={bolsa.ID}
                />
              );
            })
          ) : (
            <p>No hay bolsas disponibles.</p>
          )}
        </div>
      </section>
      <DocsUser />
      <Footer />
    </div>
  );
}

export default MainClient;