import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../../features/user/userSlice'
import HamburgerMenu from './HamburgerMenu'

export default function Header() {
  const [currentTime, setCurrentTime] = useState('')

  const userInfo = useSelector(selectUserData)
  
  const actualHour = new Date()
  
  useEffect(() => {
      if(actualHour.getHours() >= 4 && actualHour.getHours() < 12) setCurrentTime('Buenos dias')
      else if(actualHour.getHours() >= 12 && actualHour.getHours() < 20) setCurrentTime('Buenas tardes')
      else setCurrentTime('Buenas noches')
  }, [])

  return (
    <header className='header-container'>
      <h2>{currentTime}, {userInfo.displayName}</h2>
      <HamburgerMenu/>
    </header>
  )
}
