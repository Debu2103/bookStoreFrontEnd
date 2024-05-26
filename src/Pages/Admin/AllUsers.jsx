import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'

const AllUsers = () => {
  return (
    <Layout title={'Book Store | All Users'}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>All Users</div>
        </div>
      </div>
    </Layout>
  )
}

export default AllUsers
