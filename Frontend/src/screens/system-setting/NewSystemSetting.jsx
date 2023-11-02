import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import SystemSettingForm from '../../components/system-setting/SystemSettingForm.jsx'
import { getCurrentUser } from '../../features/user/userSlice.js'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const NewSystemSetting = () => {
  const [load, setLoad] = useState(false)
  const dispatch = useDispatch()
  const [setting, setSetting] = useState({
    id: null,
    creator: {
      id: null
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCurrentUser()).then((response) => {
        setSetting(prev => ({
          ...prev,
          creator: {
            id: response.payload.id
          }
        }))
      })
    }
    fetchData()
  }, [])

  return (
    <>
      <HeaderContent
          pageTitle={'New System Setting'}
          pageName={'New System Setting'}
          prePage={'System Settings'}
        />
      <SystemSettingForm setting={setting} load={load} setLoad={setLoad}/>
    </>
  )
}

export default NewSystemSetting
