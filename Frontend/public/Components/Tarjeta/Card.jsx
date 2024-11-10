import React from "react";
import styles from "./Card.module.css"; // Importa tu archivo de estilos como módulo
import { useNavigate } from "react-router-dom";

const Card = ({ nombre, tiempo, detalles, precio, ram, delay, ID }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/dashboard-compra/${ID}`); 
  };
  

  return (
    <div className={styles.bolsaCard} style={{ animationDelay: delay }}>
      <div className={styles.bolsaLeft}>
        <p className={styles.nombre}>{nombre}</p>
        <ul className={styles.bolsaDetails}>
          {detalles.map((detalle, i) => (
            <li key={i}>{detalle}</li>
          ))}
          <br />
          <li>{ram}</li>
        </ul>
      </div>

      <div className={styles.bolsaRight}>
        <div className={styles.headerRight}>
          <p className={styles.tiempo}>{tiempo} horas</p>
          <p className={styles.price}>${precio} USD</p>
        </div>
        <button className={styles.botonCompra} onClick={handleBuyClick}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Card;
