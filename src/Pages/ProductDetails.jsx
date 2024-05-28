import Layout from '../Components/Layout/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/cart'

const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const navigate = useNavigate()
  const [cart, setCart] = useCart()

  useEffect(() => {
    if (params?.slug) {
      getProduct()
    }
  }, [params.slug])

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/getSingleProduct/${params.slug}`
      )
      setProduct(data?.product)
      getSimilarProducts(data?.product._id, data?.product.category._id)
    } catch (error) {
      console.log(error)
    }
  }

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/relatedProducts/${pid}/${cid}`
      )
      setRelatedProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddToCart = () => {
    setCart([...cart, product])
    localStorage.setItem('cart', JSON.stringify([...cart, product]))
  }

  return (
    <Layout>
      <div className='row container mt-2'>
        <div className='col-md-6'>
          <img
            src={`https://scrawny-quirky-asterisk.glitch.me/api/v1/products/photo/${product._id}`}
            className='card-img-top'
            alt={product.name}
            onError={e => {
              e.target.onerror = null
              e.target.src = 'fallback-image-url'
            }}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className='col-md-6'>
          <h1 className='text-center'>Product Details</h1>
          <h5>Name : {product.name}</h5>
          <h5>Description : {product.description}</h5>
          <h5>Price : ₹{product.price}</h5>
          <h5>Category : {product.category?.name}</h5>
          <button className='btn btn-secondary ms-1' onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
      <div className='row '>
        <h3 className='text-center mt-5'>Similar Products</h3>
        <div className='d-flex flex-wrap'>
          {relatedProducts.length > 0 ? (
            relatedProducts.map(p => (
              <div className='card m-2' style={{ width: '18rem' }} key={p._id}>
                <img
                  src={`https://scrawny-quirky-asterisk.glitch.me/api/v1/products/photo/${p._id}`}
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
                    className='btn btn-primary ms-1'
                    onClick={() => navigate(`/product/${p.slug}`)}
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
    </Layout>
  )
}

export default ProductDetails
