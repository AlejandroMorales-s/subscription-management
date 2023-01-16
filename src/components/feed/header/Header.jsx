import React, { useEffect, useState } from 'react';
//* Selectors
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../features/user/userSlice';
//* Icons
import { AiTwotoneSetting } from 'react-icons/ai';
//* Use navigate
import { useNavigate } from 'react-router-dom';

export default function Header() {
  //* States
  const [currentTime, setCurrentTime] = useState('');

  //* Selectors
  const userInfo = useSelector(selectUserData);

  //* Use navigate
  const navigate = useNavigate();

  //* Actual hour
  const actualHour = new Date().getHours();

  //* Use effect
  useEffect(() => {
    if (actualHour >= 4 && actualHour < 12) setCurrentTime('Buenos días');
    else if (actualHour >= 12 && actualHour < 20)
      setCurrentTime('Buenas tardes');
    else setCurrentTime('Buenas noches');
  }, []);

  return (
    <header className='header-container'>
      <h2>
        {currentTime}, {userInfo.displayName}
      </h2>
      <AiTwotoneSetting
        className='header-icon'
        onClick={() => navigate('/account')}
      />
    </header>
  );
}
