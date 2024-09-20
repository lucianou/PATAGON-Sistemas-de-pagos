// Pages/Dashboard_user.jsx
import React , { useState }from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import styles1 from '../styles/DashboardGeneral.module.css';
import styles from '../styles/DashboardUser.module.css';

const Dashboard_user = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen}/>
      
      <main className={`${styles1.content} ${isOpen ? styles1.open : ''} }` } id={styles.content} >
        <div className={styles1.header}>
          <h1>Dashboard User</h1>
          <p>Welcome to the user dashboard!</p>
        </div>

      </main>
    </div>
  );
};

export default Dashboard_user;
