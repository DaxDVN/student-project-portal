import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserById } from '../../features/user/userSlice.js'
import { useParams } from 'react-router-dom'
import { getSystemSettingById } from '../../features/system-setting/systemSettingSlice.js'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';

const SystemSettingDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [setting, setSetting] = useState({
    creator:{
        id: null
    }
  })
  const [creator, setCreator] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        getSystemSettingById({
          id
        })
      ).then((respone) => {
        console.log(respone.payload)
        setSetting(respone.payload)
      })
    }
    fetchData()
    const fetchData1 = async () => {
      await dispatch(
        getUserById({
          id: setting.creator.id
        })
      ).then((respone) => {
        console.log(respone.payload)
        setCreator(respone.payload)
      })
    }
    fetchData1()
  }, [setting.creator.id])

  return (
    <>
      <div style={{ display: 'flex' }}>
        <HeaderContent
          pageTitle={'System Setting Detail'}
          pageName={'System Setting Detail'}
          prePage={'System Settings'}
        />
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="about-info">
              <div className="col-12">
                  <h5 className="form-title">
                    <span>System Setting Details</span>
                  </h5>
                </div>
                <div className="media mt-3">
                  <div className="media-body ml-5 col-md-12">
                    <ul>
                      <li>
                        <span className="title-span">Id:</span>
                        <span className="info-span">{setting.id}</span>
                      </li>
                      <li>
                        <span className="title-span">Setting Name: </span>
                        <span className="info-span">{setting.name}</span>
                      </li>
                      <li>
                        <span className="title-span">Setting Group: </span>
                        <span className="info-span">
                          {setting.settingGroup}
                        </span>
                      </li>
                      <li>
                        <span className="title-span">Creator id: </span>
                        <span className="info-span">{creator.fullName}</span>
                      </li>
                      <li>
                        <span className="title-span">Description: </span>
                        <span className="info-span">{setting.description}</span>
                      </li>
                      <li>
                        <span className="title-span">Status: </span>
                        <span className="info-span">
                          {setting.isEnable === true ? 'Active' : 'Deactive'}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SystemSettingDetail
