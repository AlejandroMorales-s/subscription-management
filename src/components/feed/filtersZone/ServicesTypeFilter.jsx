import React, { useState } from 'react'
import { useEffect } from 'react'
import {IoIosArrowDown} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { subscriptionsFilter } from '../../../features/filters/filtersSlice'
import { selectUserSubscriptions } from '../../../features/subscriptions/subscriptionsSlice'

export default function ServicesTypeFilter() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [indexOptionActive, setIndexOptionActive] = useState(0)

  const dispatch = useDispatch()

  const subscriptions = useSelector(selectUserSubscriptions)

  const options = ['Todos los servicios', 'Pagados', 'Por pagar']
  
  const handleMenu = () => setMenuOpen(!menuOpen)
  const handleMenuOption = (e) => 
    setIndexOptionActive(options.indexOf(e.target.innerHTML))
  
  useEffect(() => {
    dispatch(subscriptionsFilter({
      subscriptions, 
      filterIndex: indexOptionActive
    }))
  }, [indexOptionActive, subscriptions])
  
  return (
    <div 
      onClick={handleMenu} 
      className={`services-type-filter-container ${menuOpen ? 'menu-filter-type-open' : ''}`}
    >
      <h3>{options[indexOptionActive]}</h3>
      <IoIosArrowDown className='services-type-filter-icon'/>
      <nav className='services-type-menu'>
        <ul>
          {options.map((option, index) => {
            return (
              <li 
                className={`${indexOptionActive === index ? 'option-selected' : ''}`} 
                onClick={handleMenuOption} 
                key={index}
              >
                {option}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
