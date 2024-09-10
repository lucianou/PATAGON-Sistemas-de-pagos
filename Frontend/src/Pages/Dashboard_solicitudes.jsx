import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '../styles/Solicitudes.css';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard'; // Importa el componente del menú

// Configuración del worker para pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Dashboard_solicitudes = () => {
  const solicitudes = [
    {
      username: 'user1',
      email: 'user1@gmail.com',
      archivo: 'archivo1.pub',
      fecha: '10/09/2024',
      pdfUrl: '/assets/solicitud_plantilla.pdf',
    },
    {
      username: 'user2',
      email: 'user2@gmail.com',
      archivo: 'archivo2.pub',
      fecha: '11/09/2024',
      pdfUrl: '/assets/documento2.pdf',
    },
    // Puedes agregar más solicitudes aquí
  ];

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const mostrarPDF = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
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
  };

  return (
    <div className="dashboard-container">
      <MenuDashboard /> {/* Incluye el componente MenuDashboard aquí */}

      <main className="content">
        <div className="header">
          <h1>Solicitudes</h1>
          <span className="page-count">{solicitudes.length} de {solicitudes.length}</span>
        </div>

        <div className="solicitudes-list">
          {solicitudes.map((solicitud, index) => (
            <div className="solicitud-item" key={index}>
              <span>{solicitud.username}</span>
              <span>{solicitud.email}</span>
              <span>{solicitud.archivo}</span>
              <span>{solicitud.fecha}</span>
              <button
                className="ver-pdf-btn"
                onClick={() => mostrarPDF(solicitud.pdfUrl)}
              >
                Ver Solicitud
              </button>
            </div>
          ))}
        </div>

        {/* Renderizar el PDF en un modal si está seleccionado */}
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
                  Anterior
                </button>
                <span>Página {pageNumber} de {numPages}</span>
                <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                  Siguiente
                </button>
              </div>
              <button onClick={closePdfModal}>Cerrar Solicitud</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard_solicitudes;
