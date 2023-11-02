import { Link } from 'react-router-dom'
import React from 'react'

const HeaderContent = ({ pageTitle, pageName, prePage }) => {
  let link = '/'
  prePage.toLowerCase().includes('setting') ? link = '/setting-manager' : ' '
  // prePage.toLowerCase().includes('new') ? link = '/settings' : ''

  return (
    <>
    <div className="page-header">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="page-title">{ pageTitle }</h3>
          <ul className="breadcrumb">
            { prePage !== '' && (
              <li className="breadcrumb-item">
                <Link to={link}>{ prePage }</Link>
                {/* <a href="../../../index.html">{ prePage }</a> */}
              </li>
            ) }
            <li className="breadcrumb-item active">{ pageName }</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default HeaderContent
