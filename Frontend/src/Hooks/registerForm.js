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
    const err = onValidate(form);
    
    console.log("perro");
    if(err == null){
      console.log("gato");
    } else {
      console.log("gato");

      setErrors(err);
      return;
    }

    // Excluir repPass del objeto initialData
    const { repPass, ...dataWithoutRepPass } = form;

    // Convertir el objeto sin repPass a una cadena JSON
    const jsonString = JSON.stringify(dataWithoutRepPass);
    console.log(jsonString); 

    fetch('http://localhost:3006/api/command/userReg', {
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
        setServerMessage(data.message);
        navigate('/dashboard');
      }
    })
    .catch((error) => {
      console.error('Error:',error);
      setErrors({ server: 'Error en la solicitud: ' + error.message });
    });
    
  }

  return [form, errors, handleChange, handleSubmit];
}

export default useForm;