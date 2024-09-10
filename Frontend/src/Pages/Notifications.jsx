import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

// Conectar con el servidor Socket.io
const socket = io();

function Notifications() {
  useEffect(() => {
    // Solicitar permiso para mostrar notificaciones cuando se carga el componente
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    // Escuchar notificaciones del servidor
    socket.on('newNotification', (message) => {
      // Verificar si las notificaciones están permitidas
      if (Notification.permission === 'granted') {
        // Mostrar notificación con la Notification API
        new Notification('Nueva Solicitud Recibida', {
          body: message,
        });
      } else {
        console.log('Permiso de notificación no concedido.');
      }
    });

    // Limpiar el evento socket cuando el componente se desmonte
    return () => {
      socket.off('newNotification');
    };
  }, []);

  return null; // Este componente no necesita renderizar nada en el DOM
}

export default Notifications;