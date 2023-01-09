import React, { useEffect } from 'react';
//* Icons
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
//* Auth
import { signInMethods } from '../../libs/auth';
//* React redux
import { useDispatch, useSelector } from 'react-redux';
//* React router
import { useNavigate } from 'react-router-dom';
//* Redux slice
import {
  loginWithSocialMedia,
  selectLoggedStatus,
} from '../../features/user/userSlice';

export default function SocialMedia() {
  //* Use dispatch
  const dispatch = useDispatch();

  //* Use navigate
  const navigate = useNavigate();

  //* Selectors
  const loggedStatus = useSelector(selectLoggedStatus);

  //* Handle login with provider
  const loginWithProvider = (id) => dispatch(loginWithSocialMedia(id));

  //* Use effect
  useEffect(() => {
    if (loggedStatus) navigate('/feed');
    // eslint-disable-next-line
  }, [loggedStatus]);

  return (
    <div className='login-signup-social-media-container'>
      <div className='line-section-container'>
        <hr />
        <p>O</p>
        <hr />
      </div>
      <div className='social-media-buttons-container'>
        <button onClick={() => loginWithProvider(signInMethods.facebook)}>
          <BsFacebook className='social-media-button-icon' />
          Facebook
        </button>
        <button onClick={() => loginWithProvider(signInMethods.google)}>
          <FcGoogle className='social-media-button-icon' />
          Google
        </button>
      </div>
    </div>
  );
}
