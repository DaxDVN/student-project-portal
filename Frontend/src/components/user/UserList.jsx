import React, {useState} from 'react'
import {toggleForm} from '../../features/user/userSlice.js'
import UserTable from './UserTable.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {addStudentToClass} from '../../features/class/classEntitySlice.js'
import Pagination from '../common/table/Pagination.jsx';

const UserList = ( {page, setPage, userList, load, setLoad, typeOfPage, setSort, sort} ) => {
  const {isFormDisplay} = useSelector( store => store.user )
  const dispatch = useDispatch()
  const paging = []
  for (let i = 1; i <= page.totalPages; i++) {
    paging.push( i )
  }
  const handlePageNumber = ( e ) => {
    e.preventDefault()
    const pageNumber = e.currentTarget.getAttribute( 'id' )
    setPage( {
      ...page,
      currentPage: pageNumber,
    } )
  }
  
  const handleIncreaseOrDecrease = ( e ) => {
    e.preventDefault()
    const change = e.currentTarget.getAttribute( 'id' )
    if (change.toLowerCase() === 'next' && page.last === false) {
      const nextPage = page.currentPage + 1
      setPage( {
        ...page,
        currentPage: nextPage,
      } )
    }
    if (change.toLowerCase() === 'previous' && page.currentPage > 0) {
      const previousPage = page.currentPage - 1
      setPage( {
        ...page,
        currentPage: previousPage,
      } )
    }
  }
  
  return (
    <>
      <UserTable
        userList={userList}
        load={load}
        setLoad={setLoad}
        typeOfPage={typeOfPage}
        page={page}
        paging={paging}
        handlePageNumber={handlePageNumber}
        handleIncreaseOrDecrease={handleIncreaseOrDecrease}
        setSort={setSort}
        sort={sort}
      />
      
    </>
  )
}

export default UserList
