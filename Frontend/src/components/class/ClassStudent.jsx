import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  addStudentToClass, getStudentsWithinClass,
  getUsersWithinClass,
} from '../../features/class/classEntitySlice.js'
import TableRow from '../../components/class/TableRow.jsx'
import StudentList from './StudentList.jsx'
import Pagination from '../common/table/Pagination.jsx';
import { read, utils, writeFile } from 'xlsx';

const ClassStudent = (prop) => {
  const studentListRef = useRef(null)
  const [load, setLoad] = useState(false)
  const [addStudent, setAddStudent] = useState(false)
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
  const [studentImport, setStudentImport] = useState([]);
  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setStudentImport(rows)
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }
  useEffect( () => {
    const fetchData = async () => {
      await dispatch(addStudentToClass({
        id: currentClass.id,
        'request': studentImport
      })).then(
        (response) => {
          setLoad(!load)
        }
      )
    }
    if (studentImport.length > 0){
      if (studentImport[0].id !== undefined){
        fetchData()
      }
    }
  }, [studentImport] );
  
  const handleExport = async () => {
    await dispatch(getStudentsWithinClass({
      id: currentClass.id
    })).then(
      (response) => {
        if (response.payload !== undefined){
          const studentExport = response.payload.map(
            el => (
              {
                id: el.id,
                name: el.fullName,
                email: el.email,
                phone: el.phone
              }
            )
          )
          const headings = [[
            'ID',
            'Name',
            'Email',
            'Phone'
          ]];
          const wb = utils.book_new();
          const ws = utils.json_to_sheet([]);
          utils.sheet_add_aoa(ws, headings);
          utils.sheet_add_json(ws, studentExport, { origin: 'A2', skipHeader: true });
          utils.book_append_sheet(wb, ws, 'Report');
          writeFile(wb, 'Student Report.xlsx');
        }
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
          justifyContent: 'flex-end'
        }}>
          <button onClick={handleExport} className="btn btn-primary float-right">
            Export <i className="fa fa-download"></i>
          </button>
          <button className="btn btn-primary" style={{width: '100px', height: '50px', position: 'relative'}}>
            <label style={{zIndex: 100, position: 'absolute', top: '30%', left: '20%'}}>Import</label>
            <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  style={{zIndex: 300}}/>
          </button>
          <button className={'btn btn-primary'}
                  onClick={() => {
                    setAddStudent(true)
                  }}>
            {'Add more student '}
            <i className='fas fa-plus'></i>
          </button>
        </div>
        <div className='table-responsive'>
          <table className='table table-hover table-center mb-0 datatable'>
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
              students != null &&
              students.map(
                (el, i) => (
                  <TableRow key={i} el={el} load={load} setLoad={setLoad} currentClass={currentClass}/>
                )
              )
            }
            </tbody>
          </table>
          
          <Pagination page={page} paging={paging} handlePageNumber={handlePageNumber}
                      handleIncreaseOrDecrease={handleIncreaseOrDecrease}/>
        </div>
      </div>
      <div
        onClick={ () => setAddStudent(false) }
        style={ {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 900,
          display: addStudent === true ? 'block' : 'none',
        } }
      ></div>
      <div className={'mt-5 ml-4 mr-4'}
           style={{ position: 'fixed',
             zIndex: 999,
             top: '10%', left: '20%',
             backgroundColor: 'white',
             padding: '10px',
             display: tab === 'Student' ?
               addStudent ? 'block' : 'none'
                : 'none' }} ref={studentListRef}>
        <h3 className='card-title d-flex justify-content-between'>
          <span>List of Student</span>
          <button className={'btn btn-danger'} onClick={() => {
            setAddStudent(false)
          }}>
            <i className='fas fa-close'></i>
          </button>
        </h3>
        <StudentList currentClass={currentClass} load={load} setLoad={setLoad}/>
      </div>
    </>
  )
}

export default ClassStudent
