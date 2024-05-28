import Layout from '../Layout/Layout'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/auth'
axios.defaults.baseURL = 'https://scrawny-quirky-asterisk.glitch.me/'
axios.defaults.withCredentials = true

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const [auth, setAuth] = useAuth()
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password
      })

      if (response.data.success) {
        console.log('LOgin response Data', response.data)
        toast.success('Login successfully')
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token
        })
        localStorage.setItem('auth', JSON.stringify(response.data))
        navigate(location.state || '/')
      } else {
        // console.log(error)
        toast.error('Error')
      }
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
    <Layout title={'Book Store | Login'}>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1 className='title'>Login</h1>

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
            <button type='submit' className='btn btn-primary button2'>
              Submit
            </button>
          </div>

          <button
            type='submit'
            style={{ backgroundColor: 'burlywood !important' }}
            className='btn btn-success mt-3 btn1'
            onClick={() => {
              navigate('/forgotPassword')
            }}
          >
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
