// Pages/Dashboard_user.jsx
import React , { useState, useEffect }from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import styles1 from '../styles/DashboardGeneral.module.css';
import styles from '../styles/DashboardUser.module.css';
import ItemUser from '../../public/Components/itemUser/itemUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import Notifications from './Notifications';

const Dashboard_user = () => {
  const [filterState, setFilterState] = useState("all"); // Estado para el filtro
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [filtredUsers, setFiltredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('http://localhost:3004/api/command/users', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET'
    })
      .then((response) => response.json())
      .then(data => {
        if(data.error){
          setErrors({ server: data.error });
        } else {
          setUsers(data);
          setFiltredUsers(data);
        }
      })
      .catch(error => {
        console.log('Error:',error);
        setErrors({ server: 'Error en la soliditud: ' + error.message });
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

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    // Filtrar usuarios en tiempo real
    if (value === '') {
      setFiltredUsers(users); // Si el campo está vacío, mostrar todos los usuarios
    } else {
      const filtered = users.filter((user) => user.username.toLowerCase().startsWith(value));
      setFiltredUsers(filtered);
    }
  };

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen}/>
      <Notifications/>
      
      <main className={`${styles1.content} ${isOpen ? styles1.open : ''} }` } id={styles.content} >
        <div className={styles1.header}>
          <h1>Dashboard User</h1>
        </div>

  
        {/* Sección búsqueda */}
        <div className={styles.searchSection}>
          <div>
            <input type='text' placeholder='Buscar usuario... ' name='search' value={searchText} onChange={handleSearchChange}/>
          </div>
          <label htmlFor="filter" className={styles.labelFill}>Filtrar por estado:</label>
          <select className={styles.filter} value={filterState} onChange={handleFilterChange}>
            <option value="all">Todos</option>
            <option value="pendiente">Pendientes</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
            <option value="bloqueado">Bloqueados</option>
          </select>
        </div>

        <section className={styles.userSection}>
          {/* Sección titulos */}
          <div className={styles.titleSections}>
            <span>Usuario   </span>
            <span>Tiempo</span>
            <span>Activo</span>
          </div>

            {errors.server && <p className={styles.errorMessage}>{errors.server}</p>}
          <div className={styles.itemSection}>
            {/* Contenido Item */}

            {filtredUsers.filter(filterUsersByState).map((user, index) => {
              if(user.rol === 'Cliente'){   
                const delay = `${index * 100}ms`; // Incrementar el delay por cada usuario
                return (
                  <ItemUser user={user} key={index} delay={delay} />
                );
              }
            })}            
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard_user;
