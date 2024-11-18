import React from "react";
import styles from '../../styles/client/PrivacyTerms.module.css'; // Asegúrate de usar la ruta correcta
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
const Privacy = () => {
  return (
    <div className={styles.container}>
        <NavBar />
        <div className={styles.legalPage}>
        <h1 className={styles.legalTitle}>Política de Privacidad</h1>
        <p>
            Bienvenido a nuestra Política de Privacidad. Aquí explicamos cómo recopilamos, utilizamos y protegemos tu información personal.
        </p>
        <h2>Información que recopilamos</h2>
        <p>
            Recopilamos información como tu nombre, correo electrónico y datos de navegación cuando utilizas nuestro sitio web.
        </p>
        <h2>Uso de la información</h2>
        <p>
            Utilizamos tu información para mejorar nuestros servicios, personalizar tu experiencia y enviarte actualizaciones relevantes.
        </p>
        <h2>Protección de la información</h2>
        <p>
            Implementamos medidas de seguridad para proteger tu información contra accesos no autorizados.
        </p>
        </div>
        <Footer />
    </div>
  );
};

export default Privacy;
