// ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, isAllowed, onlyPaidClients = false}) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  if (!token && location.pathname === "/bags") {
    return children; 
  }

  if (!token) {
    return <Navigate to="/404" />;
  }

  const user = jwtDecode(token);
  const rol = user.rol;
  const type = user.type;
  

  if (!isAllowed.includes(rol)) {
    return <Navigate to="/404" />;
  }

  
   if (onlyPaidClients && type !== 'Pagado') {
    return <Navigate to="/404" />;
  }
  
  return children;

};

export default ProtectedRoute;
