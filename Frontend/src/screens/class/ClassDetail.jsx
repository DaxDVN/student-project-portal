import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import React, { useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import ClassStudent from '../../components/class/ClassStudent.jsx'
import ClassInformation from '../../components/class/ClassInformation.jsx'
import TabClass from '../../components/class/TabClass.jsx'
import ClassUpdate from '../../components/class/ClassUpdate.jsx'

const tabs = ['General', 'Information', 'Student', 'Milestone']

const ClassDetail = () => {
  let currentClass = JSON.parse(localStorage.getItem('current-class'))
  if (currentClass != null) {
    currentClass = currentClass.payload
  }
  const prePage = 'Dashboard'
  const [tab, setTab] = useState('General')
  let status = ''
  switch (currentClass.status) {
    case 'PENDING':
      status = 'badge badge-info ml-2'
      break
    case 'ONGOING':
      status = 'badge badge-primary ml-2'
      break
    case 'COMPLETED':
      status = 'badge badge-success ml-2'
      break
    case 'CANCELLED':
      status = 'badge badge-danger ml-2'
      break
  }
  const [isUpdate, setIsUpdate] = useState(false);
  console.log(isUpdate)
  return (
    <>
      <HeaderContent
        pageTitle={'Project Information'}
        pageName={'Project Information'}
        prePage={prePage}
      />
      <div className='profile-header'>
        <div className='row align-items-center'>
          <div className='col ml-md-n2 profile-user-info'>
            <h2
              className='user-name mb-0'
              style={{
                display: 'flex',
                justifyContent: 'left'
              }}
            >
              {currentClass.code}
            </h2>
            <span className={status}>{currentClass.status}</span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='profile-menu'>
            <ul className='nav nav-tabs nav-tabs-solid'>
              {
                tabs.map(
                  el => (
                    <TabClass el={el} tab={tab} setTab={setTab} key={el}/>
                  )
                )
              }
            </ul>
          </div>
          <div className='tab-content profile-tab-cont'>
            
            <div className='col-lg-12'>
              <div className='card'>
                <div style={{display: isUpdate ? 'none' : 'block'}}>
                  <ClassInformation tab={tab} currentClass={currentClass} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/>
                </div>
                <div style={{display: isUpdate ? 'block' : 'none'}}>
                  <ClassUpdate tab={tab} currentClass={currentClass} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/>
                </div>
                <ClassStudent tab={tab} currentClass={currentClass}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClassDetail
