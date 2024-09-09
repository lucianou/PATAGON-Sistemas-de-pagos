import React from 'react';
import './loginButton.css';

const LoginButton = ({ text }) => {
  return (
    <button className="textButton" type='submit'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </button>
  );
};

export default LoginButton;