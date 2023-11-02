import React from 'react'

const TableRow = ( {el, handleCheckBox} ) => {
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
  
  return (
    <tr>
      <td>
        <div className='input-group-prepend'>
        <span className='input-group-text'>
          <input type='checkbox' id={ el.id } onChange={ handleCheckBox }/>
        </span>
        </div>
      </td>
      <td>{ el.id }</td>
      <td>{ el.fullName }</td>
      <td>{ el.email }</td>
      <td>{ el.phone }</td>
      <td>
        <span className={ status }>{ el.role }</span>
      </td>
    </tr>
  )
}

export default TableRow
