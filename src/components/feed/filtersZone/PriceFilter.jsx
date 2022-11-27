import React from 'react'
import {CgArrowsV} from 'react-icons/cg'

export default function PriceFilter() {
  return (
    <div className='price-filter-container'>
      <div>
        <p>Mensual</p>
        <h2>$100</h2>
      </div>
      <CgArrowsV className='price-filter-icon'/>
    </div>
  )
}
