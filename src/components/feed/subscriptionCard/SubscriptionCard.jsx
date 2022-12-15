import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { selectPriceFilterInfo } from '../../../features/filters/filtersSlice'
import DeleteSubscriptionModal from './DeleteSubscriptionModal'

export default function SubscriptionCard({subscription}) {
  const { name, price, color } = subscription.data

  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteSubModal, setDeleteSubModal] = useState(false)
  const [priceController, setPriceController] = useState(price)

  const filterInfo = useSelector(selectPriceFilterInfo) 

  useEffect(() => {
    if (filterInfo.filterType ==='Semanal') setPriceController(price / 4)
    else if (filterInfo.filterType ==='Mensual') setPriceController(price)
    else if (filterInfo.filterType ==='Anual') setPriceController(price * 12)
  }, [filterInfo.filterType])


  return (
    <>
      <div className={`subscription-card ${color}`}>
        <h3>{name}</h3>
        <div className='subscription-card-price-container'>
          <h2>${priceController}</h2> 
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
