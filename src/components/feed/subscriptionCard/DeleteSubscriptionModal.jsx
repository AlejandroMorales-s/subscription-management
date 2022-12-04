import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSubscription } from '../../../features/subscriptions/subscriptionsSlice'
import { selectUserData } from '../../../features/user/userSlice'

export default function DeleteSubscriptionModal({subscription, modalOpen}) {
  const {name} = subscription.data

  const userId = useSelector(selectUserData)
  const dispatch = useDispatch()
  
  return (
    <div className='delete-sub-modal-container'>
      <div className='delete-sub-modal'>
        <h3>Desea eliminar {name}? Este proceso es irreversible</h3>
        <div className='delete-sub-modal-buttons-container'>
          <button 
            className='delete-sub-modal-button'
            onClick={() => modalOpen(false)}
          >
            Cancelar
          </button>
          <button
            className='delete-sub-modal-button'
            onClick={() => dispatch(deleteSubscription({
              uid: userId.uid,
              subscriptionId: subscription.id
            }))}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
