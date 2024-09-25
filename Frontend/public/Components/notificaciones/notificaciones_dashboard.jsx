import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from '../../../src/styles/Notifications.module.css';
import { fetchSolicitudes } from '../../../src/Hooks/solicitudes'; // Ajusta la ruta según sea necesario

const port = import.meta.env.VITE_PORT;
const ipserver = import.meta.env.VITE_IP;

const Notification_dashboard = () => {
    const [pendingCount, setPendingCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const socket = io(`http://${ipserver}:${port}`); // Conéctate al socket

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

        // Escuchar el evento de nueva solicitud
        socket.on('newRequest', () => {
            getSolicitudes(); // Actualiza la lista de solicitudes al recibir una nueva
        });

        return () => {
            socket.disconnect(); // Desconectar al salir del componente
        };
    }, [socket]); // Asegúrate de incluir `socket` en las dependencias

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

    return (
        <div className={styles.notificationIcon}>
            <div onClick={toggleModal} style={{ cursor: 'pointer' }}>
                🔔
                {pendingCount > 0 && <span className={styles.notificationDot}>{pendingCount}</span>}
            </div>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h4>Solicitudes Pendientes</h4>
                        <p>Tienes {pendingCount} solicitud(es) pendiente(s).</p>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification_dashboard;