import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserById } from '../../features/user/userSlice.js'

const ClassInformation = (prop) => {
  const tab = prop.tab
  const currentClass = prop.currentClass

  const dispatch = useDispatch()
  const [inCharge, setInCharge] = useState({
    creator: '',
    manager: ''
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] =
          await Promise.all([
            dispatch(getUserById(currentClass.creator)),
            dispatch(getUserById(currentClass.manager)),
          ])
        setInCharge((prevIncharge) => ({
          ...prevIncharge,
          creator: response1.payload,
          manager: response2.payload,
        }))
      } catch (error) {
        // Handle errors here
      }
    }
    fetchData()
  }, [currentClass.creator, currentClass.manager])
  
  const memoizedCreator = useMemo(() => inCharge.creator, [inCharge.creator])
  const memoizedManager = useMemo(() => inCharge.manager, [inCharge.manager])
  
  return (
    <div
      className='card-body'
      style={{ display: tab === 'Information' ? 'block' : 'none' }}
    >
      <h5 className='card-title d-flex justify-content-between'>
        <span>View Class</span>
        <i className="far fa-edit mr-1" onClick={()=> prop.setIsUpdate(!prop.isUpdate)}/>
      </h5>
      <div className={'row'}>
        <div className='col-lg-1'></div>
        <div className={'col-lg-5'}>
          <div className='row'>
            <p className='col-sm-4 text-muted mb-0 mb-sm-3'>Code</p>
            <p className='col-sm-6'>{currentClass.code}</p>
          </div>

          <div className='row'>
            <p className='col-sm-4 text-muted mb-0 mb-sm-3'>Number of Student</p>
            <p className='col-sm-6'>{currentClass.students.length}</p>
          </div>
          <div className='row'>
            <p className='col-sm-4 text-muted mb-0 mb-sm-3'>Created Date</p>
            <p className='col-sm-6'>{currentClass.createdAt ? currentClass.createdAt.substring(0, 10) : 'Unknown'}</p>
          </div>
        </div>
        <div className={'col-lg-5'}>
          <div className='row'>
            <p className='col-sm-4 text-muted mb-0 mb-sm-3'>Semester</p>
            <p className='col-sm-6'>{currentClass.semester}</p>
          </div>
          <div className='row'>
            <p className='col-sm-4 text-muted mb-0 mb-sm-3'>Creator</p>
            <p className='col-sm-6'>{memoizedCreator.fullName}</p>
          </div>
          <div className='row'>
            <p className='col-sm-4 text-muted mb-0 mb-sm-3'>Class Manager</p>
            <p className='col-sm-6'>{memoizedManager.fullName}</p>
          </div>
          <div className='row'>
            <p className='col-sm-4 text-muted mb-0 mb-sm-3'>Manager Email</p>
            <p className='col-sm-6'>{memoizedManager.email}</p>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className={'col-lg-1'}></div>
        <div className={'col-lg-11'}>
          <div className='row'>
            <p className='col-lg-2 text-muted mb-0'>Detail</p>
            <p className='col-lg-10 mb-0'>
              {currentClass.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassInformation
