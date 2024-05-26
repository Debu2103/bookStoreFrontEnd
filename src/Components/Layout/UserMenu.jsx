import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
      <div className='text-center'>
        <ul className='list-group active'>
          <NavLink
            to='/dashboard/user'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <h4>Your Profile</h4>
          </NavLink>
          <li className='list-group-item '>
            <NavLink
              to='/dashboard/user/profile'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Edit Profile
            </NavLink>
          </li>
          <li className='list-group-item '>
            {/* <NavLink
              to='/dashboard/user/orders'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Orders
            </NavLink> */}
          </li>
        </ul>
      </div>
    </>
  )
}

export default UserMenu
