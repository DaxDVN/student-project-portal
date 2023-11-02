import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import SystemSettingTable from '../../components/system-setting/SystemSettingTable.jsx'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const SystemSettingManager = () => {
  const [load, setLoad] = useState(false)

  return (
    <>
    <ToastContainer
        position='top-center'
        autoClose={1000}
        style={{ width: '600px' }}
      />
      <div style={{ display: 'flex' }}>
        <HeaderContent
          pageTitle={'System Setting Manager'}
          pageName={'System Setting Manager'}
          prePage={'Dashboard'}
        />
        <div className="col-auto text-right float-right ml-auto">
          <Link to={'/new-setting'} className={'btn btn-primary'}><i className="fas fa-plus"></i></Link>
         </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                <SystemSettingTable load={load} setLoad={setLoad} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SystemSettingManager
