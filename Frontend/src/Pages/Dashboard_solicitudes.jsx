import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '../styles/Solicitudes.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

  const mostrarPDF = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(`Número de páginas: ${numPages}`);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-pic"></div>
          <h2>Admin_name</h2>
        </div>
        <nav className="menu">
          <ul>
            <li>Dashboard</li>
            <li className="active">Solicitudes</li>
            <li>Usuarios</li>
            <li>Ganancias</li>
            <li>Configuración</li>
            <li>Cerrar sesión</li>
          </ul>
        </nav>
      </aside>

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

        {/* Renderizar el PDF en un contenedor si está seleccionado */}
        {selectedPdf && (
          <div className="pdf-container">
            <h2>Solicitud</h2>
            <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={1} />
            </Document>
            <button onClick={() => setSelectedPdf(null)}>Cerrar Solicitud</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard_solicitudes;
