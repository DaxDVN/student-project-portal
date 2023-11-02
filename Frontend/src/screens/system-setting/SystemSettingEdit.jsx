import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import SystemSettingForm from '../../components/system-setting/SystemSettingForm.jsx'
import { getSystemSettingById } from '../../features/system-setting/systemSettingSlice.js'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const SystemSettingEdit = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [load, setLoad] = useState(true)
  const [setting, setSetting] = useState({})
  const [isSettingLoaded, setIsSettingLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSystemSettingById({id})).then((response) => {
        setSetting(response.payload)
        setIsSettingLoaded(true)
      })
    }
    fetchData()
  }, [])
  return (
    <>
      <HeaderContent
          pageTitle={'System Setting Edit'}
          pageName={'System Setting Edit'}
          prePage={'System Settings'}
        />
      {/* <SystemSettingForm setting={setting} load={load} setLoad={setLoad}/> */}
      {isSettingLoaded ? (
        <SystemSettingForm setting={setting} load={load} setLoad={setLoad} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default SystemSettingEdit
