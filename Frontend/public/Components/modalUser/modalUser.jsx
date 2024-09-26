import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./modalUser.module.css";

const ModalUser = ( {closeModal} ) => {
  return (
    <div className={styles.containerModal}>
      <h1 >Eliminar Usuario</h1>
      <div className={styles.motiveSection}>
        <label htmlFor="motiveText">Ingrese motivo de eliminación: </label>
        <input type="text" id="motiveText"/>
      </div>
      <div className={styles.buttonSection}>
        <button onClick={ () => {closeModal(false)} }>Cancelar</button>
        <button>Aceptar</button>
      </div>
    </div>
  );
}

export default ModalUser;