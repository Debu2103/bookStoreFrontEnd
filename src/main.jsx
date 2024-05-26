import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import './index.css'
import 'antd/dist/reset.css'

import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/auth.jsx'
import { SearchProvider } from './Context/search.jsx'
import { CartProvider } from './Context/cart.jsx'
axios.defaults.baseURL = 'https://bookstorebackend-vez5.onrender.com/'
axios.defaults.withCredentials = true
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
)
