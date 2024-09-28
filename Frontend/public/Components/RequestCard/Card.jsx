import React from 'react';
import styles from './Card.module.css';

const Card = ({ solicitud }) => {
  const handleViewFile = (fileType) => {
    
    const bufferData = fileType === 'PDF' ? solicitud.documento_pdf.data : solicitud.documento_pub.data;
 
    if (!bufferData) {
      alert('No hay archivo disponible para visualizar.');
      return;
    }
  
    const byteArray = new Uint8Array(bufferData);
    const blob = new Blob([byteArray], { type: fileType === 'PDF' ? 'application/pdf' : 'application/octet-stream' });

    const fileURL = URL.createObjectURL(blob);
    const newTab = window.open(fileURL, '_blank');

    if (!newTab) {
      alert('Por favor, permite las ventanas emergentes para visualizar el archivo.');
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
        {solicitud.documento_pdf && (
          <button
            className={styles.fileButton}
            onClick={() => handleViewFile('PDF')}
            title="Ver PDF"
          >
            <img
              src="/icons/pdf-icon.svg"
              alt="Ver PDF"
              className={styles.fileIcon}
            />
          </button>
        )}
        {solicitud.documento_pub && (
          <button
            className={styles.fileButton}
            onClick={() => handleViewFile('PUB')}
            title="Ver PUB"
          >
            <img
              src="/icons/pub_icon.svg"
              alt="Ver PUB"
              className={styles.fileIcon}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
