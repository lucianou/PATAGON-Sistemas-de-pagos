import React, { useState, useEffect } from "react";
import styles from "../../styles/client/main.module.css";
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Card from '../../../public/Components/Tarjeta/Card.jsx';
import logo from "../../../src/assets/patagon-logo-text-color.png";
import refreshAccessToken from '../../../public/Components/RefreshToken.jsx';

const MainClient = () => {
  const [bolsas, setBolsas] = useState([]); 
  const ipserver = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    const fetchBolsas = async () => {
      const token = localStorage.getItem('token'); 
  
      try {
        const response = await fetch(`http://${ipserver}:${port}/api/command/get-products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        if(response.status == 403){
          return refreshAccessToken().then(newToken => {
            return fetch(`http://${ipserver}:${port}/api/command/get-products`,{
              method: 'GET',
              headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newToken}` 
              }
            });
          });
        }

        if (!response.ok) {
          throw new Error('Error en la red al obtener las bolsas'); 
        }
  
        const data = await response.json(); 
        setBolsas(data);
      } catch (error) {
        console.error('Error al obtener las bolsas:', error);
      }
    };
  
    fetchBolsas();
  }, []);
  
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.headerLogo}>
        <img src={logo} alt="logo" className={styles.logo}/>
        <h2>LA SUPERCOMPUTADORA DE LA UACH</h2>
      </div>
      <section className={styles.section1}>
          <div className={styles.dashboardWidgets}>
            { (
              bolsas.map((bolsa, index) => {
                const delay = `${index * 100}ms`; // Incrementar el delay por cada usuario
                return ( // Itera sobre las bolsas obtenidas y muestra una Card para cada una
                  <Card
                    key={index} // Asegúrate de usar un key único
                    nombre={bolsa.nombre}
                    tiempo={bolsa.tiempo}
                    precio={bolsa.precio}
                    detalles={bolsa.detalles} // Pasamos el arreglo de detalles
                    delay={delay} // Pasamos el delay como prop
                    ID = {bolsa.ID}
                  />
                );
              })
            )}
          </div>
      </section>
      <section className={styles.section2}>
        <div className={styles.header}>
            <h1>NOSOTROS SOMOS</h1>
            <h3>Tu Partner en computacion de alto rendimiento</h3>
        </div>
        <div className={styles.parrafos}>
          <div>
            <h2>Misión y Visión</h2>
            <p>Nuestra Misión es más que ofrecer capacidad computacional: queremos ser tu aliado estratégico en Computación de Alto Rendimiento (HPC). Afrontamos tus desafíos de investigación científica y computación intensiva como si fueran nuestros, ofreciéndote soluciones tecnológicas avanzadas, eficientes y adaptadas a tus necesidades.</p>
            <p>Nuestra Visión es brindar un servicio de excelencia en HPC que permita a investigadores, empresas y organizaciones realizar simulaciones y análisis de gran escala. Queremos que tus proyectos científicos y tecnológicos se desarrollen de manera fluida, eficiente y con resultados de alto impacto.</p>
          </div>
          <div>
            <h2>Por que preferirnos</h2>
            <ul>
              <li>Somos un equipo especializado en computación científica, investigación avanzada y desarrollo tecnológico.</li>
              <li>Estamos comprometidos con el éxito de tus proyectos, brindando asesoría personalizada y recursos de última generación.</li>
              <li>Contamos con experiencia en múltiples disciplinas científicas y sectores industriales.</li>
              <li>Ofrecemos un entorno optimizado para cálculos intensivos, garantizando el máximo rendimiento.</li>
              <li>Trabajamos con planificación detallada y seguimiento constante para asegurar el éxito de cada tarea.</li>
              <li>Respaldamos nuestros servicios con acuerdos claros y un enfoque de colaboración duradero.</li>
            </ul>
          </div>
        </div>
        <section className={styles.trustedPartner}>
          <h1>Un aliado seguro</h1>
          <div className={styles.divTexto}>
            <p>Seremos mucho más que otro recurso técnico en tu equipo. </p>
            <p>Porque hacemos nuestros tus desafíos, nos adaptamos a tus necesidades y te brindamos la seguridad de que tus proyectos de investigación y desarrollo estarán en manos confiables, con el soporte y la tecnología de vanguardia del supercomputador Patagón.</p>
          </div>
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
      </section>
    </div>
  );
}

export default MainClient;