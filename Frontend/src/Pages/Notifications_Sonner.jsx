import React, { useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { io } from 'socket.io-client';
import styles from '../styles/Notifications_Sonner.module.css'; // Importar los estilos modulares
//npm install sonner
const Notifications = () => {
  useEffect(() => {
    const socket = io('http://localhost:3004');

    socket.emit('joinAdmin', 'admin');

    socket.on('newNotification', (message) => {
      toast(message, {
        className: styles.toast, // Aplicar el estilo modular a la notificación
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Notifications;
