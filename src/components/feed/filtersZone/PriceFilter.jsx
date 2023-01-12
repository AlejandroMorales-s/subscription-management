import React, { useEffect, useState } from 'react';
//* Icons
import { CgArrowsV } from 'react-icons/cg';
//* React Redux
import { useDispatch, useSelector } from 'react-redux';
//* Filters slice
import {
  modifyPriceFilter,
  selectPriceFilterInfo,
  selectSubscriptionsFilterInfo,
  setTotalAmountToPay,
} from '../../../features/filters/filtersSlice';

export default function PriceFilter() {
  //* States
  let [optionSelectedIndex, setOptionSelectedIndex] = useState(1);

  //* Options
  const options = ['Semanal', 'Mensual', 'Anual'];

  //* Selectors
  const subscriptions = useSelector(selectSubscriptionsFilterInfo);
  const priceFilter = useSelector(selectPriceFilterInfo);

  //* Dispatch
  const dispatch = useDispatch();

  //* Handle price filter
  const handlePriceFilter = () => {
    if (optionSelectedIndex === options.length - 1) {
      setOptionSelectedIndex(0);
      dispatch(
        modifyPriceFilter({
          filterTypeName: options[optionSelectedIndex],
          filterTypeIndex: optionSelectedIndex,
        })
      );
      return;
    }
    setOptionSelectedIndex(optionSelectedIndex + 1);
    dispatch(
      modifyPriceFilter({
        filterTypeName: options[optionSelectedIndex],
        filterTypeIndex: optionSelectedIndex,
      })
    );
  };

  //* Use effect
  useEffect(() => {
    if (subscriptions.length) dispatch(setTotalAmountToPay(subscriptions));

    dispatch(
      modifyPriceFilter({
        filterTypeName: options[optionSelectedIndex],
        filterTypeIndex: optionSelectedIndex,
      })
    );
    // eslint-disable-next-line
  }, [subscriptions, optionSelectedIndex]);

  return (
    <div onClick={handlePriceFilter} className='price-filter-container'>
      <div>
        <p>{priceFilter.filterType}</p>
        <h2>
          $
          {subscriptions.length
            ? priceFilter.newTotalAmountToPayFiltered.toLocaleString()
            : '0'}
        </h2>
      </div>
      <CgArrowsV className='price-filter-icon' />
    </div>
  );
}
