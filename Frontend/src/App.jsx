import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Dashboard_user from './Pages/Dashboard_user'; // Importa el nuevo componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-user" element={<Dashboard_user />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
