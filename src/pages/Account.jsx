import React from 'react';
//* Icons
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
//* Use navigate
import { useNavigate } from 'react-router-dom';
//* React redux
import { useDispatch, useSelector } from 'react-redux';
//* Selectors
import {
  logout,
  selectIsSubmitting,
  selectUserData,
} from '../features/user/userSlice';
//* Components
import Spinner from '../components/Spinner';
import ModifyUsername from '../components/account/ModifyUsername';
import Options from '../components/account/Options';

export default function Account() {
  //* Use navigate
  const navigate = useNavigate();

  //* Use dispatch
  const dispatch = useDispatch();

  //* Selectors
  const userInfo = useSelector(selectUserData);
  const isSubmitting = useSelector(selectIsSubmitting);

  return (
    <>
      <header className='new-subscription-header-container'>
        <IoIosArrowBack
          onClick={() => navigate('/feed')}
          className='add-new-sub-return-icon'
        />
        <h3>Cuenta</h3>
      </header>
      <main className='account-details-container'>
        <div className={`profile-photo-container ${userInfo && ''}`}>
          {userInfo.photoURL ? (
            <img src={userInfo.photoURL} alt='Foto de perfil' />
          ) : (
            <AiOutlineUser className='user-image-icon' />
          )}
        </div>
        <ModifyUsername />
        <Options />
        <button
          onClick={() => dispatch(logout()).then(() => navigate('/'))}
          className='close-session-button'
          type='button'
        >
          {isSubmitting ? <Spinner /> : 'Cerrar sesión'}
        </button>
      </main>
    </>
  );
}
