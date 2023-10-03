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
import OnePlan from '../pages/OnePlan'
import TurnsPage from '../pages/TurnsPage'
import PlanPage from '../pages/PlanPage'
import CatCollaresPage from '../pages/CatCollaresPage'
import CatPlatosPage from '../pages/CatPlatosPage'
import CatJuguetesPage from '../pages/CatJuguetesPage'
import CatCamasPage from '../pages/CatCamasPage'
import CatDestacadosPage from '../pages/CatDestacadosPage'

const RoutesView = () => {
  return (
    <Routes>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/products-destacados' element={<CatDestacadosPage/>}/>
        <Route path='/products-collares' element={<CatCollaresPage/>}/>
        <Route path='/products-platos' element={<CatPlatosPage/>}/>
        <Route path='/products-juguetes' element={<CatJuguetesPage/>}/>
        <Route path='/products-camas' element={<CatCamasPage/>}/>
        <Route path='/turns' element={<TurnsPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/aboutus' element={<AboutUsPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/oneProd/:id' element={<OneProd/>}/>
        <Route path='/onePlan/:id' element={<OnePlan/>}/>
        <Route path='/plan' element={<PlanPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

export default RoutesView