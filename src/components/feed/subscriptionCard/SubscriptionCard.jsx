import React from 'react'
import { useEffect, useState, useRef } from 'react'
import Draggable from 'react-draggable'
//* Icons
import {AiFillDelete} from 'react-icons/ai'
import {MdPaid} from 'react-icons/md'
//* Redux
import { useSelector } from 'react-redux'
//* Selectors
import { selectPriceFilterInfo } from '../../../features/filters/filtersSlice'
//* Custom function
import getContrast from '../../../utils/getContrastBetweenTwoColors'
//* Components
import DeleteSubscriptionModal from './DeleteSubscriptionModal'

export default function SubscriptionCard({subscription}) {
  const { name, price, color } = subscription.data

  //* States
  const [deleteSubModal, setDeleteSubModal] = useState(false)
  const [priceController, setPriceController] = useState(price)
  const [textColor, setTextColor] = useState('#000000')
  const [draggingMode, setDraggingMode] = useState('')

  //* Refs
  const subscriptionCardRef = useRef(null)
  const subscriptionCardContainerRef = useRef(null)

  //* Handle dragged card action
  const handleDraggedCard = (e, data) => {
    const draggedDistance = data.x

    if (draggedDistance > 140) console.log('pagada') 
    else if (draggedDistance < -140) setDeleteSubModal(!deleteSubModal) 
  }

  //* Handle card background
  const handleCardBackground = (e, data) => {
    const draggingValue = data.x

    if (draggingValue > 0) setDraggingMode('editing-subscription')
    else setDraggingMode('deleting-subscription')
  }
  
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
      <div ref={subscriptionCardContainerRef} className={`subscription-card-container ${draggingMode}`}>
        {draggingMode === 'editing-subscription'?
          <div className='sub-bg-icon-container'>
            <MdPaid className='sub-bg-icon'/> 
            <p className='sub-icon-text'>Pagada</p>
          </div>
        :
          <div className='sub-bg-icon-container'>
            <AiFillDelete className='sub-bg-icon'/> 
            <p className='sub-icon-text'>Eliminar</p>
          </div>
        }
        <Draggable
          position={{x: 0, y: 0}}
          nodeRef={subscriptionCardRef} 
          axis='x' 
          onStop={handleDraggedCard}
          onDrag={handleCardBackground}
        >
          <div 
            style={{backgroundColor: color}}
            className='subscription-card'
            ref={subscriptionCardRef}
          >
            <h3 style={{color: textColor}}>{name}</h3>
            <h2 style={{color: textColor}}>${priceController.toLocaleString()}</h2> 
          </div>
        </Draggable>
      </div>
      {deleteSubModal &&
        <DeleteSubscriptionModal subscription={subscription} modalOpen={setDeleteSubModal}/>
      }
    </>
  )
}
