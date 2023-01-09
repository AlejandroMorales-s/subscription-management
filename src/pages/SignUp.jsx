import React, { useState } from 'react';
//* Components
import SocialMedia from '../components/forms/SocialMedia';
import Modal from '../components/Modal';
import GenericForm from '../components/forms/GenericForm';
import Input from '../components/forms/Input';
//* React redux
import { useDispatch, useSelector } from 'react-redux';
//* Redux slices
import {
  addError,
  removeError,
  selectErrorMessage,
  selectErrorStatus,
} from '../features/error/errorSlice';
import { createAccountWithEmail } from '../features/user/userSlice';
import { returnToInicialValuesModalInfo } from '../features/modal/modalSlice';
//* Use navigate
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  //* States
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidName, setInvalidName] = useState(false);

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

  //* Verify password
  const verifyPassword = (password) => {
    const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return passwordRegex.test(password);
  };

  //* Handle login
  const handleLogin = (data) => {
    const { email, password, name } = data;

    if (name === '') {
      setInvalidName(true);
      dispatch(addError({ errorMessage: 'Proporciona un nombre válido' }));
      return;
    } else {
      setInvalidName(false);
    }

    if (!verifyEmail(email) || email === '') {
      setInvalidEmail(true);
      dispatch(addError({ errorMessage: 'Usa un correo electrónico válido' }));
      return;
    } else {
      setInvalidEmail(false);
    }

    if (!verifyPassword(password)) {
      setInvalidPassword(true);
      dispatch(addError({ errorMessage: 'Usa una contraseña válida' }));
      return;
    } else {
      setInvalidPassword(false);
    }

    dispatch(returnToInicialValuesModalInfo());
    dispatch(removeError());
    dispatch(createAccountWithEmail(data));
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
          <h2>Regístrate</h2>
          <GenericForm
            buttonText={'Regístrate'}
            initialValues={{
              email: '',
              password: '',
              name: '',
            }}
            onSubmit={handleLogin}
          >
            <Input
              label='Nombre'
              placeholder='John Doe'
              name='name'
              type='text'
              className={invalidName ? 'invalid-input' : ''}
            />
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
          <p onClick={() => navigate('/')} className='change-form-link'>
            Ya tienes una cuenta? Inicia sesión
          </p>
          <SocialMedia />
        </div>
      </div>
    </>
  );
}
