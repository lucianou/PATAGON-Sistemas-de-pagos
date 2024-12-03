import React from 'react';
import style from '@styles/LoginGeneral.module.css';
import style2 from '@styles/Registro.module.css';
import useForm from '@hooks/registerForm';
import LoginButton from '@components/loginButton/loginButton';
import ParticlesBG from '@components/Particles/ParticlesBG';
import InputPassword from '../components/InputPassword/inputPassword';

const PassChange = () => {
  const initialData = {
    password: '',
    confirmPassword: ''
  };

  const onValidate = (form) => {
    let errors = {};
    let isError = false;

    if (!form.password.trim()) {
      errors.password = "La contraseña no puede estar vacía";
      isError = true;
    } else if (!/(?=.*[A-Z])/.test(form.password)) {
      errors.password = "La contraseña debe contener al menos una letra mayúscula.";
      isError = true;
    } else if (!/(?=.*\d)/.test(form.password)) {
      errors.password = "La contraseña debe contener al menos un número.";
      isError = true;
    } else if (form.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
      isError = true;
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
      isError = true;
    }

    return isError ? errors : null;
  };

  const { form, errors, loading, handleChange, handleSubmit } = useForm(initialData, onValidate);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const validationErrors = onValidate(form);
    if (!validationErrors) {
      console.log("Password change request submitted with:", form.password);
    } else {
      if (validationErrors.confirmPassword) {
        alert(validationErrors.confirmPassword);
      } else if (validationErrors.password) {
        alert(validationErrors.password);
      }
    }
  };

  return (
    <>
      <ParticlesBG />
      <div className={style.body}>
        <div className={style.contenedor}>
          <form onSubmit={handlePasswordChange}>
            <h1>Cambiar Contraseña</h1>
            <InputPassword 
              type="password"
              id="password"
              value={form.password}
              label="Nueva Contraseña"
              handleChange={handleChange}
              disabled={loading}
            />
            {errors.password && <div className={style2.errorMessage}>{errors.password}</div>}

            <InputPassword
              type="password"
              id="confirmPassword"
              value={form.confirmPassword}
              label="Confirmar Contraseña"
              handleChange={handleChange}
              disabled={loading}
            />
            {errors.confirmPassword && <div className={style2.errorMessage}>{errors.confirmPassword}</div>}

            <LoginButton text="Cambiar Contraseña" disabled={loading} />
          </form>
        </div>
      </div>
    </>
  );
};

export default PassChange;
