import React from 'react'
import { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { selectPriceFilterInfo } from '../../../features/filters/filtersSlice'
import getContrast from '../../../utils/getContrastBetweenTwoColors'
import DeleteSubscriptionModal from './DeleteSubscriptionModal'

export default function SubscriptionCard({subscription}) {
  const { name, price, color } = subscription.data

  //* States
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteSubModal, setDeleteSubModal] = useState(false)
  const [priceController, setPriceController] = useState(price)
  const [textColor, setTextColor] = useState('#000000')
  
  //* Selectors
  const filterInfo = useSelector(selectPriceFilterInfo) 
  
  //* Use effect
  useEffect(() => {
    if (filterInfo.filterType ==='Semanal') setPriceController(price / 4)
    else if (filterInfo.filterType ==='Mensual') setPriceController(price)
    else if (filterInfo.filterType ==='Anual') setPriceController(price * 12)
  
    if (getContrast(color) > 10) setTextColor('#000000')
    else setTextColor('#ffffff')
  }, [filterInfo.filterType])


  return (
    <>
      <div 
        style={{backgroundColor: color}}
        className='subscription-card'
      >
        <h3 style={{color: textColor}}>{name}</h3>
        <div className='subscription-card-price-container'>
          <h2 style={{color: textColor}}>${priceController}</h2> 
          <BsThreeDotsVertical
            style={{fill: textColor}}
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
