import React from 'react';
import styles from './Card.module.css';

const Card = ({ solicitud }) => {
  const handleViewPDF = async () => {
    const id = solicitud.ID_request; // Obtener el ID de la solicitud
    const token = localStorage.getItem('token'); // Obtener el token almacenado

    try {
      const response = await fetch(`http://localhost:3003/viewPDF/${id}`, {
        method: 'GET', // Usar el método GET
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Envía el token en los headers si es necesario
        },
      });

      if (!response.ok) {
        const errorData = await response.text(); // Obtener el texto de error
        throw new Error(`Error: ${response.status} ${response.statusText}. ${errorData}`); // Manejo de errores más detallado
      }

      // Si la respuesta es correcta, abrir el PDF directamente
      const blob = await response.blob(); // Obtener el archivo como Blob
      const url = window.URL.createObjectURL(blob); // Crear una URL para el Blob
      window.open(url, '_blank'); // Abrir el PDF en una nueva pestaña

    } catch (error) {
      console.error('Error al obtener el PDF:', error.message); // Imprimir el mensaje de error
    }
  };

  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>Nombre: {solicitud.nombre}</h3>
        <p className={styles.info}><strong>Email:</strong> {solicitud.email}</p>
        <p className={styles.info}><strong>Institución:</strong> {solicitud.institucion}</p>
        <p className={styles.info}><strong>Estado:</strong> {solicitud.estado}</p>
      </div>
      <div className={styles.files}>
        <button
          className={styles.fileButton}
          title="Ver PDF"
          onClick={handleViewPDF} // Añadir el manejador de clic
        >
          <img
            src="/icons/pdf-icon.svg"
            alt="Ver PDF"
            className={styles.fileIcon}
          />
        </button>
        <button
          className={styles.fileButton}
          title="Ver PUB"
        >
          <img
            src="/icons/pub_icon.svg"
            alt="Ver PUB"
            className={styles.fileIcon}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
