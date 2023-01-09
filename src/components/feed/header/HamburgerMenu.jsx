import React, { useState } from 'react';
//* Icons
import { BiMenu } from 'react-icons/bi';
//* React Redux
import { useDispatch, useSelector } from 'react-redux';
//* React Router
import { useNavigate } from 'react-router-dom';
//* User slice
import { logout, selectIsSubmitting } from '../../../features/user/userSlice';
//* Components
import Spinner from '../../Spinner';

export default function HamburgerMenu() {
  //* States
  const [menuOpen, setMenuOpen] = useState(false);

  //* Dispatch
  const dispatch = useDispatch();

  //* Use navigate
  const navigate = useNavigate();

  //* Selectors
  const selectIsLoading = useSelector(selectIsSubmitting);

  //* Handle logout
  const handleLogout = () => dispatch(logout()).then(() => navigate('/'));

  return (
    <div className='hamburger-menu-container'>
      <BiMenu
        onClick={() => setMenuOpen(!menuOpen)}
        className={`hamburger-menu-icon ${menuOpen && 'hamburger-menu-active'}`}
      />
      <nav
        className={`hamburger-menu ${menuOpen ? 'menu-open' : 'menu-closed'}`}
      >
        <ul>
          <li>
            <p>Cuenta</p>
          </li>
          <li>
            <p>Métodos de pago</p>
          </li>
          <li onClick={handleLogout}>
            {selectIsLoading ? <Spinner /> : <p>Cerrar sesión</p>}
          </li>
        </ul>
      </nav>
    </div>
  );
}
