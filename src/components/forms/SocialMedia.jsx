import React, { useEffect } from 'react'
import {FcGoogle} from 'react-icons/fc'
import {BsFacebook} from 'react-icons/bs'
import {signInMethods} from '../../libs/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginWithSocialMedia, selectLoggedStatus } from '../../features/user/userSlice'

export default function SocialMedia() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedStatus = useSelector(selectLoggedStatus)
  
  const loginWithProvider = (id) => dispatch(loginWithSocialMedia(id))
  
  useEffect(() => {
    if (loggedStatus) navigate('/feed')
    // eslint-disable-next-line
  }, [loggedStatus])

  return (
    <div className='login-signup-social-media-container'>
      <div className='line-section-container'>
        <hr />
        <p>O</p>
        <hr />
      </div>
      <div className='social-media-buttons-container'>
        <button onClick={() => loginWithProvider(signInMethods.facebook)}>
          <BsFacebook className='social-media-button-icon'/>
          Facebook
        </button>
        <button onClick={() => loginWithProvider(signInMethods.google)}>
          <FcGoogle className='social-media-button-icon'/>
          Google
        </button>
      </div>
    </div>
  )
}
