import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './user/pages/Login'
import Register from './user/pages/Register'
import Home from './user/pages/Home'
import Admin from './admin/pages/Admin'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<Privateroute />} > */}
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        {/* </Route> */}
      </Routes>
    </>
  )
}

export default App
