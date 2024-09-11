import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './inputText.module.css';


const InputText = ({ id, label, handleChange, value, icon }) => {
  return (
    <div className={style.inputGroup}>
      <input type='text' id={id} name={id} autoComplete='off' value={value} required onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
      <FontAwesomeIcon icon={icon} className={style.faIcon}/>
    </div>
  );
};

export default InputText;