import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import styles from "./itemUser.module.css";
import { format } from 'date-fns';
import { calcularDiasDesdeIngreso } from "../../Utils/dateUtils";

const ItemUser = ({ user, delay, setShowModal, selectUser}) => {
  const [open, setOpen] = React.useState(false);
  let dead = false;
  let formattedDate = '';
  console.log(user);
  if (!user.motivo) {
    if (user.fecha_ingreso !== null) {
      // Calcular días desde el ingreso del usuario
      formattedDate = format(user.fecha_ingreso, 'dd-MM-yyyy');
    }
  } else {
    dead = true;  
  }
  return (
    <div className={`${styles.item}`} style={{ animationDelay: delay }} onClick={ () => {setOpen(!open)}}>
      <div className={styles.itemBackground} ></div>
      {/* <div className={styles.divEllipsisV}>
        <FontAwesomeIcon icon={faEllipsisV} className={styles.icon} />
      </div> */}
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