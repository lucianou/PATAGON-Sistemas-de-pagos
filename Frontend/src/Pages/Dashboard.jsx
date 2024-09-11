import React from 'react';
import '../styles/Dashboard.css'; // Para estilos personalizados

const Dashboard = () => {
  const adminName = "Admin_name";
  const profilePic = "/path/to/profile-picture.jpg"; // Cambia esto a la ruta correcta de la imagen

  return (
    <div className="dashboard-container">
      <MenuDashboard profilePic={profilePic} adminName={adminName} />{" "}
      {/* Pasa las props */}
      <main className="content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-widgets">
          <div className="widget small-widget"></div>
          <div className="widget small-widget"></div>
          <div className="widget large-widget"></div>

          <div className="bolsas-container">
            <div className="bolsa-card">
              <div className="bolsa-header">
                <p className="nombre">Nombre Bolsa</p>
                <p className="time">DD/HH/SS</p>
              </div>
              <ul className="bolsa-details">
                <li>Tarjeta Gráfica</li>
                <li>Vram</li>
                <li>Ram</li>
              </ul>
              <div className="footer">
                <p className="price">Precio</p>
                <button className="Boton_Compra">¡Lo quiero!</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
