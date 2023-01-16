import React, { useEffect, useRef, useState } from 'react';
//* Icons
import { AiFillEdit } from 'react-icons/ai';
//* Use selector
import { useSelector } from 'react-redux';
//* Selectors
import { selectUserData } from '../../features/user/userSlice';

export default function ModifyUsername() {
  //* State
  const [usernameHandler, setUsernameHandler] = useState('');

  //* Refs
  const usernameInputRef = useRef(null);

  //* Selectors
  const userInfo = useSelector(selectUserData);

  //* Update username
  const handleUsernameUpdate = (e) => {
    e.preventDefault();
  };

  //* Use effect
  useEffect(() => {
    setUsernameHandler(userInfo.displayName);

    usernameInputRef.current.style.width =
      usernameInputRef.current.value.length + 'ch';
  }, [userInfo]);

  useEffect(() => {
    usernameInputRef.current.style.width =
      usernameInputRef.current.value.length + 'ch';
  }, [usernameInputRef.current?.value, usernameHandler]);

  return (
    <form onSubmit={handleUsernameUpdate} className='user-name-input-form'>
      <div className='user-name-input-container'>
        <input
          className='user-name-input'
          type='text'
          ref={usernameInputRef}
          name='user-name'
          value={usernameHandler}
          placeholder='Username'
          onInput={(e) => {
            setUsernameHandler(e.target.value);

            usernameInputRef.current.style.width =
              usernameInputRef.current.value.length + 'ch';
          }}
        />
        <AiFillEdit className='user-name-input-icon' />
      </div>
      {usernameHandler !== userInfo.displayName && (
        <div className='submit-form-button-container'>
          <button type='submit'>Actualizar</button>
          <button
            type='button'
            onClick={() => setUsernameHandler(userInfo.displayName)}
          >
            Cancelar
          </button>
        </div>
      )}
    </form>
  );
}
