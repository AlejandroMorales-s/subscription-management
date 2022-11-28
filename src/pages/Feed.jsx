import React from 'react'
import AddServiceButton from '../components/feed/AddServiceButton'
import Filters from '../components/feed/filtersZone/Filters'
import Header from '../components/feed/header/Header'

export default function Feed() {

  return (
    <div style={{paddingBottom: 3000,}}>
      <Header/>
      <Filters/>
      <AddServiceButton/>
    </div>
  )
}
