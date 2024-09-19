import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { jwtDecode } from 'jwt-decode';
const useForm = (initialData) => {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(''); // Para almacenar el mensaje del servidor
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonString = JSON.stringify(form);
    console.log(jsonString); // {"username":"usuario","password":"contraseña"}

    fetch('http://localhost:3004/api/command/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: jsonString,
      
    }).then((response) => response.json())
    .then((data) => {
      if (data.error) {
        setErrors({ server: data.error });
      } else {
        if (data.token) {
          // Guardar el token en localStorage
          localStorage.setItem('token', data.token);
          const decodedToken = jwtDecode(data.token);
          console.log(decodedToken);
          if(decodedToken.rol === 'Administrador'){
            localStorage.setItem('rol', 'Administrador');
            localStorage.setItem('username', decodedToken.username);
            navigate('/dashboard');
          } else if (decodedToken.rol === 'Cliente'){
            localStorage.setItem('rol', 'Cliente');
            navigate('/userDashboard');
          }
        }
        setServerMessage(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:',error);
      setErrors({ server: 'Error en la solicitud: ' + error.message });
    });
    
  }

  return { form, errors, handleChange, handleSubmit };
}

export default useForm;