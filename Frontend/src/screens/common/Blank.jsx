import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import React from 'react'

const Blank = () => {
  const prePage = 'Dashboard'
  return (
    <>
      <HeaderContent
        pageTitle={'Blank Page'}
        pageName={'Blank Page'}
        prePage={prePage}
      />
      <div className="row">
        <div className="col-sm-12">Contents here</div>
      </div>
    </>
  )
}

export default Blank
