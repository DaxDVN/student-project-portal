import React, {useEffect, useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {getAllUsers, toggleForm} from '../../features/user/userSlice.js'
import {toast} from 'react-toastify'
import UserForm from '../../components/user/UserForm.jsx'
import UserList from '../../components/user/UserList.jsx'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import ComboBox from '../../components/common/combo-box/ComboBox.jsx';
import UserFilter from '../../components/user/UserFilter.jsx';

const UserManager = () => {
  const [page, setPage] = useState( {
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
    last: 10,
  } );
  
  const [userList, setUserList] = useState( [] );
  const [load, setLoad] = useState( false );
  const [statusResponse, setStatusResponse] = useState( '404' );
  
  
  const [selectedRole, setSelectedRole] = useState( 'All Role' );
  const [selectedStatus, setSelectedStatus] = useState( 'All Status' );
  const [searchName, setSearchName] = useState( '' );
  
  const [sort, setSort] = useState( {
    sortBy: 'id',
    order: 'ascend',
  } );
  
  const dispatch = useDispatch()
  const {isFormDisplay} = useSelector( store => store.user )
  useEffect( () => {
      const fetchData = async () => {
        await dispatch( getAllUsers( {
          currentPage: page.currentPage - 1,
          pageSize: page.pageSize,
          selectedRole: selectedRole !== 'All Role'
          && selectedRole.includes( ' ' )
            ? selectedRole.split( ' ' )[0]
            + '_' + selectedRole.split( ' ' )[1]
            : selectedRole,
          selectedStatus: selectedStatus,
          searchName: searchName,
          order: sort.order,
          sortBy: sort.sortBy,
        } ) ).then( ( response ) => {
          if (response.type.includes( 'fulfilled' )) {
            setUserList( response.payload.content )
            setPage( {
              ...page,
              currentPage: response.payload.page + 1,
              pageSize: response.payload.size,
              totalPages: response.payload.totalPages,
              last: response.payload.last,
            } )
            setStatusResponse( '200' )
          } else {
            setStatusResponse( '404' )
          }
        } )
      }
      fetchData()
    }, [load, page.currentPage, sort],
  )
  const submitFilter = () => {
    setLoad( !load )
  };
  return (
    <>
      <div style={ {display: 'flex'} }>
        <HeaderContent
          pageTitle={ 'Manage User' }
          pageName={ 'Manage User' }
          prePage={ 'Dashboard' }
        />
      </div>
      <div
        onClick={ () => dispatch( toggleForm() ) }
        style={ {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 900,
          display: isFormDisplay === true ? 'block' : 'none',
        } }
      ></div>
      <UserForm isFormDisplay={ isFormDisplay } load={ load } setLoad={ setLoad }/>
      <div className={ 'mb-3' } style={ {
        display: 'flex',
        justifyContent: 'space-between',
      } }>
        <UserFilter
          submitFilter={ submitFilter }
          selectedManager={ selectedRole }
          selectedStatus={ selectedStatus }
          searchName={ searchName }
          setSelectedManager={ setSelectedRole }
          setSelectedStatus={ setSelectedStatus }
          setSearchName={ setSearchName }
        />
        
        <button className={ 'btn btn-primary' }
                onClick={ () => {
                  dispatch( toggleForm() )
                } }>
          { isFormDisplay === true ? 'Close Form ' : ('Add form ') }
          { isFormDisplay === true ? (<i className='fas fa-close'></i>) : (<i className='fas fa-plus'></i>) }
        </button>
      </div>
      {
        statusResponse === '404' ?
          (
            <div style={ {display: 'flex', justifyContent: 'center'} } className={ 'mt-5' }>
              <h5>Data Not Found</h5>
            </div>
          ) :
          (
            <UserList page={ page } setPage={ setPage } userList={ userList }
                      load={ load } setLoad={ setLoad }
                      sort={sort} setSort={ setSort }/>
          )
      }
    </>
  
  )
}

export default UserManager
