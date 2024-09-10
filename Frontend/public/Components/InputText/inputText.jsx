import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './inputText.css';


const InputText = ({ id, label, handleChange, value, icon }) => {
  return (
    <div className='input-group'>
      <input type='text' id={id} name={id} autoComplete='off' value={value} required onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
      <FontAwesomeIcon icon={icon} className="fa-icon"/>
    </div>
  );
};

export default InputText;