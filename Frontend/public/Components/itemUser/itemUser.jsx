import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck, faTimes, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styles from "./itemUser.module.css";

const ItemUser = ({ user, delay }) => {
  // Función para calcular la diferencia en días entre la fecha actual y la fecha de ingreso del usuario
  const calcularDiasDesdeIngreso = (fechaIngreso) => {
    
    const fechaActual = new Date();
    const fechaUsuario = new Date(fechaIngreso);
    const difMilisegundos = fechaActual - fechaUsuario;
    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    return Math.floor(difMilisegundos / milisegundosPorDia);
  };

  // Función para determinar el estado y el ícono según los días
  const obtenerEstadoUsuario = (dias, styles) => {
    if (dias < 60) {
      return { stateUser: styles.activo, icon: faCheck };
    } else if (dias >= 60 && dias < 120) {
      return { stateUser: styles.inactivo, icon: faExclamationTriangle };
    } else {
      return { stateUser: styles.bloqueado, icon: faTimes };
    }
  };

  // Calcular días desde el ingreso del usuario
  const dias = calcularDiasDesdeIngreso(user.fecha_ingreso);

  // Obtener el estado del usuario y el ícono correspondiente
  const { stateUser, icon } = obtenerEstadoUsuario(dias, styles);
  
  return (
    <div className={styles.item} style={{ animationDelay: delay }}>
      <div className={styles.itemUser}>
        <FontAwesomeIcon icon={faUser} className={styles.faIcon}/>
        <span>{user.username}</span>
      </div>

      <div className={styles.itemTime}>
        <div>
          <span>Utilizado:</span>
          <span>00:00:00:00</span>
        </div>
        <div>
          <span>Restante:</span>
          <span>00:00:00:00</span>
        </div>
      </div>

      <div className={styles.itemStatus} id={stateUser}>
        <FontAwesomeIcon icon={icon} className={styles.statusIcon}/>
          <span>{dias} days</span>
      </div>
    </div>
  );
};

export default ItemUser;