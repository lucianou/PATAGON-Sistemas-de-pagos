import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import './inputText.css';


const InputText = ({ id, label, handleChange}) => {
  return (
    <div className='input-group'>
      <input type='text' id={id} autoComplete='off' required onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
      <FontAwesomeIcon icon={faUser} className="fa-icon"/>
    </div>
  );
};

export default InputText;