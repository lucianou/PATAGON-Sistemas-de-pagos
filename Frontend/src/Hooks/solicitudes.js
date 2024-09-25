// solicitudes.js
const ipserver = import.meta.env.VITE_IP;
export const fetchSolicitudes = async () => {
    const port = import.meta.env.VITE_PORT;
    try {
        const response = await fetch(`http://${ipserver}:${port}/api/command/requests`);
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
