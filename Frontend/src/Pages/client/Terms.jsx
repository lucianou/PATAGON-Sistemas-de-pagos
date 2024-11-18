import React from "react";
import styles from '../../styles/client/PrivacyTerms.module.css'; // Usamos los mismos estilos del contenedor
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";

const Terms = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.legalPage}>
        <h1 className={styles.legalTitle}>Términos y Condiciones</h1>
        <p>
          Bienvenido a nuestros Términos y Condiciones. Al utilizar nuestro sitio web, aceptas cumplir con las reglas y regulaciones descritas a continuación.
        </p>
        <h2>Uso del sitio web</h2>
        <p>
          Al acceder a este sitio, garantizas que no utilizarás los contenidos con fines ilegales o prohibidos por estos términos.
        </p>
        <h2>Propiedad intelectual</h2>
        <p>
          Todos los contenidos, imágenes, textos y gráficos de este sitio son propiedad de la empresa y están protegidos por leyes de derechos de autor.
        </p>
        <h2>Limitación de responsabilidad</h2>
        <p>
          No nos hacemos responsables por daños directos, indirectos o consecuentes que puedan derivarse del uso de este sitio web.
        </p>
        <h2>Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Recomendamos revisarlos periódicamente.
        </p>
        <p>
          Si tienes preguntas, <a href="/contacto">contáctanos aquí</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
