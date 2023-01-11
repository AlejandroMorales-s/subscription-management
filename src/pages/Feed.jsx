import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//* Components
import AddServiceButton from '../components/feed/AddServiceButton';
import Filters from '../components/feed/filtersZone/Filters';
import Header from '../components/feed/header/Header';
import SubscriptionCard from '../components/feed/subscriptionCard/SubscriptionCard';
import SubscriptionCardLoading from '../components/feed/subscriptionCard/SubscriptionCardLoading';
import Modal from '../components/Modal';
//* Selectors
import { selectSubscriptionsFilterInfo } from '../features/filters/filtersSlice';
import { selectModalStatus } from '../features/modal/modalSlice';
import { selectUserSubscriptionsLoading } from '../features/subscriptions/subscriptionsSlice';
//* Custom functions
import getPhaseOfNumberOfDaysForADate from '../utils/numberOfDaysBetweenTwoDates';

export default function Feed() {
  //* States
  const [sortedSubscriptionsFiltered, setSortedSubscriptionsFiltered] =
    useState([]);

  //* Selectors
  const subscriptionsFiltered = useSelector(selectSubscriptionsFilterInfo);
  const subsLoading = useSelector(selectUserSubscriptionsLoading);
  const modalActive = useSelector(selectModalStatus);

  //* Use effect
  useEffect(() => {
    if (subscriptionsFiltered.length) {
      const subsCopy = [...subscriptionsFiltered];
      subsCopy.sort(
        (a, b) =>
          getPhaseOfNumberOfDaysForADate(a.data.date, true) -
          getPhaseOfNumberOfDaysForADate(b.data.date, true)
      );
      setSortedSubscriptionsFiltered(subsCopy);
    }
  }, [subscriptionsFiltered]);

  return (
    <>
      <div style={{ minHeight: '100vh', paddingBottom: '12.5rem' }}>
        <Header />
        <Filters />
        <div className='subscriptions-container'>
          {subsLoading && <SubscriptionCardLoading />}
          {subscriptionsFiltered.length !== undefined &&
            sortedSubscriptionsFiltered.map((sub) => {
              return <SubscriptionCard key={sub.id} subscription={sub} />;
            })}
        </div>
        <AddServiceButton />
      </div>
      {modalActive && <Modal />}
    </>
  );
}
