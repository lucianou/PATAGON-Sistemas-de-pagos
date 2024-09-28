import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { set } from "date-fns";

const useForm = (initialData, onValidate) => {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(""); // Para almacenar el mensaje del servidor
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado de carga

  const apiKey = import.meta.env.VITE_API_KEY;
  const port = import.meta.env.VITE_PORT;
  const ipserver = import.meta.env.VITE_IP;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const err = onValidate(form);

    if (err === null) {
      // Excluir repPass del objeto initialData
      const { repPass, ...dataWithoutRepPass } = form;

      // Convertir el objeto sin repPass a una cadena JSON
      const jsonString = JSON.stringify(dataWithoutRepPass);
      console.log(jsonString);

      fetch(`http://${ipserver}:${port}/api/command/register`, {
        headers: {
          "Content-Type": "application/json",
          'x-api-key': apiKey,
        },
        method: "POST",
        body: jsonString,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrors({ server: data.error });
            setLoading(false);
          } else {
            setServerMessage(data.message);
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrors({ server: "Error en la solicitud: " + error.message });
        });
    } else {
      setErrors(err);
      console.log(errors);
      setLoading(false);
    }
  };

  return { form, errors, loading, handleChange, handleSubmit };
};

export default useForm;