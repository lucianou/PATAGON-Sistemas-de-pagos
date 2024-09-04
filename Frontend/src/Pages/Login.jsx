import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import LoginButton from '../../public/Components/loginButton/loginButton';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login">
        <form>
          <h1>Login</h1>
          <div className='input-group'>
            <input type="text" id='name'required autoComplete='off'/>
            <label htmlFor="name">Nombre</label>
          </div>
          
          <div className='input-group'>
            <input type="password" id='pass'required autoComplete='off'/>
            <label htmlFor="pass">Contraseña</label>
          </div>

          <div className='login-group'>
            <div>
              <input id='check' type="checkbox"/>
              <label htmlFor='check'> Recordarme</label>
            </div>
            <a href='#'>¿Olvidaste tu contraseña?</a>
          </div>
          <LoginButton onClick={handleLogin}>Ingresar</LoginButton>
        </form>
    </div>    
  );
}

export default Login;