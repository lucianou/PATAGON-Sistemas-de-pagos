import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./modalUser.module.css";

const ModalUser = ({ closeModal, motivo }) => {
  const [motive, setMotive] = useState("");

  const handleAccept = () => {
    if (motive.trim() !== "") {
      closeModal(motive); // Pasar el motivo al cerrar el modal
    } else {
      alert("Por favor, ingrese un motivo.");
    }
  };
  
  return (
    <div className={styles.containerModal}>
      <div className={`${styles.modal} ${motivo ? styles.inactive : '' }`}>
        <h1>Eliminar Usuario</h1>
        <div className={styles.motiveSection}>
          <input
            type="text"
            id="motiveText"
            value={motive}
            onChange={(e) => setMotive(e.target.value)}
          />
          <label htmlFor="motiveText">Ingrese motivo de eliminación:</label>
        </div>
        <div className={styles.buttonSection}>
          <button onClick={() => closeModal(false)}>
            <span>Cancelar</span>
          </button>
          <button onClick={handleAccept}>
            <span>Aceptar</span>
          </button>
        </div>
      </div>

      <div className={`${styles.modal} ${!motivo ? styles.inactive : '' }`}>
        <h1>Motivo de Eliminación</h1>

        <p>{motivo}</p>

        <button onClick={() => closeModal(false)}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalUser;