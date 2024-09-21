import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles1 from '../styles/DashboardGeneral.module.css';
import styles from '../styles/DashboardSolicitudes.module.css';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard'; // Importa el componente del menú
import Notifications from './Notifications';

// Configuración del worker para pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Dashboard_solicitudes = () => {
  const [error, setErrors] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect (() => {
    fetch('http://localhost:3004/api/command/requests', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if(!data.error) {
          console.log(data);
        } else {
          setErrors({ server: data.error });
        }
      })
      .catch(error => {
        console.log('Error:',error);
        setErrors({ server: 'Error en la soliditud: ' + error.message });
      });

  });


  const initialSolicitudes = [
    {
      username: 'user1',
      email: 'user1@gmail.com',
      archivo: 'archivo1.pub',
      fecha: '10/09/2024',
      pdfUrl: '/assets/solicitud_plantilla.pdf',
    },
    { username: 'user2', email: 'user2@gmail.com', archivo: 'archivo2.pub', fecha: '11/09/2024', pdfUrl: '/assets/documento2.pdf'},
    { username: 'user2', email: 'user2@gmail.com', archivo: 'archivo2.pub', fecha: '11/09/2024', pdfUrl: '/assets/documento2.pdf'},
    { username: 'user2', email: 'user2@gmail.com', archivo: 'archivo2.pub', fecha: '11/09/2024', pdfUrl: '/assets/documento2.pdf'},
    { username: 'user2', email: 'user2@gmail.com', archivo: 'archivo2.pub', fecha: '11/09/2024', pdfUrl: '/assets/documento2.pdf'},
    { username: 'user2', email: 'user2@gmail.com', archivo: 'archivo2.pub', fecha: '11/09/2024', pdfUrl: '/assets/documento2.pdf'},
    { username: 'user2', email: 'user2@gmail.com', archivo: 'archivo2.pub', fecha: '11/09/2024', pdfUrl: '/assets/documento2.pdf'},
    { username: 'user2', email: 'user2@gmail.com', archivo: 'archivo2.pub', fecha: '11/09/2024', pdfUrl: '/assets/documento2.pdf'},
    { username: 'user2', email: 'user2@gmail.com', archivo: 'archivo2.pub', fecha: '11/09/2024', pdfUrl: '/assets/documento2.pdf'},
  ];

  const [solicitudes, setSolicitudes] = useState(initialSolicitudes);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const solicitudesPerPage = 5; // Número de solicitudes por página
  const totalPages = Math.ceil(solicitudes.length / solicitudesPerPage);

  // Calcular las solicitudes de la página actual
  const indexOfLastSolicitud = currentPage * solicitudesPerPage;
  const indexOfFirstSolicitud = indexOfLastSolicitud - solicitudesPerPage;
  const currentSolicitudes = solicitudes.slice(indexOfFirstSolicitud, indexOfLastSolicitud);
  
  const mostrarPDF = (pdfUrl, index) => {
    setSelectedPdf(pdfUrl);
    setSelectedIndex(index);
    setPageNumber(1); // Reinicia la página al abrir un nuevo PDF
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const closePdfModal = () => {
    setSelectedPdf(null);
    setSelectedIndex(null);
  };

  const goToNextSolicitudesPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousSolicitudesPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para rechazar la solicitud
  const rechazarSolicitud = () => {
    const updatedSolicitudes = solicitudes.filter((_, index) => index !== selectedIndex);
    setSolicitudes(updatedSolicitudes);
    closePdfModal(); // Cerrar el modal después de rechazar
  };

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={ () => {setIsOpen(!isOpen)} } isOpen={isOpen}/> {/* Incluye el componente MenuDashboard aquí */}
      <Notifications/>
      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`} id={styles.content}>
        <div className={styles1.header} id={styles.header}>
          <h1>Solicitudes</h1>
          <span className={styles.pageCount}> total: {solicitudes.length}</span>
        </div>

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

        {/* Modal para visualizar el PDF */}
        {selectedPdf && (
          <div className={styles.pdfModal}>
            <div className={styles.pdfContainer}>
              <h2>Solicitud</h2>
              <div className={styles.pdfDocument}>
                <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              </div>
              <div className={styles.pdfControls}>
                <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
                  -
                </button>
                <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                  +
                </button>
                <span className={styles.pageCount}>{pageNumber} de {numPages}</span>
              </div>
              <div className={styles.pdfActions}>
                <button onClick={rechazarSolicitud}>Rechazar</button>
                <button>Aceptar</button>
                <button onClick={closePdfModal}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard_solicitudes;
