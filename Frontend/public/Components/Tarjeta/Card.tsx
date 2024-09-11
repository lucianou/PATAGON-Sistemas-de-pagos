import React from 'react';
import './Card.css'; // Asegúrate de incluir los estilos específicos para el componente

const Card = ({ nombre, time, detalles, precio, onBuyClick }) => {
  return (
    <div className="bolsa-card">
      <div className="bolsa-header">
        <p className="nombre">{nombre}</p>
        <div className="header-right">
          <p className="time">{time}</p>
          <p className="price">{precio}</p>
        </div>
      </div>
      <ul className="bolsa-details">
        {detalles.map((detalle, i) => (
          <li key={i}>{detalle}</li>
        ))}
      </ul>
      <div className="footer">
        <div className="boton">
          <button className="Boton_Compra" onClick={onBuyClick}>¡Lo quiero!</button>
        </div>
    </div>
  </div>
  );
};

export default Card;