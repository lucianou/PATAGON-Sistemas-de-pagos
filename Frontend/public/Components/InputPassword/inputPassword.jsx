import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import './inputPassword.css';

const inputPassword = ({ id, label }) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className='input-group'>
      <input type={isPasswordVisible ? 'text' : 'password'} id={id} required autoComplete='off' />
      <label htmlFor={id}>{label}</label>
      <FontAwesomeIcon icon={faLock} className="fa-icon"/>
      <button type="button" onClick={togglePasswordVisibility} className="eye-button">
        <FontAwesomeIcon className='ojo' icon={isPasswordVisible ? faEyeSlash : faEye} />
      </button>
    </div>
  );
};

export default inputPassword;