const refreshAccessToken = async () => {

  const refreshToken = localStorage.getItem('refreshToken'); 
  const apiKey = import.meta.env.VITE_API_KEY;
  const port = import.meta.env.VITE_PORT;
  const ipserver = import.meta.env.VITE_IP; 

  try {
      const response = await fetch(`http://${ipserver}:${port}/api/command/token/refresh`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
          },
          body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
          throw new Error('Error al refrescar el token');
      }

      const data = await response.json();
      // Almacena el nuevo access token
      localStorage.setItem('token', data.token);
      return data.token; // Devuelve el nuevo token
  } catch (error) {
      console.error('Error al refrescar el token:', error);
      throw error; // Propaga el error
  }
};

export default refreshAccessToken; 
