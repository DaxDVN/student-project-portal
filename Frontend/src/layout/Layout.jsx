import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'
import '../assets/css/font.css'
import '../assets/css/datatables.min.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import Wrapper from './Wrapper.jsx'
import React from 'react'

const Layout = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <Wrapper />
    </div>
  )
}

export default Layout
