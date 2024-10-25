import { useCallback } from 'react';

const ipserver = import.meta.env.VITE_IP;
const port = import.meta.env.VITE_PORT;

const useFileViewer = () => {
    const token = localStorage.getItem('token'); // Obtén el token almacenado
    const viewFile = useCallback(async (id, type) => {
        const endpoint = type === 'pdf' 
            ? `http://${ipserver}:${port}/viewPDF/${id}` 
            : `http://${ipserver}:${port}/viewPUB/${id}`;

        try {
            // Abre el archivo en una nueva pestaña
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Envía el token en los headers
                }
            });

            if (response.status === 403) {
                return refreshAccessToken().then(newToken => {
                    return fetch(`http://${ipserver}:${port}/api/command/requests`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${newToken}`
                        }
                    });
                });
            }

            if (!response.ok) {
                throw new Error('Error al obtener el archivo');
            }

            // Si el archivo es un PUB, se puede abrir directamente
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            window.open(url); // Abre en nueva pestaña
            window.URL.revokeObjectURL(url); // Libera el objeto URL
        } catch (error) {
            console.error('Error al obtener el archivo:', error);
        }
    }, []);

    return { viewFile };
};

export default useFileViewer;
