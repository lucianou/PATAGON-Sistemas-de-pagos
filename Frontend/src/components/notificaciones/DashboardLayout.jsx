import React from 'react';
import Notifications from '../../Components/notificaciones/notificaciones_dashboard';

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Notifications /> {/* Aquí se incluye el componente de notificaciones */}
      <div>{children}</div> {/* Renderiza las páginas hijas aquí */}
    </div>
  );
};

export default DashboardLayout;
