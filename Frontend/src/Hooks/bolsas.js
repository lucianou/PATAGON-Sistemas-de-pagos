import { useEffect, useState } from 'react';

const useFetchBolsa = (id) => {  // Añadir el token como argumento
    const [bolsa, setBolsa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); 
    const port = import.meta.env.VITE_PORT;
    const ipserver = import.meta.env.VITE_IP;

    useEffect(() => {
        const fetchBolsaDetails = async () => {
            try {
                const response = await fetch(`http://${ipserver}:${port}/api/command/get-product/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json',  
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setBolsa(data);
                } else {
                    throw new Error('Error al obtener los detalles de la bolsa');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBolsaDetails();
    }, [id, token]);  

    return { bolsa, loading, error };
};

export default useFetchBolsa;
