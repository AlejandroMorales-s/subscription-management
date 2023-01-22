import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubscriptionsInFilter } from '../../../features/filters/filtersSlice';
import { selectUserSubscriptions } from '../../../features/subscriptions/subscriptionsSlice';
import { BsArrowReturnLeft } from 'react-icons/bs';

export default function NameFilter() {
  //* States
  const [itemsFiltered, setItemsFiltered] = useState([]);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [returnSubscriptionsIcon, setReturnSubscriptionsIcon] = useState(false);

  //* Refs
  const inputName = useRef(null);

  //* Dispatch
  const dispatch = useDispatch();

  //* Selectors
  const subscriptions = useSelector(selectUserSubscriptions);

  //* Filter dropdown subscriptions
  const filterDropdownSubscriptions = (currentInput) =>
    subscriptions.filter((sub) =>
      sub.data.name.toLowerCase().includes(currentInput.toLowerCase())
    );

  //* Filter subscriptions in state
  const filterSubsState = (subName) => {
    const subscription = subscriptions.find(
      (subscription) => subscription.data.name === subName
    );
    dispatch(setSubscriptionsInFilter(subscription));
    setReturnSubscriptionsIcon(true);
  };

  //* Return subscriptions to state
  const returnSubscriptionsToFilter = () => {
    dispatch(setSubscriptionsInFilter(subscriptions));
    setReturnSubscriptionsIcon(false);
  };

  return (
    <div className='name-filter-container'>
      <input
        type='text'
        className='name-filter-input'
        ref={inputName}
        onInput={(e) => {
          setItemsFiltered(filterDropdownSubscriptions(e.target.value));
          if (e.target.value.length === 0) setShowItemsDropdown(false);
          else setShowItemsDropdown(true);
        }}
      />
      {showItemsDropdown && itemsFiltered.length !== 0 && (
        <div className='name-filter-items-filtered'>
          <ul>
            {itemsFiltered.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={(e) => {
                    inputName.current.value = e.target.innerText;
                    setShowItemsDropdown(false);
                    filterSubsState(e.target.innerText);
                  }}
                >
                  {item.data.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {returnSubscriptionsIcon && (
        <BsArrowReturnLeft
          onClick={returnSubscriptionsToFilter}
          className='name-filter-return-icon'
        />
      )}
    </div>
  );
}
