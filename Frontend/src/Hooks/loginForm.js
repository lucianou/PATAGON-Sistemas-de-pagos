import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const useForm = (initialData, onValidate) => {
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = onValidate(form);

    if (err === null) {
      console.log(form);
    } else {
      setErrors(err);
    }
    console.log(form);
    navigate('/dashboard');
  }

  return [form, errors, loading, handleChange, handleSubmit];
}

export default useForm;