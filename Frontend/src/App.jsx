import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Registro from './Pages/Registro';
import Dashboard from './Pages/Dashboard';
import Dashboard_solicitudes from './Pages/Dashboard_solicitudes';
import Dashboard_user from './Pages/Dashboard_user';
import Dashboard_profit from './Pages/Dashboard_profit';
import Dashboard_config from './Pages/Dashboard_config';
import Notifications from './Pages/Notifications_Sonner';
import NotFound from './Pages/NotFound';
import ProtectedRoute from '../public/Components/ProtectedRoute'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <Router>
      <Notifications />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Rutas protegidas por token */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-solicitudes" element={
          <ProtectedRoute>
            <Dashboard_solicitudes />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-profit" element={
          <ProtectedRoute>
            <Dashboard_profit />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-config" element={
          <ProtectedRoute>
            <Dashboard_config />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-user" element={
          <ProtectedRoute>
            <Dashboard_user />
          </ProtectedRoute>
        } />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} /> {/* Cualquier otra ruta redirige a 404 */}
      </Routes>
    </Router>
  );
}

export default App;
