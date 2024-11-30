import React from "react";
import styles from '@clientStyles/PrivacyTerms.module.css'; // Usamos los mismos estilos del contenedor
import NavBar from "@components/navBarClient/navBarClient";
import Footer from "@components/FooterUser/Footer.jsx";

const Terms = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.legalPage}>
        <h1 className={styles.legalTitle}>Términos y Condiciones</h1>
        <p>
          Bienvenido a los Términos y Condiciones del Supercomputador Patagón, desarrollado por la Universidad Austral de Chile (UACh). Al acceder o utilizar nuestro sitio web y servicios, aceptas regirte por estos términos. Si no estás de acuerdo con ellos, te pedimos que te abstengas de usar este sitio web.
        </p>

        <h2>1. Introducción</h2>
        <p>
          Estos Términos y Condiciones regulan el acceso y uso del sitio web del Supercomputador Patagón, así como los servicios que se ofrecen a través del mismo. Nos reservamos el derecho de modificar estos términos en cualquier momento. Es tu responsabilidad revisarlos periódicamente.
        </p>

        <h2>2. Definiciones</h2>
        <p>
          En estos Términos y Condiciones, los siguientes términos tendrán el significado que se les atribuye a continuación:
        </p>
        <ul>
          <li><strong>“Sitio web”:</strong> La página web accesible a través del dominio patagon.uach.cl y sus subdominios.</li>
          <li><strong>“Usuario”:</strong> Persona física o jurídica que accede y utiliza el sitio web.</li>
          <li><strong>“Servicios”:</strong> Las funcionalidades ofrecidas a través del sitio web, incluyendo la reserva de recursos del supercomputador, generación de informes, y demás actividades relacionadas.</li>
          <li><strong>“Nosotros”:</strong> Refiriéndose a la Universidad Austral de Chile (UACh) y el equipo del Supercomputador Patagón.</li>
        </ul>

        <h2>3. Uso permitido del sitio web</h2>
        <p>
          El uso del sitio está sujeto a las siguientes condiciones:
        </p>
        <ul>
          <li>El usuario debe ser mayor de edad o contar con autorización de un representante legal.</li>
          <li>El sitio debe ser utilizado únicamente para fines legales y conforme a los presentes términos.</li>
          <li>No debes intentar acceder a secciones no autorizadas del sitio o sistemas relacionados.</li>
          <li>No debes emplear herramientas automatizadas, como bots, para interactuar con el sitio.</li>
        </ul>

        <h2>4. Registro y cuentas de usuario</h2>
        <h3>4.1. Creación de cuenta</h3>
        <p>
          Para acceder a ciertos servicios, es necesario crear una cuenta de usuario. Al registrarte, garantizas que la información proporcionada es precisa, completa y actualizada.
        </p>

        <h3>4.2. Seguridad de la cuenta</h3>
        <p>
          Es tu responsabilidad mantener la confidencialidad de las credenciales de tu cuenta. Nos reservamos el derecho de suspender o eliminar cuentas si detectamos actividades sospechosas.
        </p>

        <h3>4.3. Eliminación de cuenta</h3>
        <p>
          Puedes solicitar la eliminación de tu cuenta en cualquier momento enviando una solicitud a nuestro equipo de soporte. La eliminación estará sujeta a la resolución de obligaciones pendientes, como pagos o proyectos en curso.
        </p>

        <h2>5. Propiedad intelectual</h2>
        <p>
          Todos los contenidos de este sitio, incluyendo textos, gráficos, logos, imágenes, videos, software y código fuente, son propiedad de la Universidad Austral de Chile o de sus respectivos licenciantes y están protegidos por las leyes de propiedad intelectual aplicables.
        </p>
        <p>
          Queda prohibido copiar, modificar, distribuir, vender o reproducir cualquier contenido del sitio sin nuestro consentimiento expreso.
        </p>

        <h2>6. Limitación de responsabilidad</h2>
        <p>
          En ningún caso seremos responsables por:
        </p>
        <ul>
          <li>Daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del sitio.</li>
          <li>Errores, omisiones o interrupciones en los servicios ofrecidos.</li>
          <li>Perdida de datos, beneficios o ingresos debido al uso del supercomputador.</li>
        </ul>
        <p>
          Sin embargo, nos esforzamos por garantizar un servicio confiable y seguro.
        </p>

        <h2>7. Reservas de recursos</h2>
        <h3>7.1. Procedimiento de reserva</h3>
        <p>
          Los usuarios registrados pueden solicitar tiempo de uso en el supercomputador mediante el sistema de reservas disponible en el sitio. Todas las reservas están sujetas a disponibilidad y aprobación por parte del equipo de administración.
        </p>

        <h3>7.2. Cancelación de reservas</h3>
        <p>
          Las reservas no pueden cancelarse.
        </p>

        <h2>8. Privacidad y protección de datos</h2>
        <p>
          El tratamiento de tus datos personales se rige por nuestra Política de Privacidad, disponible <a href="/privacy">aquí</a>. Al aceptar estos términos, también aceptas nuestra política de privacidad.
        </p>

        <h2>9. Modificaciones a los términos</h2>
        <p>
          Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Te notificaremos sobre cambios significativos a través de nuestro sitio web o por correo electrónico. Es tu responsabilidad revisar los términos periódicamente.
        </p>

        <h2>10. Ley aplicable y jurisdicción</h2>
        <p>
          Estos Términos y Condiciones se rigen por las leyes de la República de Chile. Cualquier disputa será resuelta en los tribunales competentes de Valdivia.
        </p>

        <h2>11. Contacto</h2>
        <p>
          Para consultas relacionadas con estos términos, puedes contactarnos en:
        </p>
        <p>Email: patagon@uach.cl</p>
        <p>Teléfono: +56 63 222 3333</p>
        <p>Dirección: Campus Isla Teja, Valdivia, Chile</p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
