import React from 'react'
import {useDispatch} from 'react-redux'
import {toggleForm, updateUserStatus} from '../../features/user/userSlice.js'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserTableRow = ( {
                         load,
                         setLoad,
                         user,
                         typeOfPage,
                         handleCheckBox,
                       } ) => {
  const dispatch = useDispatch()
  const handleStatus = async () => {
    if (user.isVerified === false) {
      toast.error( 'This User is not verified, so that you can not change status' )
      return
    }
    await dispatch( updateUserStatus( user ) )
      .then( ( response ) => {
        if (response.type.includes( 'fulfilled' )) {
          setLoad( !load )
        }
      } )
  }
  
  const updateUser = async () => {
    localStorage.setItem( 'user-update', JSON.stringify( user ) )
    dispatch( toggleForm() )
  }
  
  return (
    <tr>
      <td style={ {display: typeOfPage === 'class' ? 'block' : 'none'} }>
        <div className='input-group-prepend'>
        <span className='input-group-text'>
          <input type='checkbox' id={ user.id } onChange={ handleCheckBox }/>
        </span>
        </div>
      </td>
      <td>{ user.id }</td>
      <td>
        <h2>
          { user.fullName }
        </h2>
      </td>
      <td>{ user.email }</td>
      <td>{ user.phone }</td>
      <td style={ {display: typeOfPage === 'class' ? 'none' : 'block'} }>{ user.role }</td>
      <td>
        <div
          className={ user.isEnable === true ? 'badge badge-success' : (user.isVerified === false ? 'badge badge-secondary' : 'badge badge-danger') }>
          { user.isEnable === true ? 'Active' : (user.isVerified === false ? 'Unverified' : 'Deactive') }
        </div>
      </td>
      <td className='text-right'>
        <div className='actions'>
          <button
            className='btn btn-sm bg-success-light mr-2' onClick={ updateUser }>
            <i className='fas fa-pen'/>
          </button>
          {
            user.role !== 'ADMIN' &&
            <button className={user.isEnable === true ? 'btn btn-sm bg-danger-light' : 'btn btn-sm bg-primary-light'} onClick={ handleStatus }>
              <i className={ user.isEnable === true ? 'fa fa-toggle-on' : 'fa fa-toggle-off' }/>
            </button>
          }
        </div>
      </td>
    </tr>)
}

export default UserTableRow
