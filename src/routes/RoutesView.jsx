import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'
import RegisterPage from '../pages/RegisterPage'
import AboutUsPage from '../pages/AboutUsPage'
import LoginPage from '../pages/LoginPage'
import ContactPage from '../pages/ContactPage'
import ProductsPage from '../pages/ProductsPage'
import AdminPage from '../pages/AdminPage'
import CartPage from '../pages/CartPage'

const RoutesView = () => {
  return (
    <Routes>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/aboutus' element={<AboutUsPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
    </Routes>
  )
}

export default RoutesView