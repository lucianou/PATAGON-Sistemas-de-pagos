import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck, faTimes, faExclamationTriangle, faSkull, faQuestion } from "@fortawesome/free-solid-svg-icons";
import styles from "./itemUser.module.css";
import { format } from 'date-fns';

const ItemUser = ({ user, delay, setShowModal, selectUser}) => {
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
    if (dias === '-') {
      return { stateUser: styles.pendiente, icon: faQuestion };
    } else if (dias >= 0 && dias < 60) {
      return { stateUser: styles.activo, icon: faCheck };
    } else if (dias >= 60 && dias < 120) {
      return { stateUser: styles.inactivo, icon: faExclamationTriangle };
    } else {
      return { stateUser: styles.bloqueado, icon: faTimes };
    }
  };

  let dias = '-';
  let dead = false;
  let stateUser, icon;
  let formattedDate = '';

  if (!user.motivo) {
    if (user.fecha_ingreso !== null) {
      // Calcular días desde el ingreso del usuario
      dias = calcularDiasDesdeIngreso(user.fecha_ingreso);
    }
    formattedDate = format(user.fecha_ingreso, 'dd-MM-yyyy');
    // Obtener el estado del usuario y el ícono correspondiente
    ({ stateUser, icon } = obtenerEstadoUsuario(dias, styles));
  } else {
    dead = true;
    dias = -1;
    stateUser = styles.muerto;
    icon = faSkull;
  }
  return (
    <div className={`${styles.item} ${stateUser}`} style={{ animationDelay: delay }}>
      <div className={styles.itemBackground} ></div>
      <div className={`${styles.divUsername} ${stateUser}`} >
        <span>{user.username}</span>
      </div>
      <div className={styles.itemUser}>
        <FontAwesomeIcon icon={faUser} className={styles.faIcon} />
      </div>
      <div className={styles.infoDiv}>
        <span>Email:</span>
        <span>{user.email}</span>
        {!dead && <span>Fecha Ingreso:</span>}
        {!dead && <span>{formattedDate}</span>}
      </div>
      <div className={`${styles.itemStatus} ${stateUser}`}>
        <FontAwesomeIcon icon={icon} className={styles.statusIcon} />
      </div>
      <a className={styles.hoverText} onClick={() => { setShowModal(true); selectUser(user) }}>{ dead ? "VER MOTIVO" : "ELIMINAR USUARIO"}</a>
    </div>
  );
};

export default ItemUser;