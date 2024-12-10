import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const PurshaseHistory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ip_server = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const email = decodedToken.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`http://${ip_server}:${port}/api/command/get-ingreso-usuario?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, []);

  return { data, loading, error };
};

export default PurshaseHistory;
