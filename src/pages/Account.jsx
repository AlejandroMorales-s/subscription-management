import React from 'react';
//* Icons
import { IoIosArrowBack } from 'react-icons/io';
//* Use navigate
import { useNavigate } from 'react-router-dom';
//* React redux
import { useDispatch, useSelector } from 'react-redux';
//* Redux slices
import { logout, selectIsSubmitting } from '../features/user/userSlice';
import { selectModalStatus } from '../features/modal/modalSlice';
//* Components
import Spinner from '../components/Spinner';
import ModifyUsername from '../components/account/ModifyUsername';
import Options from '../components/account/Options';
import Modal from '../components/Modal';
import ProfileImage from '../components/account/ProfileImage';

export default function Account() {
  //* Use navigate
  const navigate = useNavigate();

  //* Use dispatch
  const dispatch = useDispatch();

  //* Selectors
  const isSubmitting = useSelector(selectIsSubmitting);
  const modalStatus = useSelector(selectModalStatus);

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
        <ProfileImage />
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
      {modalStatus && <Modal />}
    </>
  );
}
