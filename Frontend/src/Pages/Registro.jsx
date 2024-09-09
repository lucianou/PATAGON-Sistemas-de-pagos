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

  const onValidate = () => {
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPassword = /^\S+$/;
    let isError = false;

    if(!regexName.test(form.username)){
      errors.username = "El nombre de usuario solo puede contener letras y espacios";
      console.log("error");
      isError = true;
    }

    if(!regexEmail.test(form.email)){
      errors.email = "El correo electronico contiene un formato invalido";
      isError = true;
    }

    if(form.password.trim() !== form.repPass.trim()){
      console.log(form.password);
      console.log(form.repPass);
      errors.repPass = "Las contraseñas no coinciden";
      isError = true;
    }

    if(!regexPassword.test(form.password)){
      errors.password = "La contraseña no puede contener espacios";
      isError = true;
    }

    return isError ? errors : null; 
  };

  const [form, errors, handleChange, handleSubmit] = useForm(initialData, onValidate);


  return (
    <>
      {/* <img src="https://patagon.uach.cl/user/themes/darkquark/images/logo/patagon-logo-text-color.svg" alt="patagon" className='logo'/> */}
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Registro</h1>
          {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
          <InputText icon={faUser} id='username' value={form.username} label='Nombre de usuario' handleChange={handleChange}/>  
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
          
          <InputText icon={faEnvelope} id='email' value={form.email} label='Correo electronico' handleChange={handleChange}/>
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          
          <InputPassword icon={faLock} id='password' value={form.password} label='Contraseña' handleChange={handleChange}/>
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          
          <InputPassword icon={faLock} id='repPass' value={form.repPass} label='Repetir contraseña' handleChange={handleChange}/>
          {errors.repPass && <p style={{ color: 'red' }}>{errors.repPass}</p>}

          <LoginButton text="Registrarse" />
          <p className='registro'>¿Ya tienes cuenta? <a href='/'>Ingresa</a></p>
        </form>
      </div>
    </>
  );
};

export default Registro;