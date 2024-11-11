// src/hooks/useDashboardUser.js

import { useState, useEffect } from 'react';
import { calcularDiasDesdeIngreso } from '../../public/Utils/dateUtils';
import refreshAccessToken from '../../public/Components/RefreshToken'
// src/hooks/useDashboardUser.js

const useDashboardUser = () => {
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
        if(response.status == 403){
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
          console.log(data);
          setUsers(data.users);
          setDeletedUsers(data.deletedUsers);
        }
        setLoading(false); // Finalizar la carga
      })
      .catch(error => {
        setErrors({ server: 'Error en la solicitud: ' + error.message });
        setLoading(false); // Finalizar la carga incluso si hay un error
      });
  }, [ipserver, port]);

  const handleClickBtnUser = () => {
    setBtnActive(!btnActive);
    setFiltredUsers(btnActive ? deletedUsers : users );
    setSearchText('');
    setKey(prevKey => prevKey + 1); // Cambiar la clave única para forzar la actualización de los usuarios
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    if (value === '') {
      setFiltredUsers(btnActive ? users : deletedUsers); 
    } else {
      let filtered;
      if (btnActive) {
        filtered = users.filter((user) => user.nombre.toLowerCase().startsWith(value));
      } else {
        filtered = deletedUsers.filter((user) => user.username.toLowerCase().startsWith(value));
      }
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
          setUsers((prevUsers) => prevUsers.filter((user) => user.username !== selectedUser.username)); // Eliminar usuario de la lista de usuarios activos
          setDeletedUsers((prevDeletedUsers) => [...prevDeletedUsers, {username: selectedUser.username, email: selectedUser.email, motivo: motive}]); // Agregar usuario a la lista de usuarios eliminados
          return response.json();
        } else {
          setErrors({ server: 'Error en la solicitud: ' + response.statusText });
        }
      })
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  return {
    isOpen,
    errors,
    users,
    deletedUsers,
    searchText,
    btnActive,
    showModal,
    selectedUser,
    key,
    loading, // Retornar el estado de carga
    setIsOpen,
    setShowModal,
    setSelectedUser,
    handleClickBtnUser,
    handleSearchChange,
    handleCloseModal
  };
};

export default useDashboardUser;