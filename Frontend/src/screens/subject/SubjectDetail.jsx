import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserById } from '../../features/user/userSlice.js'

const SubjectDetail = () => {
  const subject = JSON.parse(localStorage.getItem('subject-detail'))
  const dispatch = useDispatch()

  const [incharge, setIncharge] = useState({
    creator: '',
    manager: ''
  })
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] =
          await Promise.all([
            dispatch(getUserById(subject.creator)),
            dispatch(getUserById(subject.manager))
          ])

        setIncharge((prevIncharge) => ({
          ...prevIncharge,
          creator: response1.payload,
          manager: response2.payload
        }))
      } catch (error) {
        // Handle errors here
      }
    }
    fetchData()
  }, [])

  const memoizedCreator = useMemo(() => incharge.creator, [incharge.creator])
  const memoizedManager = useMemo(() => incharge.manager, [incharge.manager])
  return (
    <>
    <div style={{ display: 'flex' }}>
      <HeaderContent
          pageTitle={'Subject Detail'}
          pageName={'Subject Detail'}
          prePage={'Subject Manager'}
        />
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="about-info">
                <h4>About Subject</h4>
                <div className="media mt-3">
                  <div className="media-body ml-5 col-md-6">
                    <ul>
                      <li>
                        <span className="title-span">Subject code:</span>
                        <span className="info-span">{subject.code}</span>
                      </li>
                      <li>
                        <span className="title-span">English name: </span>
                        <span className="info-span">{subject.name}</span>
                      </li>
                      <li>
                        <span className="title-span">Vietnamese name: </span>
                        <span className="info-span">{subject.name}</span>
                      </li>
                      <li>
                        <span className="title-span">Creator: </span>
                        <span className="info-span">{memoizedCreator.fullName}</span>
                      </li>
                      {
                        subject.createdAt != null &&
                        (
                          <li>
                            <span className="title-span">Create Date: </span>
                            <span className="info-span">{subject.createdAt.substring(0, 10)}</span>
                          </li>
                        )
                      }
                      <li>
                        <span className="title-span">Manager: </span>
                        <span className="info-span">{memoizedManager.fullName}</span>
                      </li>
                      <li>
                        <span className="title-span">Status: </span>
                        <span className="info-span">{subject.isEnable === true ? 'Enable' : 'Disable'}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="blue-box">
                      <h3>2850</h3>
                      <p>Followers</p>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="blue-box">
                      <h3>2050</h3>
                      <p>Following</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row mt-2">
            <div className="col-md-12">
              <div className="skill-info">
                <h4>Skills</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry, simply dummy text of the printing and
                  typesetting industry
                </p>
                <ul>
                  <li>
                    <label>Lorem Ipsum is simply</label>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 75%"
                      ></div>
                    </div>
                  </li>
                  <li>
                    <label>Lorem Ipsum is simply</label>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        role="progressbar"
                        aria-valuenow="69"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 69%"
                      ></div>
                    </div>
                  </li>
                  <li>
                    <label>Lorem Ipsum is simply</label>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                        role="progressbar"
                        aria-valuenow="86"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 86%"
                      ></div>
                    </div>
                  </li>
                  <li>
                    <label>Lorem Ipsum is simply</label>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                        role="progressbar"
                        aria-valuenow="65"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 65%"
                      ></div>
                    </div>
                  </li>
                </ul>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <h5>Education</h5>
                    <p className="mt-3">
                      Secondary Schooling at xyz school of secondary education,
                      Mumbai.
                    </p>
                    <p>
                      Higher Secondary Schooling at xyz school of higher
                      secondary education, Mumbai.
                    </p>
                    <p>
                      Bachelor of Science at Abc College of Art and Science,
                      Chennai.
                    </p>
                    <p>
                      Master of Science at Cdm College of Engineering and
                      Technoy, Pune.
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <h5>Certificates</h5>
                    <p className="mt-3">1st Prise in Running Competition.</p>
                    <p>Lorem Ipsum is simply dummy text.</p>
                    <p>
                      Won overall star student in higher secondary education.
                    </p>
                    <p>Lorem Ipsum is simply dummy text.</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default SubjectDetail
