import React from 'react'
import { removeStudentFromClass} from '../../features/class/classEntitySlice.js';
import {useDispatch} from 'react-redux';

const TableRow = ( {el, currentClass, setLoad, load} ) => {
  const dispatch = useDispatch()
  let status = ''
  if (el !== undefined) {
    switch (el.role) {
      case 'STUDENT':
        status = 'badge badge-success'
        break
      case 'LECTURE':
        status = 'badge badge-primary'
        break
      case 'SUBJECT_MANAGER':
        status = 'badge badge-info'
        break
      case 'ADMIN':
        status = 'badge badge-danger'
        break
    }
  } else {
    return;
  }
  const removeStudentToList = async (e) => {
    const confirmation = confirm("Are you sure to remove this student from this class?")
    if (confirmation === false){
      return
    }
    const studentId = e.currentTarget.getAttribute('id')
    await dispatch(removeStudentFromClass({
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
    <tr>
      <td>{ el.id }</td>
      <td>{ el.fullName }</td>
      <td>{ el.email }</td>
      <td>{ el.phone }</td>
      <td>
        <button className={'btn btn-warning'} id={el.id} onClick={removeStudentToList}>
          <i className={"fas fa-close"}></i>
        </button>
      </td>
    </tr>
  )
}

export default TableRow
