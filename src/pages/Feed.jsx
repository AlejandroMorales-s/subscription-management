import React from 'react';
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

export default function Feed() {
  const subscriptionsFiltered = useSelector(selectSubscriptionsFilterInfo);
  const subsLoading = useSelector(selectUserSubscriptionsLoading);
  const modalActive = useSelector(selectModalStatus);

  return (
    <>
      <div style={{ minHeight: '100vh', paddingBottom: '12.5rem' }}>
        <Header />
        <Filters />
        <div className='subscriptions-container'>
          {subsLoading && <SubscriptionCardLoading />}
          {subscriptionsFiltered.length !== undefined &&
            subscriptionsFiltered.map((sub) => {
              return <SubscriptionCard key={sub.id} subscription={sub} />;
            })}
        </div>
        <AddServiceButton />
      </div>
      {modalActive && <Modal />}
    </>
  );
}
