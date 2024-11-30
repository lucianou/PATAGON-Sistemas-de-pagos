const ipserver = import.meta.env.VITE_IP;
import refreshAccessToken from '../components/RefreshToken.jsx';

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

        if(response.status == 403 || response.status == 401){
            return refreshAccessToken().then(newToken => {
                return fetch(`http://${ipserver}:${port}/api/command/requests`,{
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}` 
                    }
                });
            });
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        throw error;
    }
};
