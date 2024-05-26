import { useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [answer, setAnswer] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  axios.defaults.baseURL = 'https://bookstorebackend-vez5.onrender.com/'
  axios.defaults.withCredentials = true

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/v1/auth/forgotPassword', {
        email,
        newPassword,
        answer
      })

      if (response.data.status === 201) {
        toast.success('Changed Password successfully')
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
    <Layout>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1 className='title'>Forget Password Form</h1>

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
            <label htmlFor='New Password' className='form-label'>
              New Password
            </label>
            <input
              value={newPassword}
              type='text'
              required
              className='form-control'
              id='email'
              onChange={e => setNewPassword(e.target.value)}
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

export default ForgotPassword
