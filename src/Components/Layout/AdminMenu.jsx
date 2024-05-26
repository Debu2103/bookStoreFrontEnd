import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
  return (
    <>
      <div className='text-center'>
        <ul className='list-group active'>
          <NavLink
            to='/dashboard/admin'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <h4>Admin Panel</h4>
          </NavLink>
          <li className='list-group-item '>
            <NavLink
              to='/dashboard/admin/createCategory'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Create Categories
            </NavLink>
          </li>
          <li className='list-group-item '>
            <NavLink
              to='/dashboard/admin/createProduct'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Create Products
            </NavLink>
          </li>
          <li className='list-group-item '>
            <NavLink
              to='/dashboard/admin/products'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              All Products
            </NavLink>
          </li>
          {/* <li className='list-group-item '>
            <NavLink
              to='/dashboard/admin/updateProducts'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Update Products
            </NavLink>
          </li> */}
          <li className='list-group-item '>
            <NavLink
              to='/dashboard/admin/users'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              All Users
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default AdminMenu
