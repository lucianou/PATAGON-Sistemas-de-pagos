import React from 'react';
import styles from './Card.module.css'; // Importa tu archivo de estilos como módulo

const Card = ({ nombre, time, detalles, precio, onBuyClick }) => {
  return (
    <div className={styles.bolsaCard}>
      <div className={styles.bolsaHeader}>
        <p className={styles.nombre}>{nombre}</p>
        <div className={styles.headerRight}>
          <p className={styles.time}>{time}</p>
          <p className={styles.price}>{precio}</p>
        </div>
      </div>
      <ul className={styles.bolsaDetails}>
        {detalles.map((detalle, i) => (
          <li key={i}>{detalle}</li>
        ))}
      </ul>
      <div className={styles.footer}>
        <div className={styles.boton}>
          <button className={styles.botonCompra} onClick={onBuyClick}>¡Lo quiero!</button>
        </div>
      </div>
    </div>
  );
};

export default Card;