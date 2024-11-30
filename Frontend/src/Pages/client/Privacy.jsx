import React from "react";
import styles from '@clientStyles/PrivacyTerms.module.css';
import NavBar from "@components/navBarClient/navBarClient";
import Footer from "@components/FooterUser/Footer.jsx";

const Privacy = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.legalPage}>
        <h1 className={styles.legalTitle}>Política de Privacidad</h1>
        <p>
          Bienvenido a la Política de Privacidad del sitio web del Supercomputador Patagón, desarrollado por la Universidad Austral de Chile (UACh). 
          Nos comprometemos a proteger tu información personal y garantizar la seguridad de tus datos mientras navegas y utilizas nuestros servicios.
        </p>

        <h2>1. Introducción</h2>
        <p>
          La presente Política de Privacidad describe cómo recopilamos, utilizamos, compartimos y protegemos tu información personal cuando visitas nuestro sitio web
          o utilizas nuestros servicios. Esta política aplica a todos los usuarios, ya sean clientes, visitantes o empleados de la UACh, que interactúan con el
          sistema de gestión del supercomputador Patagón.
        </p>
        <p>
          Al utilizar nuestro sitio web, aceptas los términos establecidos en esta Política de Privacidad. Si no estás de acuerdo con alguno de estos términos, te
          pedimos que no utilices el sitio ni los servicios ofrecidos.
        </p>

        <h2>2. Información que recopilamos</h2>
        <h3>2.1. Información proporcionada por el usuario</h3>
        <p>
          Cuando creas una cuenta, reservas recursos del supercomputador o te comunicas con nosotros, podemos recopilar información como:
        </p>
        <ul>
          <li>Nombre completo</li>
          <li>Correo electrónico institucional</li>
          <li>Identificación única (RUT para usuarios chilenos o equivalente para usuarios internacionales)</li>
          <li>Organización o empresa a la que perteneces</li>
          <li>Detalles de los proyectos registrados</li>
          <li>Métodos de pago e historial de facturación</li>
        </ul>

        <h3>2.2. Información recopilada automáticamente</h3>
        <p>
          Cuando interactúas con nuestro sitio, automáticamente recopilamos información a través de cookies y tecnologías similares, incluyendo:
        </p>
        <ul>
          <li>Dirección IP</li>
          <li>Tipo de navegador y sistema operativo</li>
          <li>Páginas visitadas en nuestro sitio</li>
          <li>Duración de la navegación</li>
          <li>Registros de errores y desempeño del sistema</li>
        </ul>

        <h3>2.3. Información de terceros</h3>
        <p>
          También podemos obtener información de terceros, como instituciones asociadas, para validar la identidad del usuario o verificar la viabilidad de los proyectos.
        </p>

        <h2>3. Cómo utilizamos tu información</h2>
        <p>
          La información recopilada tiene diversos usos, incluyendo:
        </p>
        <ul>
          <li>Gestionar cuentas y autenticaciones de usuarios.</li>
          <li>Procesar reservas de tiempo de cómputo y recursos del supercomputador.</li>
          <li>Generar reportes de uso y rendimiento del sistema.</li>
          <li>Personalizar tu experiencia en el sitio web.</li>
          <li>Enviar actualizaciones sobre el estado de los servicios.</li>
          <li>Cumplir con obligaciones legales y regulatorias.</li>
        </ul>

        <h2>4. Compartición de la información</h2>
        <p>
          En algunos casos, compartimos información personal con terceros de confianza. Estos casos incluyen:
        </p>
        <ul>
          <li>Empresas proveedoras de servicios tecnológicos y de soporte.</li>
          <li>Instituciones académicas y de investigación colaboradoras.</li>
          <li>Entidades regulatorias, si es requerido por ley.</li>
        </ul>
        <p>
          Siempre que compartimos información, nos aseguramos de que estas terceras partes cumplan con estándares de seguridad y privacidad equivalentes a los nuestros.
        </p>

        <h2>5. Protección de la información</h2>
        <p>
          Hemos implementado medidas de seguridad robustas para proteger la información contra accesos no autorizados, uso indebido o alteración. Estas medidas incluyen:
        </p>
        <ul>
          <li>Cifrado de datos sensibles en tránsito y en reposo.</li>
          <li>Control de accesos basado en roles para usuarios.</li>
          <li>Auditorías regulares de los sistemas de seguridad.</li>
          <li>Copia de seguridad diaria de la información.</li>
        </ul>

        <h2>6. Retención de la información</h2>
        <p>
          Retenemos tu información solo por el tiempo necesario para cumplir con los propósitos descritos en esta política o para cumplir con requisitos legales y regulatorios.
        </p>

        <h2>7. Derechos de los usuarios</h2>
        <p>
          Como usuario, tienes derecho a:
        </p>
        <ul>
          <li>Acceder a la información que hemos recopilado sobre ti.</li>
          <li>Solicitar correcciones a información incorrecta o incompleta.</li>
          <li>Eliminar tu cuenta y los datos asociados, sujeto a restricciones legales.</li>
          <li>Limitar el procesamiento de tu información personal.</li>
          <li>Solicitar la portabilidad de tus datos en formatos estándar.</li>
        </ul>

        <h2>8. Uso de cookies</h2>
        <p>
          Nuestro sitio utiliza cookies para mejorar la experiencia del usuario. Puedes configurar tu navegador para rechazar cookies o ser notificado cuando se envíen.
        </p>

        <h2>9. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos sobre cambios importantes publicando una notificación en nuestro sitio.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Si tienes preguntas o inquietudes sobre esta política, puedes contactarnos en:
        </p>
        <p>Email: patagon@uach.cl</p>
        <p>Teléfono: +56 63 222 1111</p>
        <p>Dirección: Campus Isla Teja, Valdivia, Chile</p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
