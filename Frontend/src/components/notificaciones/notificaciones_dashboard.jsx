import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import styles from '../../../src/styles/Notifications.module.css';
import { fetchSolicitudes } from '../../../src/Hooks/solicitudes';

const port = import.meta.env.VITE_PORT;
const ipserver = import.meta.env.VITE_IP;

const Notification_dashboard = () => {
    const [pendingCount, setPendingCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const socket = io(`http://${ipserver}:${port}`);

    useEffect(() => {
        const getSolicitudes = async () => {
            try {
                const data = await fetchSolicitudes();
                const filteredRequests = data.filter(request => request.estado === 'pendiente');
                setPendingCount(filteredRequests.length);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getSolicitudes();

        socket.on('newRequest', () => {
            getSolicitudes();
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const handleNavigate = () => {
        navigate('/dashboard-solicitudes'); // Reemplaza '/ruta-deseada' con la ruta deseada
    };

    return (
        <div className={styles.notification}>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h4>Solicitudes Pendientes</h4>
                        <p>Tienes {pendingCount} solicitud(es) pendiente(s).</p>
                        {/* Botón para redirigir */}
                        <button onClick={handleNavigate} className={styles.navigateButton}>
                            Ir a Solicitudes
                        </button>
                    </div>
                </div>
            )}
            <div className={styles.notificationIcon} onClick={toggleModal} style={{ cursor: 'pointer' }}>
                <span>🔔</span>
                {pendingCount > 0 && <span className={styles.notificationDot}>{pendingCount}</span>}
            </div>
        </div>
    );
};

export default Notification_dashboard;
