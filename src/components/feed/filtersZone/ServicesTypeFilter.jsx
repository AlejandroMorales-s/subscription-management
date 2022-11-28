import React, { useState } from 'react'
import {IoIosArrowDown} from 'react-icons/io'

export default function ServicesTypeFilter() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [indexOptionActive, setIndexOptionActive] = useState(0)

  const options = ['Todos los servicios', 'Pagados', 'Por pagar']
  
  const handleMenu = () => setMenuOpen(!menuOpen)
  const handleMenuOption = (e) => 
    setIndexOptionActive(options.indexOf(e.target.innerHTML))
  
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
