import React, { useState } from 'react'
import {CgArrowsV} from 'react-icons/cg'

export default function PriceFilter() {
  let [optionSelectedIndex, setOptionSelectedIndex] = useState(1)

  const options = ['Semanal', 'Mensual', 'Anual']

  const handlePriceFilter = () => {
    if (optionSelectedIndex === (options.length - 1)) {
      setOptionSelectedIndex(0)
      return
    }
    setOptionSelectedIndex(optionSelectedIndex + 1)
  }

  return (
    <div onClick={handlePriceFilter} className='price-filter-container'>
      <div>
        <p>{options[optionSelectedIndex]}</p>
        <h2>$100</h2>
      </div>
      <CgArrowsV className='price-filter-icon'/>
    </div>
  )
}
