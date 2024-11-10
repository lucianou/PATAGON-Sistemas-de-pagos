import { useState, useEffect } from 'react';
import refreshAccessToken from '../../public/Components/RefreshToken.jsx';

const DashboardBolsasUser = () => {
  const [bolsas, setBolsas] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ip_server = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`http://${ip_server}:${port}/api/command/get-products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        //refrescar token
        if(response.status === 401 || response.status === 403){
          refreshAccessToken();
          const response = await fetch(`http://${ip_server}:${port}/api/command/get-products`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        }
        
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setBolsas(result);  // Cambiado a setBolsas
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { bolsas, loading, error };  
};

export default DashboardBolsasUser;
