import React, { useState } from 'react';
import styles from '../RequestsUsers/AcceptRequestModal.module.css';


const AcceptRequestModal = ({ isOpen, onClose, onAccept, solicitud }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    account: '',
    type: '',
    email: solicitud.email,
    requestId: solicitud.ID_request,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onAccept(formData);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Aceptar Solicitud: {solicitud.nombre}</h3>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Account:
            <select
              name="account"
              value={formData.account}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="Uach">Uach</option>
              <option value="Externo">Externo</option>
              <option value="otra">otra</option>
            </select>
          </label>

          <label>
            Usuario:
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="Pagado">Pagado</option>
              <option value="Uach">Uach</option>
            </select>
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

export default AcceptRequestModal;
