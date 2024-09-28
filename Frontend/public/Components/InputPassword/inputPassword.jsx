import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import style from './inputPassword.module.css';

const InputPassword = ({ id, label, value, handleChange, disabled}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.inputGroup}>
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        required
        autoComplete='off'
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
      <FontAwesomeIcon icon={faLock} className={style.faIcon} />
      <button type="button" onClick={toggleShowPassword}>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={style.ojo} />
      </button>
    </div>
  );
};

export default InputPassword;