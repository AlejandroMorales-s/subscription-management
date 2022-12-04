import React from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'

export default function SubscriptionCard({subscription}) {
  const { name, price, color } = subscription
  return (
    <div className={`subscription-card ${color}`}>
      <h3>{name}</h3>
      <div>
        <h2>${price}</h2>
        <BsThreeDotsVertical className='subscription-card-icon'/>
      </div>
    </div>
  )
}
