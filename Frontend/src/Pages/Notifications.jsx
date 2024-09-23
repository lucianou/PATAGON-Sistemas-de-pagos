import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styles from '../styles/Notifications.module.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:3004');

        socket.on('newRequest', (data) => {
            const newNotification = {
                id: Date.now(), // Identificador único basado en la hora actual
                nombre: data.nombre,
                email: data.email
            };
            setNotifications((prev) => [...prev, newNotification]);

            // Elimina la notificación después de 5 segundos
            setTimeout(() => {
                setNotifications((prev) => prev.filter(notification => notification.id !== newNotification.id));
            }, 5000);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            {notifications.map((notification) => (
                <div key={notification.id} className={styles.notification}>
                    <div>Nueva solicitud: {notification.nombre}</div>
                    <div className={styles.email}>Correo: {notification.email}</div>
                   
                </div>
            ))}
        </div>
    );
};

export default Notifications;
