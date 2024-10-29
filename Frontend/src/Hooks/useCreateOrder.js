import { useState } from 'react';

const useCreateOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const HOST = import.meta.env.VITE_IP;

    const createOrder = async (orderData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://${HOST}:3003/api/command/create-payment`, {	
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                return { urlPago: data.links[1].href }; 
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear la orden');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error de red al intentar crear la orden:', err);
            throw err; // Vuelve a lanzar el error para manejarlo fuera del hook
        } finally {
            setLoading(false);
        }
    };

    return { createOrder, loading, error };
};

export default useCreateOrder;
