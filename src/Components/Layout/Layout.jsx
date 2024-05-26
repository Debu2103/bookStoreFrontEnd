import Header from "./Header"
import Footer from "./Footer"
// import axios from "axios"
import {Helmet} from "react-helmet"
import {ToastContainer} from "react-toastify"
const  Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
    <Helmet>
      <meta charSet="utf-8"/>
      <meta name="description" content={description}/>
      <meta  name="keywords" content={keywords}/>
      <meta  name="author" content="Debaroon"/>
      <title>{title}</title>
    </Helmet>
    <Header/>
  <main style={{minHeight:"70vh"}}>
  <ToastContainer/>
  {children}</main>
      
      <Footer/>
    </div>
  )
}

Layout.defaultProps={
  title:"Book Store",
  description:"Book Store",
  keywords:"books,bengali books, story books",
  author:"Debaroon"
}

export default Layout