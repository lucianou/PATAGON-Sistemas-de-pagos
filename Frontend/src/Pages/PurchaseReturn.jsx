import React, { useEffect, useState } from 'react';
import styles from '../styles/retorno.module.css';

const RetornoPage = () => {
  const [counter, setCounter] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      window.location.href = "/mainClient"; // Redirige a la página principal después de la cuenta regresiva
    }
  }, [counter]);

  return (
    <div className={styles.retornoContainer}>
      {/* <div className={styles.barra}></div> */}
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