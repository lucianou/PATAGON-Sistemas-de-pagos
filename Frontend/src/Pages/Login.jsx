import React from 'react';
import LoginButton from "../../public/Components/loginButton/loginButton";
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <>
    <h1 className="h1_patagon">Pata<span>gón</span></h1>
    <div className="login-container">
      <div className="div_login">
        <h1 className="h1_login">Login</h1>
        <div className="form-group1">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group2">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className='form-group3'>
          <LoginButton onClick={handleLogin}>Ingreso</LoginButton>
          <LoginButton onClick={handleLogin}>Registrarse</LoginButton> 
        </div>
      </div>
    </div>
  </>
  );
}

export default Login;