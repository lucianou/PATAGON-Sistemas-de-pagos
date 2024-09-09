import React from 'react';
import useForm  from '../Hooks/loginForm';
import "../styles/Login.css";
import LoginButton from '../../public/Components/loginButton/loginButton';
import InputPassword from '../../public/Components/InputPassword/inputPassword';
import InputText from '../../public/Components/InputText/inputText';

function Login() {
  
  const initialData = {
    name: '',
    password: ''
  }

  const onValidate = (form) => { 
    let isError = false;
    let error ={};

    if(!form.name.trim  ){
      isError = true;
      error.name = 'El nombre de usuario es obligatorio';
    }
  };

  const [form, errors, loading, handleChange, handleSubmit] = useForm(initialData, onValidate);


  return (
    <>
    <img src="https://patagon.uach.cl/user/themes/darkquark/images/logo/patagon-logo-text-color.svg" alt="patagon" className='logo'/>
    <div className="login">
        <form onSubmit={handleSubmit} >
          <h1>Login</h1>
          <InputText id='name' label='Nombre de usuario' onChange={handleChange} />
          <InputPassword id='pass' label='Contraseña' onChange={handleChange} />
          <div className='login-group'>
            <div>
              <input id='check' type="checkbox" />
              <label htmlFor='check'> Recordarme</label>
            </div>
              <a href='#' className='forg-pass'>¿Olvidaste tu contraseña?</a>
          </div>
          <LoginButton text="Ingresar" />
          <p className='registro'>¿No tienes cuenta? <a href='/registro'>Regístrate</a></p>
        </form>
    </div>   
    </> 
  );
}

export default Login;