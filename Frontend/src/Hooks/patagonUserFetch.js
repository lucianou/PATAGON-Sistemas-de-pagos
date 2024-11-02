export const fetchRequest = async (url, method, data) => {
  try {
      const response = await fetch(url, {
          method,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      return { success: true, data: result };
  } catch (error) {
      console.error('Error en fetchRequest:', error);
      return { success: false, error: error.message };
  }
};
