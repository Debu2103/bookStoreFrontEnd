import axios from 'axios'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Select } from 'antd'
import swal from 'sweetalert'
import { useNavigate, useParams } from 'react-router-dom'

const { Option } = Select

const UpdateProduct = () => {
  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [category, setCategory] = useState('')
  const [id, setId] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  axios.defaults.baseURL = 'https://scrawny-quirky-asterisk.glitch.me/'
  axios.defaults.withCredentials = true
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/getSingleProduct/${params.slug}`
      )
      setName(data.product.name)
      setId(data.product._id)
      setCategory(data.product.category._id)
      // setPhoto(data.product.photo);
      setDescription(data.product.description)
      setQuantity(data.product.quantity)
      setShipping(data.product.shipping)
      setPrice(data.product.price)
      setPhoto(data.product.photo)
      console.log(photo)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async e => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)
      photo && productData.append('photo', photo)
      productData.append('category', category)
      const { data } = await axios.put(
        `api/v1/products/updateProduct/${id}`,
        productData
      )
      if (data) {
        swal('Product Updated', '', 'success')
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error)
      swal('Something went wrong', 'Error')
    }
  }

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/getAllCategory')
      if (data?.success === true) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error While Fetching Categories')
    }
  }

  useEffect(() => {
    getAllCategories()
    getSingleProduct()
  }, [])

  const handleDelete = async () => {
    try {
      let answer = window.prompt('Are you sure you want to delete this product')
      if (!answer) return
      if (answer == 'yes') {
        const { data } = await axios.delete(
          `/api/v1/products/deleteProduct/${id}`
        )
        swal('success', '', 'success')
        console.log(data)
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error)
      swal('error', '', 'error')
    }
  }
  return (
    <>
      <Layout title={'Book Store | Update Product'}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <h3>Update Product</h3>
              <div className='m-1'>
                <Select
                  variant={true}
                  placeholder='Select A Category'
                  size='large'
                  showSearch
                  className='form-select mb-3'
                  onChange={value => {
                    setCategory(value)
                  }}
                  value={category}
                >
                  {categories.map(c => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div className='mb-3'>
                  <input
                    type='text'
                    value={name}
                    placeholder='Write A Name For Product'
                    className='form-control'
                    onChange={e => {
                      setName(e.target.value)
                    }}
                  />
                </div>
                <div className='mb-3'>
                  <textarea
                    type='text'
                    value={description}
                    placeholder='Write A Description For Product'
                    className='form-control'
                    onChange={e => {
                      setDescription(e.target.value)
                    }}
                  ></textarea>
                </div>
                <div className='mb-3'>
                  <input
                    type='number'
                    value={price}
                    placeholder='Product Price'
                    className='form-control'
                    onChange={e => {
                      setPrice(e.target.value)
                    }}
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type='text'
                    value={quantity}
                    placeholder='Product Quantity'
                    className='form-control'
                    onChange={e => {
                      setQuantity(e.target.value)
                    }}
                  />
                </div>
                <div className='mb-3'>
                  <h5>Shipping Status</h5>
                  <Select
                    bordered={false}
                    size='large'
                    showSearch
                    className='form-select mb-3'
                    onChange={value => {
                      setShipping(value)
                    }}
                    value={shipping ? 'Yes' : 'No'}
                  >
                    <Option value='0'>No</Option>
                    <Option value='1'>Yes</Option>
                  </Select>
                </div>

                <div className='mb-3'>
                  <input
                    type='file'
                    name='photo'
                    accept='image/jpg '
                    onChange={e => setPhoto(e.target.files[0])}
                    className='custom-file-input '
                  />
                  <p>{photo ? photo.name : 'Upload Photo'}</p>
                </div>
                <div className='container'>
                  <img
                    src={photo}
                    alt=''
                    width={'200px'}
                    className='img img-responsive'
                  />
                </div>

                <div className='mb-3'>
                  <button className='btn btn-primary' onClick={handleUpdate}>
                    Update Product
                  </button>
                  <button className='btn btn-danger' onClick={handleDelete}>
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default UpdateProduct
