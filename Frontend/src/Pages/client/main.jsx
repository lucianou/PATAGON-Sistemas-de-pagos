import React from "react";
import styles from "../../styles/client/main.module.css";
import styles1 from "../../styles/client/userGeneral.module.css";
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
import Card from '../../../public/Components/Tarjeta/Card.jsx';
import logo from "../../../src/assets/patagon-logo-text-color.png";
import DashboardBolsasUser from "../../Hooks/useDashboardBolsasUser.js";
import DocsUser from '../../../public/Components/docsUser/docsUser.jsx';
import { jwtDecode } from "jwt-decode";


const MainClient = () => {
  const { bolsas, loading, error } = DashboardBolsasUser();
  const token = localStorage.getItem('token');
  let decodedToken, userRole;
  if (token) {
    decodedToken = jwtDecode(token);
    userRole = decodedToken.rol;
  }


  return (
    <div className={styles1.container} id={styles.container}>
      <NavBar />
      <main>
        <div className={styles.headerLogo}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h2>LA SUPERCOMPUTADORA DE LA UACH</h2>
        </div>
        <div className={styles.videoContainer}>
            <iframe 
              src="https://www.youtube.com/embed/sEwd3iZvY3g" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className={styles.video}
            ></iframe>
          </div>
        { userRole === "Cliente"  ? (
          <section className={styles.section1}>
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
        ) : (
          ''
        )}
        <DocsUser />
      </main>
      <Footer />
    </div>
  );
}

export default MainClient;