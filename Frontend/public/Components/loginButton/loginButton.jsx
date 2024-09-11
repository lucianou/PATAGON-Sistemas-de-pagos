import React from 'react';
import './loginButton.css';

const LoginButton = ({ text, onClick}) => {
  return (
    <button className="textButton" type='submit' onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </button>
  );
};

export default LoginButton;