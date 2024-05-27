import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryProduct = () => {
  const params = useParams()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const Navigate = useNavigate()
  const getProdByCat = async () => {
    try {
      const { data } = await axios.get(
        `api/v1/products/productCategory/${params.slug}`
      )
      setProducts(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (params?.slug) getProdByCat()
  }, [params?.slug])
  return (
    <Layout>
      <div className='container mt-3'>
        <h4 className='text-center'>Category - {category?.name}</h4>
        <h6 className='text-center'>{products?.length} results found </h6>
        <div className='row'>
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
                  </div>
                </div>
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

export default CategoryProduct
