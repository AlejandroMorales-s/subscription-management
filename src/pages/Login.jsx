import React, { useState } from 'react';
//* React redux
import { useDispatch, useSelector } from 'react-redux';
//* Components
import SocialMedia from '../components/forms/SocialMedia';
import GenericForm from '../components/forms/GenericForm';
import { loginWithEmail } from '../features/user/userSlice';
import Input from '../components/forms/Input';
import Modal from '../components/Modal';
//* Redux slices
import {
  addError,
  removeError,
  selectErrorMessage,
  selectErrorStatus,
} from '../features/error/errorSlice';
import { returnToInicialValuesModalInfo } from '../features/modal/modalSlice';
//* Use navigate
import { useNavigate } from 'react-router-dom';

export default function Login() {
  //* States
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  //* Selectors
  const errorStatus = useSelector(selectErrorStatus);
  const error = useSelector(selectErrorMessage);

  //* Use dispatch
  const dispatch = useDispatch();

  //* Use navigate
  const navigate = useNavigate();

  //* Verify email
  const verifyEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };

  //* Handle login
  const handleLogin = (data) => {
    const { email, password } = data;

    if (!verifyEmail(email) || email === '') {
      setInvalidEmail(true);
      dispatch(addError({ errorMessage: 'Usa un correo electrónico válido' }));
      return;
    } else {
      setInvalidEmail(false);
    }

    if (password === '') {
      setInvalidPassword(true);
      dispatch(addError({ errorMessage: 'Usa una contraseña válida' }));
      return;
    } else {
      setInvalidPassword(false);
    }

    dispatch(returnToInicialValuesModalInfo());
    dispatch(removeError());
    dispatch(loginWithEmail(data));
  };

  return (
    <>
      {errorStatus && <Modal type={'error'} message={error} />}
      <div className='form-container'>
        <div className='logo-div'>
          <div className='form-logo-container'>
            <h1>
              <span>S</span>ubscription <span>M</span>anagement
            </h1>
            <p className='slogan'>
              La mejor aplicación para manejar tus suscripciones
            </p>
          </div>
        </div>
        <div className='login-signup-form-container'>
          <h2>Inicia Sesión</h2>
          <GenericForm
            buttonText={'Inicia Sesión'}
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleLogin}
          >
            <Input
              label='Correo electrónico'
              placeholder='example@example.com'
              name='email'
              type='email'
              className={invalidEmail ? 'invalid-input' : ''}
            />
            <Input
              label='Contraseña'
              placeholder='********'
              name='password'
              type='password'
              className={invalidPassword ? 'invalid-input' : ''}
            />
          </GenericForm>
          <p onClick={() => navigate('/signup')} className='change-form-link'>
            No tienes cuenta? Regístrate ahora
          </p>
          <SocialMedia />
        </div>
      </div>
    </>
  );
}
