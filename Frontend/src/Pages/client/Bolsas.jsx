import React from 'react';
import styles from '../../styles/client/Bolsas.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import DashboardBolsasUser from "../../Hooks/useDashboardBolsasUser.js";
import Card from '../../../public/Components/Tarjeta/Card.jsx';
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
const Bolsas = ({}) => {
  const { bolsas, loading, error } = DashboardBolsasUser();

  return (
  <div className= {styles.container}>
    <NavBar></NavBar>
    <div className={styles.gap}></div>
    <section className= {styles.section1}>
      {/* aquí dejen las bolsaas cabroooooooos */}
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

    <section className={styles.section2}></section>
    <div className={styles.gap}></div>
    <Footer></Footer>
  </div>
  )
}

export default Bolsas;