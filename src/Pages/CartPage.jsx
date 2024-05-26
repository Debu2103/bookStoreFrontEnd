import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useCart } from '../Context/cart'
import { useAuth } from '../Context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import dotEnv from 'dotenv'
import axios from 'axios'
const CartPage = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const [clientToken, setClientToken] = useState('')
  const [instance, setInstance] = useState('')
  const [loading, setLoading] = useState(false)
  const removeCartItem = pid => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }

  const getToken = async () => {
    try {
      const { data } = await axios.get('/api/v1/products/braintree/token')
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  const totalPrice = () => {
    try {
      let total = 0
      cart?.map(item => {
        total = total + item.price
      })
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handlePayment = async () => {
    try {
      const {nonce } = await instance.requestPaymentMethod()
      const {data} = await axios.post('/api/v1/products/braintree/payments',{nonce,cart})
      localStorage.removeItem('cart')
      setCart([])
      navigate("/dashboard/user/orders")
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getToken()
  }, [auth?.token])
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <h1 className='text-center bg-light p-2 mb-1'></h1>
          <h4 className='text-center'>
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? '' : 'Please login to checkout'
                }`
              : ' Your Cart Is Empty'}
          </h4>
        </div>
        <div className='row '>
          <div className='col-md-8 '>
            {cart?.map(p => (
              <>
                <div className='row mb-2 card  flex-row'>
                  <div className='col-md-4 mb-2'>
                    <img
                      src={`http://localhost:3002/api/v1/products/photo/${p._id}`}
                      style={{
                        objectFit: 'contain',
                        width: '200px',
                        height: '200px'
                      }}
                      className='card-img-top'
                      alt={p.name}
                      onError={e => {
                        e.target.onerror = null
                        e.target.src = 'fallback-image-url'
                      }}
                    />
                  </div>
                  <div className='col-md-8'>
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 38)}</p>
                    <p>Price: ₹{p.price}</p>
                    <button
                      className='btn btn-danger'
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className='col-md-4 text-center'>
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total :{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className='mb-3'>
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className='btn btn-outline-warning'
                    onClick={() => {
                      navigate('/dashboard/user/profile')
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className='mb-3'>
                {auth?.token ? (
                  <>
                    <button
                      className='btn btn-outline-warning'
                      onClick={() => {
                        navigate('/dashboard/user/profile')
                      }}
                    >
                      Update Address
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className='btn btn-outline-secondary'
                      onClick={() => {
                        navigate('/login', {
                          state: '/cart'
                        })
                      }}
                    >
                      Please Login To check Out
                    </button>
                  </>
                )}
              </div>
            )}
            <div className='mt-2'>
              {!clientToken || !cart?.length ? (
                ''
              ) : (
                <>
                <DropIn
      options={{
        authorization: clientToken,
        googlePay: {
          flow: 'vault',
          // Additional options for Google Pay configuration
          googlePayVersion: 2,
          merchantId: 'f29wnddhcwcb9x4q',
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            currencyCode: 'INR'
          },
          // Card types you want to support
          
        },
        // Other payment options if needed
        paypal: {
          flow: 'vault'
        },
      }}
      onInstance={instance => setInstance(instance)}
    />

                  <button
                    className='btn btn-primary'
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                    
                  >
                    {loading ? 'Processing ....' : 'Make Payment'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
