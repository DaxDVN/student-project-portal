import React, { useEffect, useState } from 'react'
import { getListOfSubjectWithoutPaging } from '../../features/subject/subjectSlice.js'
import { getCurrentUser, getUserByRoleWithoutPaging } from '../../features/user/userSlice.js'
import { useDispatch } from 'react-redux'
import { updateClass } from '../../features/class/classEntitySlice.js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import {getListOfSystemSettingWithoutPaging} from '../../features/system-setting/systemSettingSlice.js';

const statusTypes = ['CANCELLED', 'COMPLETED', 'ONGOING', 'PENDING']

const CardUpdateForm = ({
  currentClass,
  tabSetting,
}) => {
  const [formData, setFormData] = useState({
    code: currentClass.code,
    status: currentClass.status,
    subject: currentClass.subject.id,
    manager: currentClass.manager.id,
    detail: currentClass.detail,
    semester: currentClass.semester,
  })
  const navigate = useNavigate()
  
  // Handle form input changes
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

  }
  // Handle form submission
  const handleSubmit = async () => {
    await dispatch(getCurrentUser())
      .then(async (response) => {
        const updateBy = response.payload.id
        const responseAdd = await dispatch(updateClass({
          id: currentClass.id,
          code: formData.code,
          subject: formData.subject,
          status: formData.status,
          detail: formData.detail,
          manager: formData.manager,
          creator: currentClass.creator.id,
          students: currentClass.students,
          semester: formData.semester,
          updateBy,
        }))
        
        if (responseAdd.type.includes('fulfilled')) {
          toast.success('Update successfully!')
          setTimeout(() =>
            navigate('../class-manager'), 1000,
          )
        } else {
          toast.error('Not valid, stupid')
        }
      })
  }
  
  const dispatch = useDispatch()
  const [list, setList] = useState({
    subjectList: {},
    managerList: {},
    semesterList: {}
  })
  
  useEffect(
    () => {
      const fetchData = async () => {
        const [response1, response2, response3] =
          await Promise.all([
            dispatch(getListOfSubjectWithoutPaging()),
            dispatch(getUserByRoleWithoutPaging({ role: 'LECTURE' })),
            dispatch( getListOfSystemSettingWithoutPaging( {group: 'SEMESTER'} ) ),
            
          ])
        setList({
          ...list,
          subjectList: response1.payload,
          managerList: response2.payload,
          semesterList: response3.payload,
        })
      }
      fetchData()
    }, [],
  )
  return (
    <>
      
      <ToastContainer
        position='top-center'
        autoClose={1000}
        style={{ width: '600px' }}
      />
      <div className={'col-8'} style={{ display: tabSetting === 'update' ? 'block' : 'none' }}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>Code:</label>
              <input
                type='text'
                className='form-control'
                name='code'
                value={formData.code}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Status:</label><br/>
              <select
                className='select'
                name='status'
                value={formData.status}
                onChange={handleChange}
              >
                {
                  statusTypes.map(
                    el => (
                      <option key={el}>{el}</option>
                    ),
                  )
                }
              </select>
            </div>
          </div>
          <div className='col-md-2'>
            <div className='text-right mt-4 mr-2'>
              <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>Subject:</label><br/>
              <select
                className='select'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
              >
                {
                  list.subjectList.length &&
                  list.subjectList.map(
                    el => (
                      <option key={el.id} value={el.id}>{el.code}</option>
                    ),
                  )
                }
              </select>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Manager:</label><br/>
              <select
                className='select'
                name='manager'
                value={formData.manager}
                onChange={handleChange}
              >
                {
                  list.managerList.length &&
                  list.managerList.map(
                    el => (
                      <option key={el.id} value={el.id}>{el.fullName}</option>
                    ),
                  )
                }
              </select>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Semester:</label><br/>
              <select
                className='select'
                name='semester'
                value={formData.semester}
                onChange={handleChange}
              >
                {
                  list.semesterList.length &&
                  list.semesterList.map(
                    el => (
                      <option key={el.name} value={el.name}>{el.name}</option>
                    ),
                  )
                }
              </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='form-group'>
              <label>Detail:</label>
              <textarea
                rows={5}
                name='detail'
                className='form-control'
                value={formData.detail}
                onChange={handleChange}
                placeholder='Enter detail here'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardUpdateForm
