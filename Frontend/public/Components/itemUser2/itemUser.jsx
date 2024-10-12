import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSkull } from "@fortawesome/free-solid-svg-icons";
import styles from "./itemUser.module.css";
import { format } from 'date-fns';
import { calcularDiasDesdeIngreso, obtenerEstadoUsuario } from "../../Utils/dateUtils";

const ItemUser = ({ user, delay, setShowModal, selectUser}) => {
  const [open, setOpen] = React.useState(false);
  let dias = '-';
  let dead = false;
  let stateUser, icon;
  let formattedDate = '';
  console.log(user);
  if (!user.motivo) {
    if (user.fecha_ingreso !== null) {
      // Calcular días desde el ingreso del usuario
      dias = calcularDiasDesdeIngreso(user.fecha_ingreso);
      formattedDate = format(user.fecha_ingreso, 'dd-MM-yyyy');
    }
    // Obtener el estado del usuario y el ícono correspondiente
    ({ stateUser, icon } = obtenerEstadoUsuario(dias, styles));
  } else {
    dead = true;
    dias = -1;
    stateUser = styles.muerto;
    icon = faSkull;
  }
  return (
    <div className={`${styles.item}`} style={{ animationDelay: delay }} onClick={ () => {setOpen(!open)}}>
      <div className={styles.itemBackground} ></div>
      <div className={`${styles.divUsername} ${open ? styles.open : ''}`} onClick={ () => {setOpen(!open)}}>
        <span>{dead ? user.username : user.nombre}</span>
      </div>
      <div className={styles.infoDiv}>
        <span>Email:</span>
        <span>{user.email}</span>
        {!dead && <span>Ultimo registro:</span>}
        {!dead && <span>{formattedDate ? formattedDate : '-'}</span>}
        <button className={`${styles.button}`} onClick={() => { setShowModal(true); selectUser(user) }}> {!dead ? "Eliminar usuario" : "Ver Motivo"} </button>
      </div>
      {/* <a className={styles.hoverText} onClick={() => { setShowModal(true); selectUser(user) }}>{ dead ? "VER MOTIVO" : "ELIMINAR USUARIO"}</a> */}
    </div>
  );
};

export default ItemUser;