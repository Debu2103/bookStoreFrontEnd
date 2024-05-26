import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/About'
import Contact from './Pages/Contact'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import PageNotFound from './Pages/PageNotFound'
import axios from 'axios'
import Register from './Components/Layout/Register'
import 'react-toastify/dist/ReactToastify.css'
import Login from './Components/Layout/Login'
import Dashboard from './Pages/User/Dashboard'
import PrivateRoute from './Components/Routes/PrivateRoutes'
import AdminRoute from './Components/Routes/AdminRoute'
import Profile from './Pages/User/Profile'

import ForgotPassword from './Pages/ForgotPassword'
// import Orders from './Pages/User/Orders'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import CreateProduct from './Pages/Admin/CreateProduct'
import CreateCategory from './Pages/Admin/CreateCategory'
import AllUsers from './Pages/Admin/AllUsers'
import Products from './Pages/Admin/Products'
import UpdateProduct from './Pages/Admin/UpdateProduct'
import Search from './Pages/Search'
import ProductDetails from './Pages/ProductDetails'
import AllCategories from './Pages/AllCategories'
import CategoryProduct from './Pages/CategoryProduct'
import CartPage from './Pages/CartPage'

axios.defaults.baseURL = 'https://bookstorebackend-vez5.onrender.com/'
axios.defaults.withCredentials = true
// import Layout from "./Components/Layout/Layout"
function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/categories' element={<AllCategories />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
        ====================================Admin
        Routes=================================================
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/createProduct' element={<CreateProduct />} />
          <Route path='admin/createCategory' element={<CreateCategory />} />
          <Route path='admin/users' element={<AllUsers />} />
          <Route path='admin/products' element={<Products />} />
          <Route
            path='admin/updateProducts/:slug'
            element={<UpdateProduct />}
          />
        </Route>
        ==============================privateroutes=================================================
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          {/* <Route path='user/orders' element={<Orders />} /> */}
          <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
