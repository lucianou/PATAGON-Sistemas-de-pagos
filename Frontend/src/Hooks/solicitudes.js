// solicitudes.js
export const fetchSolicitudes = async () => {
    try {
        const response = await fetch('http://localhost:3004/api/command/requests');
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
