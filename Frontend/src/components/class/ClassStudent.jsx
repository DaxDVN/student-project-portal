import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getUsersWithinClass,
  removeStudentFromClass
} from '../../features/class/classEntitySlice.js'
import TableRow from '../../components/class/TableRow.jsx'
import StudentList from './StudentList.jsx'
import Pagination from '../common/table/Pagination.jsx';


const ClassStudent = (prop) => {
  const [selectedUserIds, setSelectedUserIds] = useState([])
  const handleCheckBox = (e) => {
    const userId = e.currentTarget.getAttribute('id')
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId))
    } else {
      setSelectedUserIds([...selectedUserIds, userId])
    }
  }
  const studentListRef = useRef(null)
  const [load, setLoad] = useState(false)
  const [page, setPage] = useState({
    totalPages: 0,
    currentPage: 1,
    pageSize: 5,
    last: 10
  })

  const tab = prop.tab
  const currentClass = prop.currentClass
  const [students, setStudent] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUsersWithinClass({
        id: currentClass.id,
        currentPage: page.currentPage - 1,
        pageSize: page.pageSize
      }))
        .then((response) => {
          if (response.payload != null) {
            setStudent(response.payload.content)
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
  }, [load, page.currentPage])
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

  async function handleSubmitStudent () {
    const request = []
    selectedUserIds.forEach(
      el => {
        request.push({
          id: el
        })
      }
    )
    const classRequest = {
      id: currentClass.id,
      request
    }
    console.log(classRequest)
    await dispatch(removeStudentFromClass(classRequest))
      .then(
        (response) => {
          if (response.type.includes("fulfilled"))
            setLoad(!load)
        }
      )
  }

  return (
    <>
      <div
        className='card-body'
        style={{ display: tab === 'Student' ? 'block' : 'none' }}
      >
        <div className={'mb-3'} style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Pagination page={page} paging={paging} handlePageNumber={handlePageNumber}
                      handleIncreaseOrdecrease={handleIncreaseOrDecrease}/>
          <button className={'btn btn-danger'} style={{ display: selectedUserIds.length > 0 ? 'block' : 'none' }}
                  onClick={handleSubmitStudent}>
            {'Remove From Class '}
            <i className='fas fa-close'></i>
          </button>
          <button className={'btn btn-primary'}
                  onClick={() => {
                    studentListRef.current.scrollIntoView({ behavior: 'smooth' })
                  }}>
            {'Add more student '}
            <i className='fas fa-plus'></i>
          </button>
        </div>
        <div className='table-responsive'>
          <table className='table table-hover table-center mb-0 datatable'>
            <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
            </thead>
            <tbody>
            {
              students != null &&
              students.map(
                (el, i) => (
                  <TableRow key={i} el={el} handleCheckBox={handleCheckBox}/>
                )
              )
            }
            </tbody>
          </table>
        </div>
      </div>
      <div className={'mt-5 ml-4 mr-4'} style={{ display: tab === 'Student' ? 'block' : 'none' }} ref={studentListRef}>
        <h3 className='card-title d-flex justify-content-between'>
          <span>List of Student</span>
        </h3>
        <StudentList currentClass={currentClass} load={load} setLoad={setLoad}/>
      </div>
    </>
  )
}

export default ClassStudent
