import React from 'react';
import styles from '../../styles/client/Profile.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import useDashBoardProfile from '../../Hooks/useDashBoardProfile';

const Profile = () => {
  const { data, loading, error } = useDashBoardProfile();

  const maxHours = 100;
  const hoursRemaining = data?.time_remaining || 0;
  const percentage = Math.min((hoursRemaining / maxHours) * 100, 100);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Para la vista previa
      // Aquí podrías subir el archivo al servidor
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    try {
      const response = await fetch('/api/upload-profile-image', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const { imageUrl } = await response.json();
        // Actualiza la URL de la imagen en el perfil si es necesario
        console.log('Imagen subida:', imageUrl);
      }
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.ProfileContainer}>
        <h1 style={{ marginBottom: '20px', fontSize: '32px' }}>Mi perfil</h1>
        <section className={styles.ProfileCard}>
          <div className={styles.LeftSection}>
            <div className={styles.ProfileImage}></div>
            <div className={styles.UserInfo}>
              <div className={styles.UserName}>{data?.username}</div>
            </div>
          </div>
          <div className={styles.RightSection}>
            <div className={styles.BatteryContainer}>
              <div className={styles.BatteryLabel}>Horas restantes:</div>
              <div className={styles.Battery}>
                <div
                  className={styles.BatteryLevel}
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: percentage > 50 ? '#4caf50' : percentage > 20 ? '#ffeb3b' : '#f44336',
                  }}
                />
              </div>
              <span className={styles.BatteryPercentage}>{hoursRemaining}/100 horas</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
