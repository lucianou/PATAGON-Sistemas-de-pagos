import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const useForm = (initialData, onValidate) => {
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

    fetch('http://localhost:3002/api/command/userLog', {
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
        }
        setServerMessage(data.message);
        navigate('/dashboard');
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