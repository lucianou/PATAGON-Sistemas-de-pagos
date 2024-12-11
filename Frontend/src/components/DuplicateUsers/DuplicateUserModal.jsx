import React from 'react';
import styles from './DuplicateUserModal.module.css';

const DuplicateUserModal = ({ isOpen, onClose, email, onNavigate }) => {
  if (!isOpen) return null; // Si no está abierto, retorna null
  return (
      <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
              <h2>Usuario ya registrado</h2>
              <p>
                  El usuario con el correo <strong>{email}</strong> ya existe. 
                  Por favor, elimina el usuario antes de aceptar.
              </p>
              <div className={styles.buttons}>
                  <button onClick={onNavigate} className={styles.navigateButton}>
                      Ir a Usuarios
                  </button>
                  <button onClick={onClose} className={styles.closeButton}>
                      Cerrar
                  </button>
              </div>
          </div>
      </div>
  );
};


export default DuplicateUserModal;
