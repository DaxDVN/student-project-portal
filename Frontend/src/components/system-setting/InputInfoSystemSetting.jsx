import React, { useState } from 'react'

const InputInfoSystemSetting = ({ type, label, name, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value)

  const handleChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange(e.target.name, e.target.value)
  }
  return (
    <div className="col-12 col-sm-6">
      <div className="form-group">
        <label>{label}</label>
        <input
          type={type}
          className="form-control"
          name={name}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
export default InputInfoSystemSetting
