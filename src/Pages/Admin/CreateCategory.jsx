import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../../Components/Form/CategoryForm'
import swal from 'sweetalert'
import { Modal } from 'antd'
const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedCatName, setUpdatedCatName] = useState('')

  axios.defaults.baseURL = 'https://scrawny-quirky-asterisk.glitch.me/'
  axios.defaults.withCredentials = true

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/getAllCategory')
      if (data.success === true) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error While Fetching Categories')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/v1/category/createCategory', {
        name
      })
      if (data?.success === true) {
        swal({
          title: 'Category Created',
          icon: 'success'
        })
        getAllCategories()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  const handleUpdate = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `/api/v1/category/updateCategory/${selected._id}`,
        { name: updatedCatName },
        { new: true }
      )
      if (data.success === true) {
        swal({
          title: 'Category Updated',
          icon: 'success'
        })
        setSelected(null)
        setUpdatedCatName('')
        setVisible(false)
        getAllCategories()
      }
    } catch (e) {
      console.log(e)
      swal({
        title: 'Errorf',
        icon: 'error'
      })
    }
  }
  const handleDelete = async id => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/deleteCategory/${id}`
      )
      if (data.success === true) {
        swal({
          title: 'Category Deleted',
          icon: 'success'
        })
        getAllCategories()
      }
    } catch (e) {
      console.log(e)
      swal({
        title: 'Errorf',
        icon: 'error'
      })
    }
  }
  return (
    <Layout title={'Book Store | Create Category'}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage Category</h1>
            <div className='p-3'>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className='w-75'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map(c => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className='btn btn-primary mx-2'
                            onClick={() => {
                              {
                                setVisible(true)
                              }
                              setUpdatedCatName(c.name)
                              setSelected(c)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className='btn btn-danger mx-2'
                            onClick={() => {
                              {
                                handleDelete(c._id)
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => {
              setVisible(false)
            }}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updatedCatName}
              setValue={setUpdatedCatName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
