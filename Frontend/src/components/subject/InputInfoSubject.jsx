import React from 'react'


const InputInfoSubject = ({ label, name, value, onChange }) => {
  return (
    <div className="col-12">
      <div className="form-group">
        <label>{label}</label>

        <input
          type="text"
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default InputInfoSubject
