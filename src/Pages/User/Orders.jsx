// import { useEffect, useState } from 'react'
// import Layout from '../../Components/Layout/Layout'
// import UserMenu from '../../Components/Layout/UserMenu'
// import axios from 'axios'
// import { useAuth } from '../../Context/auth'
// import moment from 'moment'

// const Orders = () => {
//   const [auth, setAuth] = useAuth()
//   const [orders, setOrders] = useState([])
//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get('/api/v1/auth/orders')
//       setOrders(data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     if (auth?.token) getOrders()
//   }, [auth?.token])
//   return (
//     <Layout title={'Your Orders'}>
//       <div className='container-fluid p-3 m-3'>
//         <div className='row'>
//           <div className='col-md-3'>
//             <UserMenu />
//           </div>
//           <div className='col-md-9'>
//             <h1>All Orders</h1>
//             {orders?.map((o, i) => {
//               return (
//                 <>
//                   <div className='border shadow'>
//                     <table className='table'>
//                       <thead>
//                         <tr>
//                           <th scope='col'>#</th>
//                           <th scope='col'>Status</th>
//                           <th scope='col'>Buyer</th>
//                           <th scope='col'>Payment</th>
//                           <th scope='col'>Quantity</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>{i + 1}</td>
//                           <td>{o?.status}</td>
//                           <td>{o?.buyer?.name}</td>

//                           <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
//                           <td>{o?.products?.length}</td>
//                         </tr>
//                       </tbody>
//                     </table>

//                     <div className="container">
//                     {o?products?.map((p,i) => (
//               <>
//                 <div className='row mb-2 card  flex-row'>
//                   <div className='col-md-4 mb-2'>
//                     <img
//                       src={`http://localhost:3002/api/v1/products/photo/${p._id}`}
//                       style={{
//                         objectFit: 'contain',
//                         width: '200px',
//                         height: '200px'
//                       }}
//                       className='card-img-top'
//                       alt={p.name}
//                       onError={e => {
//                         e.target.onerror = null
//                         e.target.src = 'fallback-image-url'
//                       }}
//                     />
//                   </div>
//                   <div className='col-md-8'>
//                     <p>{p.name}</p>
//                     <p>{p.description.substring(0, 38)}</p>
//                     <p>Price: ₹{p.price}</p>

//                   </div>
//                 </div>
//               </>
//             ))}
//                     </div>

//                   </div>
//                 </>
//               )
//             })}
//           </div>

//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default Orders
