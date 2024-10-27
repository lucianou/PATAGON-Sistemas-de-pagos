import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RetornoPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const commerceOrder = queryParams.get('commerceOrder');
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Aquí podrías hacer una llamada a tu API para verificar el estado de la transacción
    // Por ejemplo: verificarTransaccion(commerceOrder)
    
    setLoading(false);
  }, [commerceOrder]);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div>
      {status === 'success' ? (
        <h1>Compra exitosa</h1>
      ) : (
        <h1>Error en la compra</h1>
      )}
    </div>
  );
};

export default RetornoPage;
