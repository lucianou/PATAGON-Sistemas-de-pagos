// Pages/Dashboard_user.jsx
import React from 'react';
import ParticlesComponent from '@components/Particles/ParticlesBG';
import styles from '@adminStyles/DashboardConfig.module.css';

const Dashboard_config = () => {
  return (
    <div>
      <h1>Dashboard configuracions</h1>
      <p>Welcome to the user dashboard!</p>
      <h1>a</h1>
      <div className={styles.a}>hola</div>
      <ParticlesComponent id = "particles"></ParticlesComponent>
      <div className="h1">a</div>
    </div>
  );
};

export default Dashboard_config;
