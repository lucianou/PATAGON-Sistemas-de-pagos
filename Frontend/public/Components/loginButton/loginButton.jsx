import React from 'react';
import './loginButton.css';
const LoginButton = (props) => {
  return (
    <a className="text-button" href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {props.children}
    </a>
  );
};

export default LoginButton;