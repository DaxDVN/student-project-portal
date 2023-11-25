import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import ProfileHeader from '../../components/user/ProfileHeader.jsx'
import ProfileDetail from '../../components/user/ProfileDetail.jsx'
import ProfilePassword from '../../components/user/ProfilePassword.jsx'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../features/user/userSlice.js'

const Profile = () => {
  const prePage = 'Dashboard'
  const [isDetail, setIsDetail] = useState(true)
  const [currentUser, setCurrentUser] = useState({})
  const [load, setLoad] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData () {
      const response = await dispatch(getCurrentUser())
      setCurrentUser(response.payload)
    }
    fetchData()
  }, [load])
  return (
    <>
      <HeaderContent
        pageTitle={'Profile'}
        pageName={'Profile'}
        prePage={prePage}
      />

      <div className="row">
        <div className="col-md-12">
          <ProfileHeader currentUser={currentUser} load={load} setLoad={setLoad}/>

          <div className="profile-menu">
            <ul className="nav nav-tabs nav-tabs-solid">
              <li className="nav-item">
                <a
                  className={isDetail ? 'nav-link active' : 'nav-link'}
                  onClick={() => setIsDetail(true)}
                  style={{ cursor: 'pointer' }}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={!isDetail ? 'nav-link active' : 'nav-link'}
                  onClick={() => setIsDetail(false)}
                  style={{ cursor: 'pointer' }}
                >
                  Password
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content profile-tab-cont">
            <ProfileDetail load={load} setLoad={setLoad} isDetail={isDetail} currentUser={currentUser}/>
            <ProfilePassword isDetail={isDetail} currentUser={currentUser}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
