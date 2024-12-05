import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '@styles/retorno.module.css';

const RetornoPage = () => {
  const [isValid, setIsValid] = useState(false);
  const [counter, setCounter] = useState(7);
  const location = useLocation();
  const IP = import.meta.env.VITE_SERVERIP;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("verifyToken");

    if (token) {
      // Validar el token con el backend
      fetch(`${IP}/validate-token?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.isValid) {
            setIsValid(true); // Token válido, mostrar la página
          } else {
            window.history.back();
            return;
          }
        })
        .catch(() => window.location.href = "/mainClient");
    } else {
      // Si no hay token, redirigir
      window.history.back();
      return;
    }
  }, [location]);

  useEffect(() => {
    if (isValid) {
      const timer = setInterval(() => {
        setCounter((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isValid]);

  useEffect(() => {
    if (counter === 0 && isValid) {
      window.location.href = "/mainClient"; // Redirige a la página principal
    }
  }, [counter, isValid]);

  if (!isValid) return null; // No mostrar nada hasta validar el token

  return (
    <div className={styles.retornoContainer}>
      <div className={styles.confirmationMessage}>
        <div className={styles.checkmark}>✔</div>
        <h2 className={styles.messageTitle}>¡Pago completado!</h2>
        <p className={styles.messageText}>
          Su pago fue procesado exitosamente y ha sido registrado en nuestro sistema.
        </p>
        <p className={styles.countdown}>Redireccionando en {counter} segundos...</p>
      </div>
      <div className={styles.return}>
        <button className={styles.buttonReturn} onClick={() => window.location.href = "/mainClient"}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default RetornoPage;
