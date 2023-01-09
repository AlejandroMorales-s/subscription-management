import React, { useState, useEffect } from 'react';
//* Icons
import { IoIosArrowDown } from 'react-icons/io';
//* React Redux
import { useDispatch, useSelector } from 'react-redux';
//* Redux slices
import { subscriptionsFilter } from '../../../features/filters/filtersSlice';
import { selectUserSubscriptions } from '../../../features/subscriptions/subscriptionsSlice';

export default function ServicesTypeFilter() {
  //* States
  const [menuOpen, setMenuOpen] = useState(false);
  const [indexOptionActive, setIndexOptionActive] = useState(0);

  //* Dispatch
  const dispatch = useDispatch();

  //* Selectors
  const subscriptions = useSelector(selectUserSubscriptions);

  //* Options
  const options = ['Todos los servicios', 'Pagados', 'Por pagar'];

  //* Use effect
  useEffect(() => {
    dispatch(
      subscriptionsFilter({
        subscriptions,
        filterIndex: indexOptionActive,
      })
    );
  }, [indexOptionActive, subscriptions]);

  return (
    <div
      onClick={() => setMenuOpen(!menuOpen)}
      className={`services-type-filter-container ${
        menuOpen ? 'menu-filter-type-open' : ''
      }`}
    >
      <h3>{options[indexOptionActive]}</h3>
      <IoIosArrowDown className='services-type-filter-icon' />
      <nav className='services-type-menu'>
        <ul>
          {options.map((option, index) => {
            return (
              <li
                className={`${
                  indexOptionActive === index ? 'option-selected' : ''
                }`}
                onClick={(e) =>
                  setIndexOptionActive(options.indexOf(e.target.innerHTML))
                }
                key={index}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
