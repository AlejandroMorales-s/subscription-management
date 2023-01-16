import React, { useState } from 'react';
//* Icons
import { IoIosArrowForward } from 'react-icons/io';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
//* Use navigate
import { useNavigate } from 'react-router-dom';

export default function Options() {
  //* States
  const [darkMode, setDarkMode] = useState(false);

  //* Use navigate
  const navigate = useNavigate();

  //* Handle options
  const handleOptionsActions = (e) => {
    const actions = [setDarkMode, '/payment-methods'];

    const id = Number(e.target.id);

    const actionSelected = actions[id];

    if (typeof actionSelected !== 'string') actionSelected(!darkMode);
    else navigate(actionSelected);
  };

  //* Options
  const options = [
    {
      id: 0,
      name: !darkMode ? 'Modo oscuro' : 'Modo claro',
      icon: !darkMode ? (
        <MdDarkMode className='account-option-icon' />
      ) : (
        <MdLightMode className='account-option-icon' />
      ),
    },
    {
      id: 1,
      name: 'Métodos de pago',
      icon: <IoIosArrowForward className='account-option-icon' />,
    },
  ];

  return (
    <div className='account-options-container'>
      {options.map((option) => {
        return (
          <div
            key={option.name}
            className='account-option'
            onClick={handleOptionsActions}
            id={option.id}
          >
            <p id={option.id} className='account-option-text'>
              {option.name}
            </p>
            {option.icon}
          </div>
        );
      })}
    </div>
  );
}
