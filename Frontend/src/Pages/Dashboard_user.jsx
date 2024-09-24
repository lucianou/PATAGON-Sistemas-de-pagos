import React, { useState, useEffect } from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import styles1 from '../styles/DashboardGeneral.module.css';
import styles from '../styles/DashboardUser.module.css';
import ItemUser from '../../public/Components/itemUser2/itemUser';
import Notifications from './Notifications';

const Dashboard_user = () => {
  const [filterState, setFilterState] = useState("all"); 
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]); // Usuarios activos
  const [deletedUsers, setDeletedUsers] = useState([]); // Usuarios eliminados
  const [errors, setErrors] = useState({});
  const [filtredUsers, setFiltredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [btnActive, setBtnActive] = useState(true);
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    fetch(`http://localhost:${port}/api/command/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET'
    })
      .then((response) => response.json())
      .then(data => {
        if (data.error) {
          setErrors({ server: data.error });
        } else {
          // Actualizar usuarios activos y eliminados
          setUsers(data.users);
          setDeletedUsers(data.deletedUsers);
          console.log(data.deletedUsers);
          setFiltredUsers(data.users); // Inicialmente mostrar todos los usuarios activos
          console.log(data.users);
        }
      })
      .catch(error => {
        console.log('Error:', error);
        setErrors({ server: 'Error en la solicitud: ' + error.message });
      });

  }, []);

  // Función para manejar el cambio del filtro
  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
  };

  // Función para filtrar usuarios según el estado seleccionado
  const filterUsersByState = (user) => {
    const dias = user.fecha_ingreso !== null 
      ? calcularDiasDesdeIngreso(user.fecha_ingreso)
      : -1;

    if (filterState === "all") return true; // No filtrar si la opción es "all"
    
    if (filterState === "pendiente" && dias === -1) return true;
    if (filterState === "activo" && dias >= 0 && dias < 60) return true;
    if (filterState === "inactivo" && dias >= 60 && dias < 120) return true;
    if (filterState === "bloqueado" && dias >= 120) return true;

    return false;
  };
  
  // Calcular días desde el ingreso del usuario
  const calcularDiasDesdeIngreso = (fechaIngreso) => {
    const fechaActual = new Date();
    const fechaUsuario = new Date(fechaIngreso);
    const difMilisegundos = fechaActual - fechaUsuario;
    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    return Math.floor(difMilisegundos / milisegundosPorDia);
  };

  const handleClickBtnUser = () => {
    setBtnActive(!btnActive);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    if (value === '') {
      setFiltredUsers(btnActive ? users : deletedUsers); 
    } else {
      const filtered = (btnActive ? users : deletedUsers).filter((user) => user.username.toLowerCase().startsWith(value));
      setFiltredUsers(filtered);
    }
  };

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />
      <Notifications />

      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`} id={styles.content}>
        <div className={styles1.header}>
          <h1>Dashboard User</h1>
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
            />
            <div className={styles.contFill}>
              <label htmlFor="filter" className={styles.labelFill}>Filtrar por estado:</label>
              <select className={styles.filter} value={filterState} onChange={handleFilterChange}>
                <option value="all">Todos</option>
                <option value="pendiente">Pendientes</option>
                <option value="activo">Activos</option>
                <option value="inactivo">Inactivos</option>
                <option value="bloqueado">Bloqueados</option>
              </select>
            </div>
          </div>
          <div className={styles.sectionBtn}>
            <button className={`${!btnActive ? styles.btnOn : styles.btnOff}`}
            onClick={handleClickBtnUser}>
              <span>Usuarios Activos</span>
            </button>
            <button className={`${btnActive ? styles.btnOn : styles.btnOff}`}
            onClick={handleClickBtnUser}>
              <span>Usuarios Eliminados</span>
            </button>
          </div>

        </div>
        <section className={styles.userSection}>

          {errors.server && <p className={styles.errorMessage}>{errors.server}</p>}

          <div className={styles.itemSection}>
            {/* Mostrar usuarios activos filtrados */}
            {btnActive ? (
              filtredUsers.filter(filterUsersByState).map((user, index) => {
                const delay = `${index * 100}ms`; // Incrementar el delay por cada usuario
                return (
                  <ItemUser user={user} key={index} delay={delay} />
                );
              })
            ) : (
              deletedUsers.map((user, index) => {
                const delay = `${index * 100}ms`; // Incrementar el delay por cada usuario
                return (
                  <ItemUser user={user} key={index} delay={delay} />
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard_user;