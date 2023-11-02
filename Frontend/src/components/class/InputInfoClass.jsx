import React from 'react'


const InputInfoClass = ({ label, name, value, onChange }) => {
  return (
    <div className="col-12" 
    style={{marginLeft:'12px'}}>
      <div className="form-group" >
        <label style={{marginLeft:'10px'}}>{label}</label>

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
export default InputInfoClass
