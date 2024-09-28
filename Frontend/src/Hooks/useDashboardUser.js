// src/hooks/useDashboardUser.js

import { useState, useEffect } from 'react';
import { calcularDiasDesdeIngreso } from '../../public/Utils/dateUtils';
import refreshAccessToken from '../../public/Components/RefreshToken'
// src/hooks/useDashboardUser.js

const useDashboardUser = () => {
  const [filterState, setFilterState] = useState("all"); 
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]); // Usuarios activos
  const [deletedUsers, setDeletedUsers] = useState([]); // Usuarios eliminados
  const [errors, setErrors] = useState({});
  const [filtredUsers, setFiltredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [btnActive, setBtnActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [key, setKey] = useState(0); // Clave única para el contenedor de usuarios
  const [loading, setLoading] = useState(true); // Estado de carga

  const port = import.meta.env.VITE_PORT;
  const ipserver = import.meta.env.VITE_IP;

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token almacenado
    fetch(`http://${ipserver}:${port}/api/command/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Envía el token en los headers
      }
    })
      .then((response) =>{
        //si recibe el token invalido
        if(response.status == 401){
          return refreshAccessToken().then(newToken => {
            return fetch(`http://${ipserver}:${port}/api/command/users`,{
              method: 'GET',
              headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newToken}` 
              }
            });
          });
        }
        return response;
      })
      .then((response) => response.json())
      .then(data => {
        if (data.error) {
          setErrors({ server: data.error });
        } else {
          // Actualizar usuarios activos y eliminados
          setUsers(data.users);
          setDeletedUsers(data.deletedUsers);
          setFiltredUsers(data.users); // Inicialmente mostrar todos los usuarios activos
        }
        setLoading(false); // Finalizar la carga
      })
      .catch(error => {
        setErrors({ server: 'Error en la solicitud: ' + error.message });
        setLoading(false); // Finalizar la carga incluso si hay un error
      });
  }, [ipserver, port]);

  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
    setKey(prevKey => prevKey + 1); // Cambiar la clave única para forzar la actualización de los usuarios
  };

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

  const handleClickBtnUser = () => {
    setBtnActive(!btnActive);
    setFiltredUsers(btnActive ? deletedUsers : users );
    setSearchText('');
    setFilterState('all');
    setKey(prevKey => prevKey + 1); // Cambiar la clave única para forzar la actualización de los usuarios
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

  const handleCloseModal = (motive) => {
    if (motive) {
      fetch(`http://${ipserver}:${port}/api/command/deleted-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ username: selectedUser.username, email: selectedUser.email ,motivo: motive })
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud');
        }
      })
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  return {
    filterState,
    isOpen,
    errors,
    filtredUsers,
    searchText,
    btnActive,
    showModal,
    selectedUser,
    key,
    loading, // Retornar el estado de carga
    setIsOpen,
    setShowModal,
    setSelectedUser,
    handleFilterChange,
    filterUsersByState,
    handleClickBtnUser,
    handleSearchChange,
    handleCloseModal
  };
};

export default useDashboardUser;