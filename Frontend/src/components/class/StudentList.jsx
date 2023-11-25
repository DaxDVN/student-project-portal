import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {addStudentToClass, getStudentWithOutClass} from '../../features/class/classEntitySlice.js';
import Pagination from '../common/table/Pagination.jsx';

const StudentList = ( {currentClass, load, setLoad} ) => {
  const [page, setPage] = useState( {
    totalPages: 0,
    currentPage: 1,
    pageSize: 5,
    last: 10,
  } )
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
  
  const [userList, setUserList] = useState()
  const dispatch = useDispatch()
  useEffect(
    () => {
      const fetchData = async () => {
        await dispatch( getStudentWithOutClass( {
          id: currentClass.id,
          currentPage: page.currentPage - 1,
          pageSize: page.pageSize,
        } ) )
          .then( ( response ) => {
            if (response.type.includes( 'fulfilled' )) {
              setUserList( response.payload.content )
              setPage( {
                ...page,
                currentPage: response.payload.page + 1,
                pageSize: response.payload.size,
                totalPages: response.payload.totalPages,
                last: response.payload.last,
              } )
            } else {
              toast.error( 'There are some wrong things' )
            }
          } )
      }
      fetchData()
    }, [load, page.currentPage],
  )
  
  const addStudentToList = async (e) => {
    const studentId = e.currentTarget.getAttribute('id')
    await dispatch(addStudentToClass({
      id: currentClass.id,
      'request': [{
        id: studentId
      }]
    })).then(
      (response) => {
        setLoad(!load)
      }
    )
  }
  
  return (
    <div>
      <div className='row' style={{width: '1000px'}}>
        <div className='col-12'>
          <div className='card card-table'>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table table-hover table-center mb-0 datatable'>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Add</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    userList != null &&
                    userList.map(
                      ( student ) => (
                        <tr key={ student.id }>
                          <td>{ student.id }</td>
                          <td>
                            <h2>
                              { student.fullName }
                            </h2>
                          </td>
                          <td>{ student.email }</td>
                          <td>{ student.phone }</td>
                          <td>
                            <button id={student.id} className={'btn btn-primary'} onClick={addStudentToList}>
                              <i className='fas fa-plus'></i>
                            </button>
                          </td>
                        </tr>
                      ),
                    )
                  }
                  </tbody>
                </table>
                <Pagination page={ page } paging={ paging } handlePageNumber={ handlePageNumber }
                            handleIncreaseOrDecrease={ handleIncreaseOrDecrease } />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentList
