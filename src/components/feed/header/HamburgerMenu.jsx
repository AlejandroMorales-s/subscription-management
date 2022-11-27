import React, { useState } from 'react'
import {BiMenu} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, selectIsSubmitting } from '../../../features/user/userSlice'
import Spinner from '../../Spinner'

export default function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectIsLoading = useSelector(selectIsSubmitting)

  const handleMenuStatus = () => setMenuOpen(!menuOpen)
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className='hamburger-menu-container'>
      <BiMenu onClick={handleMenuStatus} className={`hamburger-menu-icon ${menuOpen && 'hamburger-menu-active'}`}/>
      <nav className={`hamburger-menu ${menuOpen ? 'menu-open' : 'menu-closed'}`}>
        <ul>
          <li>
            <p>Cuenta</p>
          </li>
          <li>
            <p>Métodos de pago</p>
          </li>
          <li onClick={handleLogout}>
            {selectIsLoading ? 
              <Spinner/>
            :
              <p>Cerrar sesión</p>
            }
          </li>
        </ul>
      </nav>
    </div>
  )
}
