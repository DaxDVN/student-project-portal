import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetToggle } from '../features/common/commonSlice.js'
import React from 'react'

const Wrapper = () => {
  const dispatch = useDispatch()
  const onClickDropDownUser = () => {
    dispatch(resetToggle())
  }
  return (
    <div className="page-wrapper" onClick={onClickDropDownUser}>
      <div className="content container-fluid">
        <Outlet />
      </div>
    </div>
  )
}

export default Wrapper
