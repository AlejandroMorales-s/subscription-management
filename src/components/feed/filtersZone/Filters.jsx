import React from 'react'
import PriceFilter from './PriceFilter'
import ServicesTypeFilter from './ServicesTypeFilter'

export default function Filters() {
  return (
    <div className='filters-container'>
      <ServicesTypeFilter/>
      <PriceFilter/>
    </div>
  )
}
