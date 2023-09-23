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
import OneProd from '../pages/OneProd'
import OneService from '../pages/OneService'
import TurnsPage from '../pages/TurnsPage'

const RoutesView = () => {
  return (
    <Routes>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/turns' element={<TurnsPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/aboutus' element={<AboutUsPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/oneProd' element={<OneProd/>}/>
        <Route path='/oneServ' element={<OneService/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

export default RoutesView