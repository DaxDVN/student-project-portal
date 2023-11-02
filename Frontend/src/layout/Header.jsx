
import React from 'react'
import NavbarLeft from '../components/common/layout/NavbarLeft.jsx';
import NavbarRight from '../components/common/layout/NavbarRight.jsx';

const Header = () => {
  return (
    <div className="header" style={{zIndex: '800'}}>
      <NavbarLeft />
      <NavbarRight />
    </div>
  )
}

export default Header
