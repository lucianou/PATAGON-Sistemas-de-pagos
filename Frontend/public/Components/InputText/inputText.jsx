import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './inputText.css';


const InputText = ({ id, label, handleChange, value}) => {
  return (
    <div className='input-group'>
      <input type='text' className={id} name={id} autoComplete='off' value={value} required onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
      <FontAwesomeIcon icon={faEnvelope} className="fa-icon"/>
    </div>
  );
};

export default InputText;