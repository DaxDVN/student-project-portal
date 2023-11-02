import React from 'react'

const InputInfoAss = ({ label, type }) => {
    return (
      <div className="col-12 col-sm-6">
        <div className="form-group">
          <label>{label}</label>
          <input type={type} className="form-control" value={''} />
        </div>
      </div>
    )
  }
export default InputInfoAss
