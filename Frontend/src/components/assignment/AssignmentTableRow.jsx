import React from 'react'

const AssignmentTableRow = ({ assCode, assName, createBy, date, status }) => {
    const assClassName = status.includes('In process') ? 'badge badge-pill badge-info' :
        status.includes('Waiting') ? 'badge badge-pill badge-primary' :
        status.includes('Submited') ? 'badge badge-pill badge-success' :
        status.includes('Lated') ? 'badge badge-pill badge-danger' : ' '
  return (
    <tr>
      <td>{assCode}</td>
      <td>
        <h2>
          <a href="assignment-detail">{assName}</a>
        </h2>
      </td>
      <td>{createBy}</td>
      <td>{date}</td>
      <td>
        <span className={assClassName} >{status}</span>
      </td>
      <td className="text-right">
        <div className="actions">
          <a
            href="edit-books.html"
            className="btn btn-sm bg-success-light mr-2"
          >
            <i className="fas fa-pen"></i>
          </a>
          <a href="#" className="btn btn-sm bg-danger-light">
            <i className="fas fa-trash"></i>
          </a>
        </div>
      </td>
    </tr>
  )
}

export default AssignmentTableRow
