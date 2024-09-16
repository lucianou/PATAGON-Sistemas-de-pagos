import React from "react";
import MenuDashboard from "../../public/Components/menuDashboard/menuDashboard"; // Importa el componente del menú
import "../styles/Dashboard.css"; // Para estilos personalizados

const Dashboard_profit = () => {
  const adminName = "Admin_name";
  const profilePic = "/path/to/profile-picture.jpg"; // Cambia esto a la ruta correcta de la imagen

  return (
    <div className="dashboard-container">
      <MenuDashboard profilePic={profilePic} adminName={adminName} />{" "}
      {/* Pasa las props */}
      <main className="content">
        <div className="dashboard-header">
          <h1>Ganancias</h1>
          <div></div>
          <div></div>
          <div></div>
          </div>
      </main>
    </div>
  );
};

export default Dashboard_profit;
