import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeClass } from '../../features/class/classEntitySlice.js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CardSpecialSetting = ({
  currentClass,
  tabSetting
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleRemoveClass = async () => {
    const response = await dispatch(removeClass(currentClass))
    if (response.type.includes('fulfilled')) {
      toast.success('Remove successfully!')
      setTimeout(() =>
        navigate('../classes')
      , 1500)
    } else {
      toast.error('Not found')
    }
  }
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={1000}
        style={{ width: '600px' }}
      />
      <div className={'col-8'} style={{ display: tabSetting === 'special' ? 'block' : 'none' }}>
        <button type='submit' className='btn btn-primary' onClick={handleRemoveClass}>
          Remove Class
        </button>
      </div>
    </>
  )
}

export default CardSpecialSetting
