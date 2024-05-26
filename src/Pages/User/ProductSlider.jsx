import { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const ProductSlider = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    getAllCategories()
    getAllProducts()
  }, [])

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

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/products/getAllProducts')
      if (data?.product) {
        setProducts(data.product)
      } else {
        swal('No products found', '', 'error')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      swal('Error', '', 'error')
    }
  }

  const filterProductsByCategory = async category => {
    setSelectedCategory(category)
    try {
      const { data } = await axios.post('/api/v1/products/productFilters', {
        checked: category,
        radio: '' // Assuming radio is not used for category filtering
      })
      if (data?.products) {
        setProducts(data.products)
      } else {
        swal('No products found for the selected category', '', 'info')
      }
    } catch (error) {
      console.error('Error filtering products:', error)
      swal('Error while filtering products', '', 'error')
    }
  }

  return (
    <div>
      <div className='category-slider'>
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => filterProductsByCategory(category)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className='product-list'>
        <h2>Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProductSlider
