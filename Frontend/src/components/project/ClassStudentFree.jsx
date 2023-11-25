import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  addStudentToClass, getStudentsFreeWithinClass, getStudentsWithinClass,
  getUsersWithinClass,
} from '../../features/class/classEntitySlice.js'
import TableRow from '../../components/class/TableRow.jsx'

import Pagination from '../common/table/Pagination.jsx';
import { read, utils, writeFile } from 'xlsx';
import StudentList from '../class/StudentList.jsx';
import {addStudentToProject} from '../../features/project/projectSlice.js';

const ClassStudentFree = ( prop) => {
  const studentListRef = useRef(null)
  const [load, setLoad] = useState(false)
  const [page, setPage] = useState({
    totalPages: 0,
    currentPage: 1,
    pageSize: 5,
    last: 10
  })
  const currentClass = prop.currentClass
  const [students, setStudent] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getStudentsFreeWithinClass({
        id: currentClass.id,
      }))
        .then((response) => {
          if (response.payload != null) {
            setStudent(response.payload)
            setPage({
              ...page,
              currentPage: response.payload.page + 1,
              pageSize: response.payload.size,
              totalPages: response.payload.totalPages,
              last: response.payload.last
            })
          }
        })
        .catch((error) => console.log(error))
    }
    fetchData()
  }, [load, prop.addStudent])
  const paging = []
  for (let i = 1; i <= page.totalPages; i++) {
    paging.push(i)
  }

  const handlePageNumber = (e) => {
    e.preventDefault()
    const pageNumber = e.currentTarget.getAttribute('id')
    setPage({
      ...page,
      currentPage: pageNumber
    })
  }

  const handleIncreaseOrDecrease = (e) => {
    e.preventDefault()
    const change = e.currentTarget.getAttribute('id')
    if (change.toLowerCase() === 'next' && page.last === false) {
      const nextPage = page.currentPage + 1
      setPage({
        ...page,
        currentPage: nextPage
      })
    }
    if (change.toLowerCase() === 'previous' && page.currentPage > 0) {
      const previousPage = page.currentPage - 1
      setPage({
        ...page,
        currentPage: previousPage
      })
    }
  }
  const addStudentToList = async (e) => {
    const studentId = e.currentTarget.getAttribute('id')
    await dispatch(addStudentToProject({
      id: prop.currentProject.id,
      'request': [{
        id: studentId
      }]
    })).then(
      (response) => {
        console.log(response)
        setLoad(!load)
      }
    )
  }
  return (
    <>
      <div
        className='card-body'
        style={{ display: 'block' }}
      >
        <div className={'mb-3'} style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        </div>
      </div>
      <div
        onClick={ () => prop.setAddStudent(false) }
        style={ {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 900,
          display: prop.addStudent ? 'block' : 'none',
        } }
      ></div>
      <div className={'mt-5 ml-4 mr-4'}
           style={{ position: 'fixed',
             zIndex: 999,
             top: '10%', left: '20%',
             backgroundColor: 'white',
             padding: '10px',
             display:
               prop.addStudent ? 'block' : 'none'
                }} ref={studentListRef}>
        <h3 className='card-title d-flex justify-content-between'>
          <span>List of Student</span>
          <button className={'btn btn-danger'} onClick={() => {
            prop.setAddStudent(false)
          }}>
            <i className='fas fa-close' onClick={() => setLoad(!load)}></i>
          </button>
        </h3>
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
                      students != null &&
                      students.map(
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
    </>
  )
}

export default ClassStudentFree
