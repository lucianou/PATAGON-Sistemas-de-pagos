import React, { useState, useEffect } from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import Card from '../../public/Components/Tarjeta/Card.jsx';
import styles1 from '../styles/DashboardGeneral.module.css'; // Para Menu
import styles from '../styles/DashboardAdmin.module.css';
import Notification_dashboard from '../../public/Components/notificaciones/notificaciones_dashboard.jsx';
import refreshAccessToken from '../../public/Components/RefreshToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/SoloLogo_Patagon.png';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña generada
  const [rol, setRol] = useState('');
  // Función para generar una contraseña segura
  const generatePassword = () => {
    const length = Math.floor(Math.random() * (27 - 12 + 1)) + 12; // Genera una longitud aleatoria entre 12 y 27
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(password);
  };

  const handleSubmit = async (e) => { 
    
    e.preventDefault();
  }
  
  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />

      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon}/>
            <h1>Dashboard Admin</h1>
          </div>
          <Notification_dashboard />
        </div>
        <button className={styles.btnCrear} onClick={ () => {setModal(true)}}>
          <FontAwesomeIcon icon={faUserPlus} className={styles.iconUser}/>
          <span>Crear administrador</span>
        </button>
        
      </main>
        <div className={styles.modal} style={{display: modal ? 'block' : 'none'}}>
          <div className={styles.modalContent}>
            <span onClick={ () => {setModal(false)}}>
              <FontAwesomeIcon icon={faTimes} className={styles.close}/>
            </span>
            <h2>Crear administrador</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" placeholder='Co-admin...' required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder='example@gmail.com' required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" value={password} name="password" placeholder='Escriba una contraseña segura' required />
                <button className={styles.randomPassword} onClick={generatePassword}>
                  <span>Random Password</span>
                </button>
              </div>
              <select className={styles.optionsAdmin} value={rol}>
                <option value="admin">Admin</option>
                <option value="co-admin">Co-admin</option>
                <option value="revisor">Revisor</option>
              </select>
              {/* <div className={styles.radioDiv}>
                <div>
                  <label htmlFor="admin">Admin</label>
                  <input type="radio" id="admin" name="role" value="admin" required />
                </div>
                <div>
                  <label htmlFor="co-admin">Co-admin</label>
                  <input type="radio" id="co-admin" name="role" value="co-admin" required />
                </div>
                <div>
                  <label htmlFor="revisor">Revisor</label>
                  <input type="radio" id="revisor" name="role" value="revisor" required />
                </div>
              </div> */}
              <div className={styles.buttons}>
                <button className={styles.btnModal} type="submit">
                  <span>Aceptar</span>
                </button>
                <button className={styles.btnModal}>
                  <span>Cancelar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
