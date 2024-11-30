import React from 'react';
import styles from './DashboardSolicitudes.module.css';

const SolicitudesList = ({ solicitudes, mostrarPDF, currentPage, totalPages, goToPreviousSolicitudesPage, goToNextSolicitudesPage }) => {
  const solicitudesPerPage = 5;
  const indexOfLastSolicitud = currentPage * solicitudesPerPage;
  const indexOfFirstSolicitud = indexOfLastSolicitud - solicitudesPerPage;
  const currentSolicitudes = solicitudes.slice(indexOfFirstSolicitud, indexOfLastSolicitud);

  return (
    <div>
      {/* Lista de solicitudes con paginación */}
      <div className={styles.solicitudesList}>
        {currentSolicitudes.map((solicitud, index) => (
          <div className={styles.solicitudItem} key={index}>
            <span>{solicitud.username}</span>
            <span>{solicitud.email}</span>
            <span>{solicitud.archivo}</span>
            <span>{solicitud.fecha}</span>
            <button className={styles.verPdfBtn} onClick={() => mostrarPDF(solicitud.pdfUrl, index)}>
              Ver Solicitud
            </button>
          </div>
        ))}
      </div>

      {/* Botones de paginación */}
      <div className={styles.pagination}>
        <button onClick={goToPreviousSolicitudesPage} disabled={currentPage === 1}>
          -
        </button>
        <button onClick={goToNextSolicitudesPage} disabled={currentPage === totalPages}>
          +
        </button>
        <span className={styles.pageCount}>Página {currentPage} de {totalPages}</span>
      </div>
    </div>
  );
};

export default SolicitudesList;
