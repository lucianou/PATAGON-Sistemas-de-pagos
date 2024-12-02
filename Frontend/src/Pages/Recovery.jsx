import React from 'react';
import style from '@styles/LoginGeneral.module.css';
import style2 from '@styles/Registro.module.css';
import useForm from '@hooks/registerForm';
import LoginButton from '@components/loginButton/loginButton';
import InputText from '@components/InputText/inputText';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ParticlesBG from '@components/Particles/ParticlesBG';

const Recovery = () => {
  const initialData = {
    email: ''
  };

  const onValidate = (form) => {
    let regexEmail = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

    let errors = {};
    let isError = false;

    if (!form.email.trim()) {
      errors.email = "El correo electrónico no puede estar vacío";
      isError = true;
    } else if (!form.email.includes('@')) {
      errors.email = "El correo electrónico debe contener un '@'";
      isError = true;
    } else if (form.email.endsWith('.') || !/^[a-zA-Z]$/.test(form.email.slice(-1))) {
      errors.email = "El correo electrónico no puede terminar en '.' o un carácter no alfabético";
      isError = true;
    } else if (!regexEmail.test(form.email)) {
      errors.email = "El correo electrónico contiene un formato inválido";
      isError = true;
    }

    return isError ? errors : null;
  };

  const { form, errors, loading, handleChange, handleSubmit } = useForm(initialData, onValidate);

  const handleRecovery = (e) => {
    e.preventDefault();
    const validationErrors = onValidate(form);
    if (!validationErrors) {
      console.log("Recovery request submitted for:", form.email);
    }
  };

  return (
    <>
      <ParticlesBG />
      <div className={style.body}>
        <div className={style.contenedor}>
          <form onSubmit={handleRecovery}>
            <h1>Recuperar Contraseña</h1>
            <InputText 
              icon={faEnvelope} 
              id='email' 
              value={form.email} 
              label='Correo electrónico' 
              handleChange={handleChange} 
              disabled={loading} 
            />
            {errors.email && <div className={style2.errorMessage}>{errors.email}</div>}

            <LoginButton text="Recuperar" disabled={loading} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Recovery;