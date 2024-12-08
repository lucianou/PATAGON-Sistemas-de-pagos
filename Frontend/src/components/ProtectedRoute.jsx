// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, isAllowed}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/404" />;
  }

  const user = jwtDecode(token);
  const rol = user.rol;
  

  if (!isAllowed.includes(rol)) {
    return <Navigate to="/404" />;
  }
  
  return children;

 
 
};

export default ProtectedRoute;
