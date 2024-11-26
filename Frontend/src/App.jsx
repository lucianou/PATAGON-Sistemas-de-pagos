import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import styles from "../src/styles/Notifications_Sonner.module.css";
// exportaciones admins
import Login from './Pages/admin/Login';
import Registro from './Pages/admin/Registro';
import Dashboard_solicitudes from './Pages/admin/Dashboard_solicitudes';
import Dashboard_user from './Pages/admin/Dashboard_user';
import Dashboard_profit from './Pages/admin/Dashboard_profit';
import Dashboard_config from './Pages/admin/Dashboard_config';
import Dashboard_admin from './Pages/admin/Dashboard_admin';
import NotFound from './Pages/admin/NotFound';
import Solicitudes from './Pages/admin/Solicitudes';
import ProtectedRoute from '../public/Components/ProtectedRoute';
import RetornoPage from './Pages/PurchaseReturn';
import DashboardLayout from '../public/Components/notificaciones/DashboardLayout'
import Purchase_details from './Pages/admin/Purchase_details';
import MainClient from './Pages/client/main';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import Dashboard from './Pages/admin/Dashboard';
// exportaciones cliente
import Estudiante from './Pages/client/Estudiante';
import Externos from './Pages/client/Externos';
import UsInfo from './Pages/client/UsInfo';
import Bolsas from './Pages/client/Bolsas';
import Docs from './Pages/client/Docs';
import UseRequest from './Pages/client/UseRequest';
import Profile from './Pages/client/Profile';
import HistorialCompras from './Pages/client/historialCompras';
import Privacy from './Pages/client/Privacy';
import Terms from './Pages/client/Terms';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/dashboard" element={
          <ProtectedRoute isAllowed={["Administrador", "Co-admin"]}>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard-profit" element={
          <ProtectedRoute isAllowed={["Administrador"]}>
            <Dashboard_profit />
          </ProtectedRoute>
        } />

        <Route path="/dashboard-config" element={
          <ProtectedRoute isAllowed={["Administrador"]}>
            <Dashboard_config />
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard-users" element={
          <ProtectedRoute isAllowed={["Administrador"]}>
            <Dashboard_user />
          </ProtectedRoute>} />

        <Route path="/admin/dashboard-requests" element={
          <ProtectedRoute isAllowed={["Administrador","Revisor"]}>
            <Solicitudes />
            <Toaster position="top-right" toastOptions={{className: styles.customToast, duration: 3000,}}/>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard-roles" element={
          <ProtectedRoute isAllowed={["Administrador"]}>
            <Dashboard_admin />
            <Toaster position="top-right" toastOptions={{className: styles.customToast, duration: 3000,}}/>
          </ProtectedRoute>
        } />

        <Route path="/product-details/:id" element={
          <ProtectedRoute isAllowed={["Cliente"]}>
            <Purchase_details />
          </ProtectedRoute>
        } />

        <Route path="/paymentaccept" element={<RetornoPage />} />
        
        <Route path="/mainClient" element={<MainClient />} />

        <Route path="/about-us" element={ <UsInfo />} />

        <Route path="/Bolsas" element={<Bolsas />} />

        <Route path="/docs" element={<Docs />} />

        <Route path="/students" element={<Estudiante />} />

        <Route path="/external" element={<Externos />} />

        <Route path="/UseRequest" element={
          <ProtectedRoute isAllowed={["Cliente"]}>
            <UseRequest />
          </ProtectedRoute>
        } />

        <Route path="/account/profile" element={
          <ProtectedRoute isAllowed={["Cliente"]}>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/account/purchase-history" element={
          <ProtectedRoute isAllowed={["Cliente"]}>
            <HistorialCompras />
          </ProtectedRoute>
        } />

        <Route path="/privacy" element={<Privacy />} />

        <Route path="/terms" element={ <Terms />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} /> {/* Cualquier otra ruta redirige a 404 */}
      </Routes>
    </Router>
  );
}

export default App;
