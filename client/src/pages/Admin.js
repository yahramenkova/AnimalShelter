import React from 'react'
import Header from '../components/header/header'
import AdminBlock from '../components/adminBlock/adminBlock'
import Accordion from '../components/adminBlock/accordionAdmin'

function Admin() {
  return (
    <div>
     <Header/> 
     <AdminBlock />
     <Accordion/>
    </div>
  )
}

export default Admin
