import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Client from './pages/Client'
import Commande from './pages/Commandes'
import NoPage from './pages/NoPage'
import DrawerLeft from './Components/DrawerLeft'
import Contact from './pages/Contact'
import Welcome from './Welcome/Welcome'

function AllRoute() {
  return (
    <BrowserRouter>
      <div  style={{ textAlign:'center' }}>
        <DrawerLeft />
      <Routes>
      <Route index element={<Welcome />} />
        <Route path="/Client" element={<Client />} />
        <Route path="/Commande" element={<Commande />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />

      </Routes>
     </div>
    </BrowserRouter> 
  )
}

export default AllRoute