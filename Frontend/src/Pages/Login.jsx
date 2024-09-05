import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import LoginButton from '../../public/Components/loginButton/loginButton';
import InputPassword from '../../public/Components/InputPassword/inputPassword';
import InputText from '../../public/Components/InputText/inputText';
function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <>
    {/* <h1 className='h1-patagon'>Pata<span>gon</span></h1> */}
    <img src="https://patagon.uach.cl/user/themes/darkquark/images/logo/patagon-logo-text-color.svg" alt="patagon" className='logo'/>
    <div className="login">
        <form>
          <h1>Login</h1>
          <InputText id='name' label='Nombre de usuario' />
          <InputPassword id='pass' label='Contraseña' />
          <div className='login-group'>
            <div>
              <input id='check' type="checkbox" />
              <label htmlFor='check'> Recordarme</label>
            </div>
              <a href='#' className='forg-pass'>¿Olvidaste tu contraseña?</a>
          </div>
          <LoginButton onClick={handleLogin} text="Ingresar" />
          <p className='registro'>¿No tienes cuenta? <a href='/registro'>Regístrate</a></p>
        </form>
    </div>   
    </> 
  );
}

export default Login;