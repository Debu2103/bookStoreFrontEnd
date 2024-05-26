import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const Spinner = ({ path = 'login' }) => {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevValue => --prevValue)
    }, 1000)
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname
      })
    return () => clearInterval(interval)
  }, [count, navigate, path])
  return (
    <>
      <div className='container-fluid'>
        <div
          className='d-flex flex-column justify-content-center align-items-center'
          style={{ height: '100vh' }}
        >
          <h1 className='text-center'>Login To see Content</h1>
          <h1 className='text-center'>Redirecting you in {count} second</h1>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Spinner
