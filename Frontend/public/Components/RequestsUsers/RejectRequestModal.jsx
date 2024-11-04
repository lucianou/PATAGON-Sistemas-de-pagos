import React, { useState } from 'react';
import styles from '../RequestsUsers/AcceptRequestModal.module.css';

const RejectRequestModal = ({ isOpen, onClose, onReject, solicitud }) => {
  const [reason, setReason] = useState('');

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    onReject({ reason, requestId: solicitud.ID_request, nombre: solicitud.nombre, email: solicitud.email });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Rechazar Solicitud: {solicitud.nombre}</h3>
        <form>
          <label>
            Motivo del Rechazo:
            <textarea
              name="reason"
              value={reason}
              onChange={handleReasonChange}
              placeholder="Ingrese el motivo del rechazo..."
            />
          </label>
          
          <div className={styles.modalActions}>
            <button type="button" onClick={handleSubmit}>
              Enviar
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectRequestModal;
