import { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'
const AllCategories = () => {
  const categories = useCategory()
  return <Layout title={'All Categories'}>
    <div className="container">

        <div className="row">
        {categories.map((c)=>(
            <>
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <button className='btn btn-primary text-light'><Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link></button>
            </div>
            </>
        ))}
            
        </div>
    </div>
  </Layout>
}

export default AllCategories
