import React from 'react';
import './LoginButton.css';

const LoginButton = (props) => {
  const linkStyle = {
    position: 'relative',
    display: 'inline-block',
    padding: '10px 20px',
    color: '#03e9f4',
    fontSize: '16px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    overflow: 'hidden',
    transition: '0.5s',
    letterSpacing: '4px',
  };

  return (
    <a href="#" style={linkStyle}>
      <span></span><span></span>
      <span></span><span></span>
      {props.children}
    </a>
  );
};

export default LoginButton;