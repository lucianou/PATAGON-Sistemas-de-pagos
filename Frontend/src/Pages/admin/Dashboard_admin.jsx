import React, { useState } from 'react';
import MenuDashboard from '../../../public/Components/menuDashboard/menuDashboard.jsx';
import styles1 from '../../styles/DashboardGeneral.module.css'; // Para Menu
import styles from '../../styles/DashboardAdmin.module.css';
import Notification_dashboard from '../../../public/Components/notificaciones/notificaciones_dashboard.jsx';
// import refreshAccessToken from '../../../public/Components/RefreshToken.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimes, faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/SoloLogo_Patagon.png';

const Dashboard = () => {
  const initialData = {
    nombre: "",
    email: "",
    password: "",
    rol: "Admin",
  };
  const [form, setForm] = useState(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY;
  const port = import.meta.env.VITE_PORT;
  const ipserver = import.meta.env.VITE_IP;
  // Función para generar una contraseña segura
  const generatePassword = (e) => {
    e.preventDefault();
    const length = Math.floor(Math.random() * (27 - 12 + 1)) + 12; // Genera una longitud aleatoria entre 12 y 27
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setForm({...form, password: password});
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log(form);  
    fetch(`http://${ipserver}:${port}/api/command/post-admins-role`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      method: 'POST',
      body: JSON.stringify(form),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        setErrors({ server: data.error });
      } else {
        console.log(data);
        setModal(false);
      }
    })
    .catch((error) => {
      console.error('Error:',error);
      setErrors({ server: 'Error en la solicitud: ' + error.message });
    });
  }

  const renderPermissions = () => {
    if (form.rol === "Admin") {
      return (
        <ul className={styles.descripcionRol}>
          <li>Ver, aceptar o rechazar solicitudes.</li>
          <li>Crear admins y ver ganancias.</li>
          <li>Ver usuario o eliminarlo.</li>
        </ul>
      );
    } else if (form.rol === "Co-admin") {
      return (
        <ul className={styles.descripcionRol}>
          <li>Ver, aceptar o rechazar solicitudes.</li>
          <li>Ver usuario pero no eliminarlo.</li>
          <li>Ver ganancias.</li>
        </ul>
      );
    } else if (form.rol === "Revisor") {
      return (
        <ul className={styles.descripcionRol}>
          <li>Solo ver solicitudes.</li>
        </ul>
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

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
            <form onSubmit={handleSubmit}>
              <span onClick={ () => {setModal(false)}}>
                <FontAwesomeIcon icon={faTimes} className={styles.close}/>
              </span>
              <h2>Crear administrador</h2>
              <div className={styles.inputGroup}>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" value={form.nombre} name="nombre" autoComplete='off' placeholder='Co-admin...' onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" value={form.email} name="email" autoComplete='off' placeholder='example@gmail.com' onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.passInput}>
                  <label htmlFor="password">Contraseña</label>
                  <input type={!showPassword ? "password" : "text"} value={form.password} autoComplete='off' name="password" placeholder='Escriba una contraseña segura' onChange={handleChange} required />
                  <button className={styles.showPass} onClick={ () => {setShowPassword(!showPassword)}}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className={styles.eyeIcon}/>
                  </button>
                </div>
                <button className={styles.randomPassword} onClick={generatePassword}>
                  <span>Random Password</span>
                </button>
              </div>
              <div className={styles.rolGroup}>
                <select className={styles.optionsAdmin} value={form.rol}  name="rol" onChange={handleChange}>
                  <option value="Admin">Admin</option>
                  <option value="Co-admin">Co-admin</option>
                  <option value="Revisor">Revisor</option>
                </select>
                  {renderPermissions()}
              </div>
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
