import React, { useState } from 'react'
import {IoIosAdd} from 'react-icons/io'

export default function AddServiceButton() {
  const [active, setActive] = useState(false)
  const rotate = () => setActive(!active) 
  return (
    <div onClick={rotate} className='add-service-button'>
      <IoIosAdd className={`add-service-button-icon ${active ? 'button-active' : 'button-inactive'}`}/>
    </div>
  )
}
