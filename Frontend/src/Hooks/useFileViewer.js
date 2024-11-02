import { useCallback } from 'react';

const ipserver = import.meta.env.VITE_IP;
const port = import.meta.env.VITE_PORT;

const useFileViewer = () => {
    const token = localStorage.getItem('token'); 
    const viewFile = useCallback(async (id, type) => {
        const endpoint = type === 'pdf' 
            ? `http://${ipserver}:${port}/api/command/viewPDF/${id}` 
            : `http://${ipserver}:${port}/api/command/get-pub-key/${id}`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
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

            if (type === 'pub') {
                const data = await response.json();
                console.log(data.publicKey);
                return data.publicKey; 
            }
            else {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                window.open(url); 
                window.URL.revokeObjectURL(url); 
            }
        } catch (error) {
            console.error('Error al obtener el archivo:', error);
        }
    }, []);

    return { viewFile };
};

export default useFileViewer;
