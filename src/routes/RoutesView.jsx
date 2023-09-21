import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'
import RegisterPage from '../pages/RegisterPage'
import AboutUsPage from '../pages/AboutUsPage'
import LoginPage from '../pages/LoginPage'

const RoutesView = () => {
  return (
    <Routes>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/aboutus' element={<AboutUsPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

export default RoutesView