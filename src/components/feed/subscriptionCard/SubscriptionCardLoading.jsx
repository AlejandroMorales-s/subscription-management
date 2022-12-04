import React from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'

export default function SubscriptionCardLoading() {
  return (
    <>
      <div className='subscription-card-loading'>
        <div className='subscription-card-loading-name'></div>
        <div className='subscription-card-loading-price-container'>
          <div></div>
          <BsThreeDotsVertical className='subscription-card-loading-icon'/>
        </div>
      </div>
      <div className='subscription-card-loading'>
        <div className='subscription-card-loading-name'></div>
        <div className='subscription-card-loading-price-container'>
          <div></div>
          <BsThreeDotsVertical className='subscription-card-loading-icon'/>
        </div>
      </div>
      <div className='subscription-card-loading'>
        <div className='subscription-card-loading-name'></div>
        <div className='subscription-card-loading-price-container'>
          <div></div>
          <BsThreeDotsVertical className='subscription-card-loading-icon'/>
        </div>
      </div>
    </>
  )
}
