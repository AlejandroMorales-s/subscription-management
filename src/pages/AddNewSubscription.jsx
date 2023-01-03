import React, { 
  useState, 
  useEffect, 
  useRef 
} from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import { 
  addError, 
  selectErrorMessage, 
  selectErrorStatus 
} from '../features/error/errorSlice'
import { createSubscription } from '../features/subscriptions/subscriptionsSlice'
import { selectUserData } from '../features/user/userSlice'
import getContrast from '../utils/getContrastBetweenTwoColors'

export default function AddNewSubscription() {
  //* Refs
  const colorPickerRef = useRef(null)
  
  //* States
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    name: '', 
    price: 0,
    isPaid: false,
    color: '#dddddd',
    paymentRecurrence: null,
    date: null
  })
  const [textColor, setTextColor] = useState('#000000')
  
  //* Navigate
  const navigate = useNavigate()
  
  //* Dispatch
  const dispatch = useDispatch()
  
  //* Selectors
  const errorStatus = useSelector(selectErrorStatus)
  const errorMessage = useSelector(selectErrorMessage)
  const userInfo = useSelector(selectUserData)
  
  //* Add a new subscription
  const addSubHandler = (e) => {
    e.preventDefault()

    if (
        !subscriptionInfo.name ||
        !subscriptionInfo.price ||
        !subscriptionInfo.paymentRecurrence ||
        !subscriptionInfo.date
        ) {
          dispatch(addError({errorMessage: 'Rellena todos los campos'}))
          return
    }

    dispatch(createSubscription({
      uid: userInfo.uid, 
      newSubscriptionData: subscriptionInfo
    }))    
  }
      
  //* Use effect
  useEffect(() => {
    if (getContrast(subscriptionInfo.color) > 10) setTextColor('#000000')
    else setTextColor('#ffffff')
  }, [subscriptionInfo.color])

  return (
    <>
      {errorStatus &&
        <Modal type={'error'} message={errorMessage}/>
      }
      <header className='new-subscription-header-container'>
        <IoIosArrowBack 
          onClick={() => navigate('/feed')} 
          className='add-new-sub-return-icon'
        />
        <h3>Añade una nueva suscripción</h3>
      </header>
      <form onSubmit={addSubHandler} className='add-sub-form-container'>
        <div 
          className='new-sub-card-preview'
          style={{backgroundColor: subscriptionInfo.color}}
        >
            <input
              className='new-sub-card-preview-name' 
              type="text" 
              name="name" 
              id="sub-name"
              placeholder='Nombre...'
              style={{color: textColor}} 
              onInput={(e) => setSubscriptionInfo({
                ...subscriptionInfo, 
                name: e.target.value
              })} 
            />
            <input
              className='new-sub-card-preview-price'
              type="number" 
              name="price" 
              id="sub-price"
              placeholder='$0.00'
              style={{color: textColor}} 
              onInput={(e) => setSubscriptionInfo({
                ...subscriptionInfo, 
                price: Number(e.target.value)
              })} 
            />
        </div>
        <div className='color-picker-container'>
          <label htmlFor="color-picker">Selecciona un color:</label>
          <input 
            type="color" 
            id="color-picker" 
            name="color" 
            value={subscriptionInfo.color}
            ref={colorPickerRef}
            onInput={(e) => setSubscriptionInfo({
              ...subscriptionInfo, 
              color: e.target.value
            })}  
          />
        </div>
        <div className='type-of-payment-container'>
          <button 
            onClick={() => setSubscriptionInfo({
              ...subscriptionInfo,
              paymentRecurrence: 'Monthly'
            })} 
            type='button'
            className={`${subscriptionInfo.paymentRecurrence === 'Monthly' && 'active'}`}
          >
            Pago mensual
          </button>
          <button 
            onClick={() => setSubscriptionInfo({
              ...subscriptionInfo,
              paymentRecurrence: 'One time'
            })} 
            type='button'
            className={`${subscriptionInfo.paymentRecurrence === "One time" && 'active'}`}
          >
            Un solo pago
          </button>
        </div>
        <div className='date-of-subscription'>
          <label htmlFor="sub-date">Fecha de inicio:</label>
          <input 
            type="date" 
            name="sub-date"
            onInput={(e) => setSubscriptionInfo({
              ...subscriptionInfo,
              date: e.target.value
            })}  
          />
        </div>
        <button
          type='submit' 
          className='submit-button'
        >
          Añadir suscripción
        </button>
      </form>
    </>
  )
}
