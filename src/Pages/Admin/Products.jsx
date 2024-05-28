import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useState, useEffect } from 'react'
import swal from 'sweetalert'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([])
  axios.defaults.baseURL = 'https://scrawny-quirky-asterisk.glitch.me/'
  axios.defaults.withCredentials = true

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/products/getAllProducts')
      console.log('API Response:', data) // Log the response for debugging
      if (data?.product) {
        setProducts(data.product)
        // swal('All Products shown', '', 'success')
      } else {
        swal('No products found', '', 'warning')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      swal('Error', '', 'error')
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          <div className='product-container'>
            {products.length > 0 ? (
              products.map(p => (
                <>
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/updateProducts/${p.slug}`}
                    className='product-link'
                  >
                    <div
                      className='card m-2'
                      style={{ width: '18rem' }}
                      key={p._id}
                    >
                      <img
                        src={`https://scrawny-quirky-asterisk.glitch.me/api/v1/products/photo/${p._id}`}
                        className='card-img-top'
                        alt={p.name}
                        onError={e => {
                          e.target.onerror = null
                          e.target.src = 'fallback-image-url'
                        }} // Optional: handle image load errors
                        style={{ objectFit: 'contain' }}
                      />
                      <div className='card-body'>
                        <h5 className='card-title' style={{ fontSize: '15px' }}>
                          {p.name}
                        </h5>
                        <p className='card-text ' style={{ fontSize: '10px' }}>
                          {p.description}
                        </p>
                        <a href='#' className='btn btn-primary'>
                          Update Products
                        </a>
                      </div>
                    </div>
                  </Link>
                </>
              ))
            ) : (
              <p className='text-center'>No products found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products
