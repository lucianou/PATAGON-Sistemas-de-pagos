import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './inputText.css';


const InputText = ({ id, label }) => {
  return (
    <div className='input-group'>
      <input type='text' id={id} required autoComplete='off' />
      <label htmlFor={id}>{label}</label>
      <FontAwesomeIcon icon={faUser} className="fa-icon"/>
    </div>
  );
};

export default InputText;