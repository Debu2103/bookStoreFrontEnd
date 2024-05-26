import Layout from '../Layout/Layout'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
axios.defaults.baseURL = 'https://bookstorebackend-vez5.onrender.com/'
axios.defaults.withCredentials = true
const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhoneNo] = useState('')
  const [address, setAddress] = useState('')
  const [answer, setAnswer] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
        phone,
        address,
        answer
      })

      if (response.data.success) {
        toast.success('Registered successfully')
      }
      navigate('/login')
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data)
        console.error('Error response status:', error.response.status)
        console.error('Error response headers:', error.response.headers)
        toast.error(
          `Error: ${error.response.data.message || 'Something went wrong'}`
        )
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request data:', error.request)
        toast.error('No response from server')
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message)
        toast.error('Error: Something went wrong')
      }
    }
  }

  return (
    <Layout title={'Book Store | Register'}>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1 className='title'>Register Form</h1>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              value={name}
              type='text'
              required
              className='form-control'
              id='name'
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input
              value={email}
              type='email'
              required
              className='form-control'
              id='email'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              value={password}
              type='password'
              required
              className='form-control'
              id='password'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='phoneNo' className='form-label'>
              Phone
            </label>
            <input
              value={phone}
              type='text'
              required
              className='form-control'
              id='phoneNo'
              onChange={e => setPhoneNo(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='address' className='form-label'>
              Address
            </label>
            <input
              value={address}
              type='text'
              required
              className='form-control'
              id='address'
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='address' className='form-label'>
              What Is you Favourite Sports?
            </label>
            <input
              value={answer}
              type='text'
              required
              placeholder={'Forgot Password Secret'}
              className='form-control'
              id='answer'
              onChange={e => setAnswer(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
