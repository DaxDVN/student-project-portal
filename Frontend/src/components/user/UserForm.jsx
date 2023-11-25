import React, { useEffect, useState } from 'react'
import { addUser, getCurrentUser, toggleForm, updateUser } from '../../features/user/userSlice.js'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {validateUser} from '../../utils/validateUser.js';

const initialForm = {
  fullName: '',
  password: '',
  email: '',
  phone: '',
  note: '',
  status: '',
  role: '',
  createAt: '',
  avatar: ''
}
const UserForm = ({
  load,
  setLoad,
  isFormDisplay,
}) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  
  const user = JSON.parse(localStorage.getItem('user-update'))
  useEffect(() => {
    if (isFormDisplay === false) {
      localStorage.removeItem('user-update')
      setFormData(initialForm)
      return
    }
    if (user != null) {
      console.log(user)
      const status = user.isVerified === false ? 'Unverified' : (user.isEnable === false ? 'Disable' : 'Enable')
      setFormData({
        ...formData,
        fullName: user.fullName,
        avatar: user.avatar,
        password: '',
        email: user.email,
        phone: user.phone,
        note: user.note != null ? user.note : '',
        status,
        role: user.role,
        createAt: user.created_at ? user.created_at.substring(0, 10) : 'Unknown',
      })
    }
  }, [isFormDisplay])
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
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validateUser( {...formData, password: "thisIsOk", passwordConfirm: "thisIsOk"})
    if (validation !== '') {
      setError(validation)
      return
    }
    if (user == null) {
      await dispatch(addUser(formData))
        .then((response) => {
          if (response.type.includes('fulfilled')) {
            setLoad(!load)
            toast.success('Add successfully!')
            setTimeout(() => {
              setFormData(initialForm)
              dispatch(toggleForm())
            }, 500)
          } else {
            toast.error('There is a duplication')
          }
        })
    } else {
      await dispatch(getCurrentUser())
        .then(async (response0) => {
          await dispatch(updateUser({
            id: user.id,
            email: formData.email,
            fullName: formData.fullName,
            phone: formData.phone,
            note: formData.note,
            status: formData.status,
            role: formData.role,
            adminId: response0.payload.id,
          }))
            .then((response) => {
              if (response.type.includes('fulfilled')) {
                setLoad(!load)
                if (response.type.includes('update')){
                  toast.success('Update successfully!')
                }
                else{
                  toast.success('Add successfully!')
                }
                setTimeout(() => {
                  setFormData(initialForm)
                  dispatch(toggleForm())
                }, 500
                )
              } else {
                toast.error('There is an error when updating')
              }
            })
        })
    }
  }
  
  return (<>
    <ToastContainer
      position='top-center'
      autoClose={1000}
      style={{ width: '600px' }}
    />
    <div style={{ display: isFormDisplay === true ? 'block' : 'none' }}>
      <div className='col-4' style={{
        position: 'fixed',
        top: '10vh',
        right: '30%',
        zIndex: '999',
        backgroundColor: 'white',
        paddingTop: '20px',
        borderRadius: '10px',
      }}>
        <div className={'row mb-3 mr-1'}>
          <h5 className='card-title col-11' style={{ zIndex: '999' }}>User details</h5>
          <button className={'btn btn-primary col-1'} onClick={() => {
            dispatch(toggleForm())
          }}>
            <i className='fas fa-close'></i>
          </button>
        </div>
        
        <div className={'mb-5'} style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div className='avatar avatar-xl'>
            <img
              className='avatar-img rounded-circle'
              alt='User Image'
              src={user !== null ? user.avatar : 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png'}
            />
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Full Name:</label>
                <input
                  type='text'
                  className='form-control'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Phone:</label>
                <input
                  type='text'
                  className='form-control'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Email:</label>
                <input
                  type='text'
                  className='form-control'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  disabled={user !== null}
                />
              </div>
            </div>
            {user === null && (<div className='col-md-6'>
              <div className='form-group'>
                <label>Password:</label>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>)}
            {user !== null && (<div className='col-md-6'>
              <div className='form-group'>
                <label>Creat At:</label>
                <input
                  type='text'
                  className='form-control'
                  name='createAt'
                  value={formData.createAt}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
            </div>)}
          
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <label>Note:</label>
                <input
                  type='text'
                  className='form-control'
                  name='note'
                  value={formData.note}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Status:</label>
                <select
                  className='select'
                  name='status'
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value=''>Select Status</option>
                  <option value='Unverified'>Unverified</option>
                  <option value='Disable'>Disable</option>
                  <option value='Enable'>Enable</option>
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Role:</label>
                <select
                  className='select'
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value=''>Select Role</option>
                  <option value='STUDENT'>Student</option>
                  <option value='LECTURE'>Lecture</option>
                  <option value='SUBJECT_MANAGER'>Subject Manager</option>
                  <option value='ADMIN'>Admin</option>
                </select>
              </div>
            </div>
          </div>
          <p style={{ color: 'red' }}>{error || ''}</p>
          <div className='row mb-5'>
            <div className='col-12' style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>)
}

export default UserForm
