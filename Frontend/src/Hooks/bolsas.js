import { useEffect, useState } from 'react';

const useFetchBolsa = (id) => {
    const [bolsa, setBolsa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBolsaDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3003/api/bolsas/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBolsa(data);
                } else {
                    throw new Error('Error al obtener los detalles de la bolsa');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBolsaDetails();
    }, [id]);

    return { bolsa, loading, error };
};

export default useFetchBolsa;
