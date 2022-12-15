import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../../features/user/userSlice'
import HamburgerMenu from './HamburgerMenu'

export default function Header() {
  const [currentTime, setCurrentTime] = useState('')

  const userInfo = useSelector(selectUserData)
  
  const actualHour = new Date().getHours()
  
  useEffect(() => {
    if(actualHour >= 4 && actualHour < 12) 
      setCurrentTime('Buenos días')
    else if(actualHour >= 12 && actualHour < 20) 
      setCurrentTime('Buenas tardes')
    else 
      setCurrentTime('Buenas noches')
  }, [])

  return (
    <header className='header-container'>
      <h2>{currentTime}, {userInfo.displayName}</h2>
      <HamburgerMenu/>
    </header>
  )
}
