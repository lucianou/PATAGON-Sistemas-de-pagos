import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Registro.css';
import LoginButton from '../../public/Components/loginButton/loginButton';
import InputPassword from '../../public/Components/InputPassword/inputPassword';
import InputText from '../../public/Components/InputText/inputText';

const Registro = () => {
  const history = useNavigate();

  const onValidate = () => {

    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    
  }


  return (
    <>
      <img src="https://patagon.uach.cl/user/themes/darkquark/images/logo/patagon-logo-text-color.svg" alt="patagon" className='logo'/>
      <div className="login">
        <form >
          <h1>Registro</h1>
          <InputText id='name' label='Nombre de usuario' />
          <InputText id='gmail' label='Correo electronico' />
          <InputPassword id='pass' label='Contraseña' />
          <InputPassword id='repPass' label='Repetir contraseña' />

          <LoginButton text="Registrarse" />
          <p className='registro'>¿Ya tienes cuenta? <a href='/'>Ingresa</a></p>
        </form>
      </div>
    </>
  );
};

export default Registro;