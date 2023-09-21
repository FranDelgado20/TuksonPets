import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'
import RegisterPage from '../pages/RegisterPage'

const RoutesView = () => {
  return (
    <Routes>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

export default RoutesView