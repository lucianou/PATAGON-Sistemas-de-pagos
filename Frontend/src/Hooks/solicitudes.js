const ipserver = import.meta.env.VITE_IP;

export const fetchSolicitudes = async () => {
    const port = import.meta.env.VITE_PORT;
    const token = localStorage.getItem('token'); // Obtén el token almacenado
    
    try {
        const response = await fetch(`http://${ipserver}:${port}/api/command/requests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Envía el token en los headers
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        console.log('Solicitudes recibidas:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        throw error;
    }
};
