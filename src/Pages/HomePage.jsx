import { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../Context/auth.jsx'
import axios from 'axios'
import swal from 'sweetalert'
import { Checkbox, Radio } from 'antd'
import { prices } from '../Components/Prices.jsx'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/cart.jsx'
const HomePage = () => {
  axios.defaults.baseURL = 'https://bookstorebackend-vez5.onrender.com/'
  axios.defaults.withCredentials = true

  const [cart, setCart] = useCart()
  const [auth] = useAuth()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [radio, setRadio] = useState([])
  const [checked, setChecked] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const Navigate = useNavigate()

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/products/productList/${page}`)
      setLoading(false)
      if (data?.products) {
        setProducts(data.products)
        setTotal(data.total) // Update total count of products
      } else {
        swal('No products found', '', 'error')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      swal('Error', '', 'error')
    }
  }

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/getAllCategory')
      if (data.success === true) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
      swal('Error While Fetching Categories', '', 'error')
    }
  }

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/products/productCount')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFilter = (value, id) => {
    if (value) {
      setChecked([...checked, id])
    } else {
      setChecked(checked.filter(c => c !== id))
    }
  }
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('/api/v1/products/productFilters', {
        checked,
        radio
      })
      if (data?.products) {
        setProducts(data.products)
      } else {
        swal('No products found for the selected filters', '', 'info')
      }
    } catch (error) {
      console.error('Error filtering products:', error)
      swal('Error while filtering products', '', 'error')
    }
  }

  useEffect(() => {
    getAllProducts()
    getAllCategories()
    getTotal()
  }, [auth])

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct()
    } else {
      getAllProducts()
    }
  }, [checked, radio])
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/products/productList/${page}`)
      setLoading(false)
      setProducts([...products, ...data.products])
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  return (
    <Layout title={'Book Store | Home'}>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column'>
            {categories?.map(c => (
              <Checkbox
                key={c._id}
                onChange={e => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className='text-center'>Filter By Price</h4>
          <div className='d-flex flex-column mt-4'>
            <Radio.Group onChange={e => setRadio(e.target.value.array)}>
              {prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-column mt-4'>
            <button
              className='btn btn-danger'
              onClick={() => {
                window.location.reload()
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products.length > 0 ? (
              products.map(p => (
                <div
                  className='card m-2'
                  style={{ width: '18rem' }}
                  key={p._id}
                >
                  <img
                    src={`https://bookstorebackend-vez5.onrender.com/api/v1/products/photo/${p._id}`}
                    style={{ objectFit: 'contain' }}
                    className='card-img-top'
                    alt={p.name}
                    onError={e => {
                      e.target.onerror = null
                      e.target.src = 'fallback-image-url'
                    }}
                  />
                  <div className='card-body'>
                    <h5 className='card-title' style={{ fontSize: '15px' }}>
                      {p.name}
                    </h5>
                    <p className='card-text ' style={{ fontSize: '10px' }}>
                      {p.description}
                    </p>
                    <p className='card-text'>₹{p.price}</p>

                    <button
                      className='btn btn-primary 
                    ms-1'
                      onClick={() => Navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className='btn btn-secondary ms-1'
                      onClick={() => {
                        setCart([...cart, p])
                        localStorage.setItem(
                          'cart',
                          JSON.stringify([...cart, p])
                        )
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center'>No products found</p>
            )}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button
                className='btn btn-warning'
                onClick={e => {
                  e.preventDefault()
                  setPage(page + 1)
                }}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
