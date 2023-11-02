import React from 'react'

const TableRow = ({ id, fullName, mark, percentage, year }) => {
  return (
    <tr>
      <td className="text-nowrap">
        <div>{id}</div>
      </td>
      <td className="text-nowrap">{fullName}</td>
      <td className="text-center">{mark}</td>
      <td className="text-center">{percentage}</td>
      <td className="text-right">
        <div>{year}</div>
      </td>
    </tr>
  )
}

export default TableRow
