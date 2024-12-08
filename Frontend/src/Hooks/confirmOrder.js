import { useState } from 'react';

const useConfirmPayment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const IP =  import.meta.env.VITE_SERVERIP;

    const confirmPayment = async (token) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${IP}/confirm-payment?token=${token}`, {
                method: 'POST',
            });

            if (response.ok) {
                const data = await response.json();
                return data.redirectUrl; // Devuelve la URL de redirección
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al confirmar el pago');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error de red al intentar confirmar el pago:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { confirmPayment, loading, error };
};

export default useConfirmPayment;
