import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserByRole } from '../../features/user/userSlice.js'
import { toast } from 'react-toastify'
import UserList from '../user/UserList.jsx'

const StudentList = ({currentClass, load, setLoad}) => {
  const [page, setPage] = useState({
    totalPages: 0,
    currentPage: 1,
    pageSize: 5,
    last: 10
  })
  
  const [userList, setUserList] = useState()
  const dispatch = useDispatch()
  useEffect(
    () => {
      const fetchData = async () => {
        await dispatch(getUserByRole({
          role: 'student',
          currentPage: page.currentPage - 1,
          pageSize: page.pageSize
        }))
          .then((response) => {
            if (response.type.includes('fulfilled')) {
              setUserList(response.payload.content)
              setPage({
                ...page,
                currentPage: response.payload.page + 1,
                pageSize: response.payload.size,
                totalPages: response.payload.totalPages,
                last: response.payload.last
              })
            } else {
              toast.error('There are some wrong things')
            }
          })
      }
      fetchData()
    }, [load, page.currentPage]
  )
  return (
    <div>
      <UserList page={page} setPage={setPage} userList={userList}
                load={load} setLoad={setLoad} typeOfPage={'class'}
                currentClass={currentClass}/>
    </div>
  )
}

export default StudentList
