import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {validateUser} from '../../utils/validateUser.js';
import {getCurrentUser, toggleForm, updateUser} from '../../features/user/userSlice.js';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';

const ProfileDetail = ( {load, setLoad, isDetail, currentUser} ) => {
  const [updateTab, setUpdateTab] = useState(false)
  function handleEdit( e ) {
    e.preventDefault()
    setUpdateTab(true)
  }
  
  const [formData, setFormData] = useState( {
    fullName: '',
    phone: '',
    note: '',
  } );
  
  useEffect( () => {
    setFormData(
      {
        ...formData,
        fullName: currentUser.fullName,
        note: currentUser.note !== undefined ? currentUser.note : '',
        phone: currentUser.phone,
      },
    )
  }, [currentUser] );
  
  const handleChange = ( e ) => {
    setFormData( {
      ...formData,
      [e.target.name]: e.target.value,
    } );
    setError('')
    
  };
  const [error, setError] = useState( '' )
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    console.log( 'Form Data:', formData );
    const validation =
      validateUser( {
        ...formData,
        password: 'thisIsOk',
        passwordConfirm: 'thisIsOk',
        email: 'thisIsOk@fpt.edu.vn'
      } )
    if (validation !== '') {
      setError( validation )
      return
    }
    await dispatch(getCurrentUser())
      .then(async (response0) => {
        await dispatch(updateUser({
          id: currentUser.id,
          email: currentUser.email,
          fullName: formData.fullName,
          phone: formData.phone,
          note: formData.note,
          status: currentUser.status,
          role: currentUser.role,
        }))
          .then((response) => {
            if (response.type.includes('fulfilled')) {
              if (response.type.includes('update')){
                toast.success('Update successfully!')
                setLoad(!load)
                setUpdateTab(false)
              }
            } else {
              toast.error('There is an error when updating')
            }
          })
      })
  };
  return (
    <div
      className={ isDetail ? 'tab-pane fade show active' : 'tab-pane fade' }
      id='per_details_tab'
    >
      <div className='row' style={{display: updateTab ? 'none' : 'block'}}>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title d-flex justify-content-between'>
                <span>Personal Details</span>
                <Link to={ '' } onClick={ handleEdit } className='edit-link'>
                  <i className='far fa-edit mr-1'/>
                  Edit
                </Link>
              </h5>
              <div className='row'>
                <p className='col-sm-3 text-muted text-sm-right mb-0 mb-sm-3'>
                  Name
                </p>
                <p className='col-sm-9'>{ currentUser.fullName }</p>
              </div>
              <div className='row'>
                <p className='col-sm-3 text-muted text-sm-right mb-0 mb-sm-3'>
                  Email ID
                </p>
                <p className='col-sm-9'>
                  { currentUser.email }
                </p>
              </div>
              <div className='row'>
                <p className='col-sm-3 text-muted text-sm-right mb-0 mb-sm-3'>
                  Phone number
                </p>
                <p className='col-sm-9'>{ currentUser.phone }</p>
              </div>
              <div className='row'>
                <p className='col-sm-3 text-muted text-sm-right mb-0 mb-sm-3'>
                  Role
                </p>
                <p className='col-sm-9'>{ currentUser.role }</p>
              </div>
              <div className='row'>
                <p className='col-sm-3 text-muted text-sm-right mb-0 mb-sm-3'>
                  Note
                </p>
                <p className='col-sm-9'>
                  { currentUser.note === '' || currentUser.note === undefined ? 'None' : currentUser.note }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row' style={{display: updateTab ? 'block' : 'none'}}>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title d-flex justify-content-between'>
                <span>Update Details</span>
                <Link to={ '' } onClick={ () => setUpdateTab(false) } className='edit-link'>
                  <i className='fas fa-close'/>
                </Link>
              </h5>
              
              <div style={ {display: 'flex', flexDirection: 'column'} }>
                <label htmlFor='fullName'>Name:</label>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  value={ formData.fullName }
                  onChange={ handleChange }
                  required
                />
                
                <label htmlFor='phone'>Phone:</label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={ formData.phone }
                  onChange={ handleChange }
                  required
                />
                
                <label htmlFor='note'>Note:</label>
                <textarea
                  id='note'
                  name='note'
                  rows='4'
                  value={ formData.note }
                  onChange={ handleChange }
                  required
                ></textarea>
                <p style={ {color: 'red'} }>{ error || '' }</p>
                
                <button type='button' onClick={ handleSubmit }>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail
