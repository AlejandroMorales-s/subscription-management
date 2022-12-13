import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddServiceButton from '../components/feed/AddServiceButton'
import Filters from '../components/feed/filtersZone/Filters'
import Header from '../components/feed/header/Header'
import SubscriptionCard from '../components/feed/subscriptionCard/SubscriptionCard'
import SubscriptionCardLoading from '../components/feed/subscriptionCard/SubscriptionCardLoading'
import { selectSubscriptionsFilterInfo } from '../features/filters/filtersSlice'
import { readUserSubscriptions, selectUserSubscriptionsLoading } from '../features/subscriptions/subscriptionsSlice'
import { selectUserData } from '../features/user/userSlice'

export default function Feed() {
  const dispatch = useDispatch()
  const userData = useSelector(selectUserData)
  const subs = useSelector(selectSubscriptionsFilterInfo)
  const subsLoading = useSelector(selectUserSubscriptionsLoading)

  useEffect(() => {
    dispatch(readUserSubscriptions(userData.uid))
  }, [userData])
  

  return (
    <div style={{minHeight: '100vh',}}>
      <Header/>
      <Filters/>
      <div className='subscriptions-container'>
        {subsLoading && <SubscriptionCardLoading/>}
        {subs.map(sub => {
          return (
            <SubscriptionCard key={sub.id} subscription={sub}/>
          )
        })}
      </div>
      <AddServiceButton/>
    </div>
  )
}
