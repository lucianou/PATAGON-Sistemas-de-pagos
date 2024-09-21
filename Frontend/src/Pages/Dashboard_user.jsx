// Pages/Dashboard_user.jsx
import React , { useState, useEffect }from 'react';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import styles1 from '../styles/DashboardGeneral.module.css';
import styles from '../styles/DashboardUser.module.css';
import ItemUser from '../../public/Components/itemUser/itemUser';

const Dashboard_user = () => {
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
      
      <main className={`${styles1.content} ${isOpen ? styles1.open : ''} }` } id={styles.content} >
        <div className={styles1.header}>
          <h1>Dashboard User</h1>
        </div>

        {/* Sección búsqueda */}
        <div className={styles.searchSection}>
          <div>
            <label htmlFor='search'>Busqueda: </label>
            <input type='text' id='search' placeholder='Ingrese nombre de usuario: ' value={searchText} onChange={handleSearchChange}/>
          </div>
          <button>Filtro</button>
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

            {filtredUsers.map((user, index) => {
              if(user.rol === 'Cliente' && user.fecha_ingreso){   
                const delay = `${index * 100}ms`; // Incrementar el delay por cada usuario
                return (
                  <ItemUser user={user} delay={delay} />
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
