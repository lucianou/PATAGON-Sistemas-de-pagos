import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import styles from '../../styles/client/Profile.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import useDashBoardProfile from '../../Hooks/useDashBoardProfile';

const Profile = () => {
  const { data, loading, error } = useDashBoardProfile();
  const maxHours = 100;
  const hoursRemaining = data?.time_remaining || 0;
  const percentage = Math.min((hoursRemaining / maxHours) * 100, 100);
  
  const navigate = useNavigate(); // Define navigate para redireccionar

  const handleBuyBag = () => {
    navigate('/mainClient'); // Redirecciona a la página de cliente
  };

  return (
    <>
      <NavBar />
      <div className={styles.ProfileContainer}>
        <header className={styles.ProfileHeader}>
          <div className={styles.ProfileImage}>
            <img src="../../src/assets/SoloLogo_Patagon.png" alt="Logo Patagon" />
          </div>
          <div className={styles.ProfileName}>
            <h1>{data?.username}</h1>
            <div className={styles.ContactIcons}>
              <span className={styles.Icon}>✉️ {data?.email}</span>
            </div>
          </div>
        </header>
        
        <section className={styles.ProfileDetails}>
          <div className={styles.Section}>
            <h2>Sobre mí</h2>
            <p>Nombre: {data?.name}</p>
            <p>Username: {data?.username}</p>
          </div>
          
          <div className={styles.Section}>
            <h2>Institución</h2>
            <p>{data?.institution}</p>
          </div>

          <div className={styles.Section}>
            <h2>Información de cuenta</h2>
            <p>Identificador: {data?.id}</p>
            <p>Rol: {data?.licenses}</p>
            <p>Tipo: {data?.type}</p>
          </div>

          <div className={styles.Section}>
            <h2>Tiempo Restante</h2>
            <p>Tiempo: {hoursRemaining}/100 hours</p>
            <div className={styles.Battery}>
              <div
                className={styles.BatteryLevel}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: percentage > 50 ? '#4caf50' : percentage > 20 ? '#ffeb3b' : '#f44336',
                }}
              />
            </div>
            <div className={styles.ButtonContainer}>
              <button className={styles.Button} onClick={handleBuyBag}>
                Comprar Bolsa
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
