import React from 'react';
import useForm  from '../Hooks/loginForm';
import "../styles/Login.css";
import LoginButton from '../../public/Components/loginButton/loginButton';
import InputPassword from '../../public/Components/InputPassword/inputPassword';
import InputText from '../../public/Components/InputText/inputText';
import patagonImg from '../assets/patagon-logo-text-color.png';

function Login() {
  
  const initialData = {
    gmail: '',
    password: ''
  }

  const onValidate = (form) => { 
    let isError = false;
    let error ={};
    
  };

  const [form, errors, loading, handleChange, handleSubmit] = useForm(initialData, onValidate);


  return (
    <>
    <img src={patagonImg} alt="patagon" className='logo'/>
    <div className="login">
        <form onSubmit={handleSubmit} >
          <h1>Login</h1>
          <InputText id='gmail' label='Gmail' value={form.gmail} handleChange={handleChange} />
          <InputPassword id='password' label='Contraseña' value={form.password} handleChange={handleChange} />
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