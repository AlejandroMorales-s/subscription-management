import React, { useState } from 'react';
//* Icons
import { AiOutlineUser } from 'react-icons/ai';
//* React redux
import { useDispatch, useSelector } from 'react-redux';
//* Redux slices
import { modifyModalInfo } from '../../features/modal/modalSlice';
import { selectUserData } from '../../features/user/userSlice';

export default function ProfileImage() {
  //* States
  const [imageStatus, setImageStatus] = useState(true);

  //* Use dispatch
  const dispatch = useDispatch();

  //* Selectors
  const userInfo = useSelector(selectUserData);

  //* Handle profile image error
  const handleImageFetchingError = () => {
    setImageStatus(false);
    dispatch(
      modifyModalInfo({
        modalActive: true,
        modalMessage: 'Error al intentar consultar foto de perfil',
        modalType: 'error',
      })
    );
  };

  return (
    <div className={`profile-photo-container ${userInfo && ''}`}>
      {userInfo.photoURL && imageStatus ? (
        <img
          src={userInfo.photoURL}
          onError={handleImageFetchingError}
          alt='Foto de perfil'
        />
      ) : (
        <AiOutlineUser className='user-image-icon' />
      )}
    </div>
  );
}
