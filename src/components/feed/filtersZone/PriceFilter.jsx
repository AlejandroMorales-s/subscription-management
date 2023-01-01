import React, { useEffect, useState } from 'react'
import {CgArrowsV} from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { 
  modifyPriceFilter, 
  selectPriceFilterInfo, 
  selectSubscriptionsFilterInfo, 
  setTotalAmountToPay 
} from '../../../features/filters/filtersSlice'

export default function PriceFilter() {
  let [optionSelectedIndex, setOptionSelectedIndex] = useState(1)

  const options = ['Semanal', 'Mensual', 'Anual']
  const subscriptions = useSelector(selectSubscriptionsFilterInfo)
  const priceFilter = useSelector(selectPriceFilterInfo)
  const dispatch = useDispatch()

  const handlePriceFilter = () => {
    if (optionSelectedIndex === (options.length - 1)) {
      setOptionSelectedIndex(0)
      dispatch(modifyPriceFilter({
        filterTypeName: options[optionSelectedIndex],
        filterTypeIndex: optionSelectedIndex  
      }))
      return
    }
    setOptionSelectedIndex(optionSelectedIndex + 1)
    dispatch(modifyPriceFilter({
      filterTypeName: options[optionSelectedIndex],
      filterTypeIndex: optionSelectedIndex  
    }))
  }
  
  useEffect(() => {
    if (subscriptions.length)
      dispatch(setTotalAmountToPay(subscriptions))
    
    dispatch(modifyPriceFilter({
      filterTypeName: options[optionSelectedIndex],
      filterTypeIndex: optionSelectedIndex  
    }))
  }, [subscriptions, optionSelectedIndex])


  return (
    <div onClick={handlePriceFilter} className='price-filter-container'>
      <div>
        <p>{priceFilter.filterType}</p>
        <h2>${priceFilter.newTotalAmountToPayFiltered.toLocaleString()}</h2>
      </div>
      <CgArrowsV className='price-filter-icon'/>
    </div>
  )
}
