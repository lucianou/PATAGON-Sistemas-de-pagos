import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Registro from './Pages/Registro';
import Dashboard from './Pages/Dashboard';
import Dashboard_solicitudes from './Pages/Dashboard_solicitudes';
import Dashboard_user from './Pages/Dashboard_user'; // Importa el nuevo componente
import Dashboard_profit from './Pages/Dashboard_profit';
import Dashboard_config from './Pages/Dashboard_config';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-solicitudes" element={<Dashboard_solicitudes />} />
        <Route path="/dashboard-profit" element={<Dashboard_profit />} />
        <Route path="/dashboard-config" element={<Dashboard_config />} />
        <Route path="/dashboard-user" element={<Dashboard_user />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
