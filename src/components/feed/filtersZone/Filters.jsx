import React from 'react';
import NameFilter from './NameFilter';
import PriceFilter from './PriceFilter';
import ServicesTypeFilter from './ServicesTypeFilter';

export default function Filters() {
  return (
    <div className='filters-container'>
      <div>
        <ServicesTypeFilter />
        <PriceFilter />
      </div>
      <NameFilter />
    </div>
  );
}
