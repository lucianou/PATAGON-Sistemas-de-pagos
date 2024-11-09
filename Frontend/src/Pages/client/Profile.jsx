import React from 'react';
import styles from '../../styles/client/Profile.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";

const Profile = ({ }) => {
  return (
    <>
      <NavBar />
      <div className={styles.ProfileContainer}>
        <h1 style={{ marginBottom: '20px', fontSize: '32px' }}>Mi perfil</h1>
        <div className={styles.ProfileCard}>
          <div className={styles.ProfileImage}></div>
          <div className={styles.UserInfo}>
            <div className={styles.UserName}>Nombre de usuario</div>
            <div className={styles.UserAntiquity}>Antigüedad</div>
          </div>
          <div className={styles.ServiceInfo}>Servicio contratado</div>
        </div>
      </div>
    </>
  );
};

export default Profile;