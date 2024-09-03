// Pages/Dashboard_user.jsx
import React from 'react';
import '../styles/Solicitudes.css'; // Archivo CSS para la página de solicitudes

const Dashboard_solicitudes = () => {
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
          <span className="page-count">4 de 14</span>
        </div>
        <div className="solicitudes-list">
          <div className="solicitud-item">
            <span>Username</span>
            <span>user@gmail.com</span>
            <span>archivo.pub</span>
            <span>xx/xx/xxxx</span>
            <span className="icon">
              <i className="fas fa-box"></i> {/* Aquí puedes usar un ícono de Font Awesome o cualquier otro */}
            </span>
          </div>
          <div className="solicitud-item"></div>
          <div className="solicitud-item"></div>
          <div className="solicitud-item"></div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard_solicitudes;
