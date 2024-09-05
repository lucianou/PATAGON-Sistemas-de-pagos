import React from 'react';
import styles from './loginButton.module.css';

const LoginButton = ({ text, onClick }) => {
  return (
    <a className={styles.textButton} onClick={onClick} href="#">
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      {text}
    </a>
  );
};

export default LoginButton;