import React, { useState } from 'react';
//* Icons
import { IoIosAdd } from 'react-icons/io';
//* React router
import { useNavigate } from 'react-router-dom';

export default function AddServiceButton() {
  //* States
  const [active, setActive] = useState(false);

  //* Use navigate
  const navigate = useNavigate();

  //* Handle rotate
  const rotate = () => {
    setActive(!active);
    navigate('/add-subscription');
  };
  return (
    <div onClick={rotate} className='add-service-button'>
      <IoIosAdd
        className={`add-service-button-icon ${
          active ? 'button-active' : 'button-inactive'
        }`}
      />
    </div>
  );
}
