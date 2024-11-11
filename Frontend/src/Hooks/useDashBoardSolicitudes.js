import { useState, useEffect } from 'react';
import refreshAccessToken from '../../public/Components/RefreshToken.jsx';

const useFetchSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ipserver = import.meta.env.VITE_IP;
    const port = import.meta.env.VITE_PORT;

    useEffect(() => {
        const fetchSolicitudes = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');

            try {
                let response = await fetch(`http://${ipserver}:${port}/api/command/requests`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 403 || response.status === 401) {
                    const newToken = await refreshAccessToken();
                    response = await fetch(`http://${ipserver}:${port}/api/command/requests`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${newToken}`
                        }
                    });
                }

                if (!response.ok) {
                    throw new Error('Error en la red al obtener las solicitudes');
                }

                const data = await response.json();
                setSolicitudes(data);
            } catch (error) {
                console.error('Error al obtener las solicitudes:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitudes();
    }, [ipserver, port]);

    return { solicitudes, loading, error };
};

export default useFetchSolicitudes;
