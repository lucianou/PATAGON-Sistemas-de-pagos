import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '../styles/Solicitudes.css';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard'; // Importa el componente del menú

// Configuración del worker para pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Dashboard_solicitudes = () => {
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
    // Añade más solicitudes aquí
  ];

  const [solicitudes, setSolicitudes] = useState(initialSolicitudes);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Control de la paginación de solicitudes
  const [currentPage, setCurrentPage] = useState(1);
  const solicitudesPerPage = 7; // Número de solicitudes por página
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
    <div className="dashboard-container">
      <MenuDashboard /> {/* Incluye el componente MenuDashboard aquí */}

      <main className="content">
        <div className="header">
          <h1>Solicitudes</h1>
          <span className="page-count"> total: {solicitudes.length}</span>
        </div>

        {/* Lista de solicitudes con paginación */}
        <div className="solicitudes-list">
          {currentSolicitudes.map((solicitud, index) => (
            <div className="solicitud-item" key={index}>
              <span>{solicitud.username}</span>
              <span>{solicitud.email}</span>
              <span>{solicitud.archivo}</span>
              <span>{solicitud.fecha}</span>
              <button
                className="ver-pdf-btn"
                onClick={() => mostrarPDF(solicitud.pdfUrl, index)}
              >
                Ver Solicitud
              </button>
            </div>
          ))}
        </div>

        {/* Botones de paginación */}
        <div className="pagination">
          <button
            onClick={goToPreviousSolicitudesPage}
            disabled={currentPage === 1}
          >
            -
          </button>
          <button
            onClick={goToNextSolicitudesPage}
            disabled={currentPage === totalPages}
          >
            +
          </button>
          <span className="page-count">Página {currentPage} de {totalPages}</span>
        </div>

        {/* Modal para visualizar el PDF */}
        {selectedPdf && (
          <div className="pdf-modal">
            <div className="pdf-container">
              <h2>Solicitud</h2>
              <div className="pdf-document">
                <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              </div>
              <div className="pdf-controls">
                <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
                  -
                </button>
                <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                  +
                </button>
                <span className="page-count">{pageNumber} de {numPages}</span>
              </div>
              <div className="pdf-actions">
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
