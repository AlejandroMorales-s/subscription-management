import React, { useState } from 'react'
import {IoIosAdd} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

export default function AddServiceButton() {
  const [active, setActive] = useState(false)
  const navigate = useNavigate()
  const rotate = () => {
    setActive(!active)
    navigate('/add-subscription')
  } 
  return (
    <div onClick={rotate} className='add-service-button'>
      <IoIosAdd className={`add-service-button-icon ${active ? 'button-active' : 'button-inactive'}`}/>
    </div>
  )
}
