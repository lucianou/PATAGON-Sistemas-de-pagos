import React from 'react';
import '../styles/Registro.css';
import useForm from '../Hooks/registerForm';
import LoginButton from '../../public/Components/loginButton/loginButton';
import InputPassword from '../../public/Components/InputPassword/inputPassword';
import InputText from '../../public/Components/InputText/inputText';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Registro = () => {
  const initialData = {
    username: '',
    email: '',
    password: '',
    repPass: ''
  }

  const onValidate = (form) => {
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPassword = /^\S+$/;

    let errors = {};
    let isError = false;

    if(!regexName.test(form.username)){
      errors.username = "El nombre de usuario solo puede contener letras y espacios";
      console.log("error");
      isError = true;
    } else {
      errors.username = "";
    }

    if(!regexEmail.test(form.email)){
      errors.email = "El correo electronico contiene un formato invalido";
      isError = true;
    } else {
      errors.email = "";
    }

    if(form.password.trim() !== form.repPass.trim()){
      errors.repPass = "Las contraseñas no coinciden";
      isError = true;
    } else {
      errors.repPass = "";
    }

    if(!regexPassword.test(form.password)){
      errors.password = "La contraseña no puede contener espacios";
      isError = true;
    } else {
      errors.password = "";
    }

    return isError ? errors : null; 
  };

  const { form, errors, handleChange, handleSubmit } = useForm(initialData, onValidate);


  return (
    <>
      {/* <img src="https://patagon.uach.cl/user/themes/darkquark/images/logo/patagon-logo-text-color.svg" alt="patagon" className='logo'/> */}
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Registro</h1>
          <InputText icon={faUser} id='username' value={form.username} label='Nombre de usuario' handleChange={handleChange}/>  
          {errors.username && <div className="error-message" >{errors.username}</div>}
          
          <InputText icon={faEnvelope} id='email' value={form.email} label='Correo electronico' handleChange={handleChange}/>
          {errors.email && <div className="error-message" >{errors.email}</div>}
          
          <InputPassword icon={faLock} id='password' value={form.password} label='Contraseña' handleChange={handleChange}/>
          {errors.password && <div className="error-message" >{errors.password}</div>}
          
          <InputPassword icon={faLock} id='repPass' value={form.repPass} label='Repetir contraseña' handleChange={handleChange}/>
          {errors.repPass && <div className="error-message" >{errors.repPass}</div>}

          <LoginButton text="Registrarse" />
          <p className='registro'>¿Ya tienes cuenta? <a href='/login'>Ingresa</a></p>
        </form>
      </div>
    </>
  );
};

export default Registro;