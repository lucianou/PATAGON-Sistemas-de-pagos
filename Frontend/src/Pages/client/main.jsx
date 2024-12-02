import React from "react";
import styles from "@clientStyles/main.module.css";
import styles1 from "@clientStyles/userGeneral.module.css";
import NavBar from "@components/navBarClient/navBarClient";
import Footer from "@components/FooterUser/Footer.jsx";
import Card from '@components/Tarjeta/Card.jsx';
import DocsUser from '@components/docsUser/docsUser.jsx';
import DashboardBolsasUser from "@hooks/useDashboardBolsasUser.js";
import logo from "../../../src/assets/patagon-logo-text-color.png";
import { jwtDecode } from "jwt-decode";


const MainClient = () => {
  const { bolsas, loading, error } = DashboardBolsasUser();
  const token = localStorage.getItem('token');
  let decodedToken, userType;
  if (token) {
    decodedToken = jwtDecode(token);
    userType = decodedToken.type;
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
            src="https://www.youtube-nocookie.com/embed/sEwd3iZvY3g" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className={styles.video}
          ></iframe>
        </div>
        <DocsUser />
      </main>
      <Footer />
    </div>
  );
}

export default MainClient;