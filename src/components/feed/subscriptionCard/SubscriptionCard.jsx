import React from 'react'
import { useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import DeleteSubscriptionModal from './DeleteSubscriptionModal'

export default function SubscriptionCard({subscription}) {
  const { name, price, color } = subscription.data

  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteSubModal, setDeleteSubModal] = useState(false)

  return (
    <>
      <div className={`subscription-card ${color}`}>
        <h3>{name}</h3>
        <div className='subscription-card-price-container'>
          <h2>${price}</h2>
          <BsThreeDotsVertical
            className='subscription-card-icon'
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && 
            <div className='subscription-card-menu'>
              <ul>
                <li>Actualizar información</li>
                <li 
                  onClick={() => {
                    setDeleteSubModal(!deleteSubModal)
                    setMenuOpen(!menuOpen)
                  }}
                >
                  Eliminar servicio
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
      {deleteSubModal &&
        <DeleteSubscriptionModal subscription={subscription} modalOpen={setDeleteSubModal}/>
      }
    </>
  )
}
