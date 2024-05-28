import axios from 'axios'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Select } from 'antd'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
const { Option } = Select
const CreateProduct = () => {
  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setquantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()
  axios.defaults.baseURL = 'https://scrawny-quirky-asterisk.glitch.me/'
  axios.defaults.withCredentials = true

  const handleCreate = async e => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)
      productData.append('photo', photo)
      productData.append('category', category)
      productData.append('shipping', shipping) // Include the shipping value
      const { data } = await axios.post(
        'api/v1/products/createProduct',
        productData
      )
      if (data) {
        swal('Product Added', '', 'success')
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
  }, [])
  return (
    <Layout title={'Book Store | Create Products'}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h3>Create Product</h3>
            <div className='m-1'>
              <Select
                variant={false}
                placeholder='Select A Category'
                size='large'
                showSearch
                className='form-select mb-3'
                onChange={value => {
                  setCategory(value)
                }}
              >
                {categories.map(c => (
                  <>
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  </>
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
                    setquantity(e.target.value)
                  }}
                />
              </div>
              <div className='mb-3'>
                <h5>Shipping Status</h5>
                <Select
                  variant={false}
                  value={shipping}
                  size='large'
                  showSearch
                  className='form-select mb-3'
                  onChange={value => {
                    setShipping(value)
                  }}
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
                <p> {photo ? photo.name : 'Upload Photo'}</p>
              </div>
              <div className='mb-3'>
                {photo && (
                  <div className='text-center'>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt='Product-photo'
                      height={'200px'}
                      className='img img-responsive'
                    />
                  </div>
                )}
              </div>
              <div className='mb-3'>
                <button className='btn btn-primary ' onClick={handleCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
