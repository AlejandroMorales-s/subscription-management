import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import {
  addError,
  selectErrorMessage,
  selectErrorStatus,
} from '../features/error/errorSlice';
import {
  createSubscription,
  selectUserSubscriptions,
  updateSubscription,
} from '../features/subscriptions/subscriptionsSlice';
import { selectUserData } from '../features/user/userSlice';
import getContrast from '../utils/getContrastBetweenTwoColors';

export default function AddNewSubscription() {
  //* Refs
  const colorPickerRef = useRef(null);

  //* Query param
  const { subscriptionId } = useParams();

  //* States
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    name: '',
    price: undefined,
    isPaid: false,
    color: '#dddddd',
    paymentRecurrence: null,
    date: undefined,
  });
  const [textColor, setTextColor] = useState('#000000');

  let { name, price, color, paymentRecurrence, date } = subscriptionInfo;

  //* Navigate
  const navigate = useNavigate();

  //* Dispatch
  const dispatch = useDispatch();

  //* Selectors
  const errorStatus = useSelector(selectErrorStatus);
  const errorMessage = useSelector(selectErrorMessage);
  const userInfo = useSelector(selectUserData);
  const userSubscriptions = useSelector(selectUserSubscriptions);

  //* Add a new subscription
  const addSubHandler = (uid, newSubscriptionData) => {
    dispatch(
      createSubscription({
        uid,
        newSubscriptionData,
      })
    );
  };

  //* Modify subscription
  const modifySubHandler = (uid, subscriptionData) => {
    dispatch(
      updateSubscription({
        uid,
        subscriptionData,
      })
    );
  };

  //* Submit form handler
  const submittingFormHandler = (e) => {
    e.preventDefault();

    if (!name || !price || !paymentRecurrence || !date) {
      dispatch(addError({ errorMessage: 'Rellena todos los campos' }));
      return;
    }

    if (subscriptionId)
      modifySubHandler(userInfo.uid, {
        id: subscriptionId,
        data: subscriptionInfo,
      });
    else addSubHandler(userInfo.uid, subscriptionInfo);
  };

  //* Use effect
  useEffect(() => {
    if (userSubscriptions.length !== 0 && subscriptionId) {
      const subscription = userSubscriptions.find(
        (sub) => sub.id === subscriptionId
      );

      setSubscriptionInfo(subscription.data);
    }
  }, [userSubscriptions]);

  useEffect(() => {
    if (getContrast(subscriptionInfo.color) > 10) setTextColor('#000000');
    else setTextColor('#ffffff');
  }, [subscriptionInfo.color]);

  return (
    <>
      {errorStatus && <Modal type={'error'} message={errorMessage} />}
      <header className='new-subscription-header-container'>
        <IoIosArrowBack
          onClick={() => navigate('/feed')}
          className='add-new-sub-return-icon'
        />
        <h3>Añade una nueva suscripción</h3>
      </header>
      <form onSubmit={submittingFormHandler} className='add-sub-form-container'>
        <div
          className='new-sub-card-preview'
          style={{ backgroundColor: subscriptionInfo.color }}
        >
          <input
            className='new-sub-card-preview-name'
            type='text'
            name='name'
            id='sub-name'
            value={name}
            placeholder='Nombre...'
            style={{ color: textColor }}
            onInput={(e) =>
              setSubscriptionInfo({
                ...subscriptionInfo,
                name: e.target.value,
              })
            }
          />
          <input
            className='new-sub-card-preview-price'
            type='number'
            name='price'
            id='sub-price'
            value={price}
            placeholder='$0.00'
            style={{ color: textColor }}
            onInput={(e) =>
              setSubscriptionInfo({
                ...subscriptionInfo,
                price: Number(e.target.value),
              })
            }
          />
        </div>
        <div className='color-picker-container'>
          <label htmlFor='color-picker'>Selecciona un color:</label>
          <input
            type='color'
            id='color-picker'
            name='color'
            value={color}
            ref={colorPickerRef}
            onInput={(e) =>
              setSubscriptionInfo({
                ...subscriptionInfo,
                color: e.target.value,
              })
            }
          />
        </div>
        <div className='type-of-payment-container'>
          <button
            onClick={() =>
              setSubscriptionInfo({
                ...subscriptionInfo,
                paymentRecurrence: 'Monthly',
              })
            }
            type='button'
            className={`${
              subscriptionInfo.paymentRecurrence === 'Monthly' && 'active'
            }`}
          >
            Pago mensual
          </button>
          <button
            onClick={() =>
              setSubscriptionInfo({
                ...subscriptionInfo,
                paymentRecurrence: 'One time',
              })
            }
            type='button'
            className={`${
              subscriptionInfo.paymentRecurrence === 'One time' && 'active'
            }`}
          >
            Un solo pago
          </button>
        </div>
        <div className='date-of-subscription'>
          <label htmlFor='sub-date'>Fecha de inicio:</label>
          <input
            type='date'
            name='sub-date'
            value={date}
            onInput={(e) =>
              setSubscriptionInfo({
                ...subscriptionInfo,
                date: e.target.value,
              })
            }
          />
        </div>
        <button type='submit' className='submit-button'>
          {subscriptionId ? 'Modificar información' : 'Añadir suscripción'}
        </button>
      </form>
    </>
  );
}
