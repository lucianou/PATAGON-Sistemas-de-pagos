import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h1 className="h1_patagon">Pata<span>gón</span></h1>
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
          <button type="submit">Submit</button>
          <button type="sign_-in">Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default Login;