// src/Pages/Dashboard_user.jsx

import React from 'react';
import MenuDashboard from '../../../public/Components/menuDashboard/menuDashboard';
import styles1 from '../../styles/DashboardGeneral.module.css';
import styles from '../../styles/DashboardUser.module.css';
import ItemUser from '../../../public/Components/itemUser2/itemUser';
import ModalUser from '../../../public/Components/modalUser/modalUser';
import useDashboardUser from '../../Hooks/useDashboardUser';
import Notification_dashboard from '../../../public/Components/notificaciones/notificaciones_dashboard';
import logo from '../../assets/SoloLogo_Patagon.png';

const Dashboard_user = () => {
  const {
    filterState,
    isOpen,
    errors,
    filtredUsers,
    searchText,
    btnActive,
    showModal,
    selectedUser,
    key,
    loading, // Obtener el estado de carga
    setIsOpen,
    setShowModal,
    setSelectedUser,
    handleFilterChange,
    handleClickBtnUser,
    handleSearchChange,
    handleCloseModal
  } = useDashboardUser();

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />
      {/* <Notifications /> */}

      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`} id={styles.content}>

        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon}/>
            <h1>Dashboard User</h1>
          </div>
          <Notification_dashboard/>
        </div>

        {/* Sección búsqueda */}
        <div className={styles.searchSection}>
          <div className={styles.searchFill_container}>
            <input
              type='text'
              placeholder='Buscar usuario... '
              name='search'
              value={searchText}
              onChange={handleSearchChange}
              disabled={loading} // Deshabilitar el input mientras se carga
            />
            <div className={styles.contFill}>
              <label htmlFor="filter" className={styles.labelFill}>Filtrar por fecha:</label>
              <select className={`${styles.filter} ${!btnActive ? styles.off : '' }`} value={filterState} id="filter" onChange={handleFilterChange} disabled={loading}>
                <option value="reciente">Mas recientes</option>
                <option value="antiguo">Mas antiguos</option>
              </select>
            </div>
          </div>
          <div className={styles.sectionBtn}>
            <button className={`${!btnActive ? styles.btnOn : styles.btnOff} ${loading ? styles.btnOff : ''}`}
            onClick={handleClickBtnUser}>
              <span>Usuarios Activos</span>
            </button>
            <button className={`${btnActive ? styles.btnOn : styles.btnOff} ${loading ? styles.btnOff : ''}`}
            onClick={handleClickBtnUser}>
              <span>Usuarios Eliminados</span>
            </button>
          </div>

        </div>
        <section className={styles.userSection}>
          {errors.server && <p className={styles.errorMessage}>{errors.server}</p>}

          <div className={styles.itemSection} key={key}>
            {/* Mostrar usuarios filtrados */}
            {filtredUsers.map((user, index) => {
                const delay = `${index * 100}ms`; // Incrementar el delay por cada usuario
                return (
                  <ItemUser user={user} key={index} delay={delay} setShowModal={setShowModal} selectUser={setSelectedUser}/>
                );
              })
            }
          </div>
        </section>
      </main>
      {showModal && <ModalUser closeModal={ handleCloseModal } motivo={selectedUser.motivo ? selectedUser.motivo : null}/>}
    </div>
  );
};

export default Dashboard_user;