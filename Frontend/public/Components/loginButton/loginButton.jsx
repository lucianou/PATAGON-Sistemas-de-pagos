import React from 'react';
import styles from './loginButton.module.css';

const LoginButton = ({ text, onClick, disabled }) => {
  return (
    <button className={styles.textButton} type='submit' onClick={onClick} disabled={disabled}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </button>
  );
};

export default LoginButton;