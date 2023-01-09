import React, { useEffect, useState } from 'react';
//* Selectors
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../features/user/userSlice';
//* Components
import HamburgerMenu from './HamburgerMenu';

export default function Header() {
  //* States
  const [currentTime, setCurrentTime] = useState('');

  //* Selectors
  const userInfo = useSelector(selectUserData);

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
      <HamburgerMenu />
    </header>
  );
}
