import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import React, { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import ProjectMember from '../../components/project/ProjectMember.jsx'
import ProjectInformation from '../../components/project/ProjectInformation.jsx'

const ProjectDetail = () => {
  const prePage = 'Dashboard'
  const [tab, setTab] = useState('General')
  return (
    <>
      <HeaderContent
        pageTitle={'Project Information'}
        pageName={'Project Information'}
        prePage={prePage}
      />
      <div className="profile-header">
        <div className="row align-items-center">
          <div style={{ width: '100px' }} className={'mr-5 ml-5'}>
            <CircularProgressbar value={66} text={`${66}%`} />
          </div>
          <div className="col ml-md-n2 profile-user-info">
            <h2
              className="user-name mb-0"
              style={{ display: 'flex', justifyContent: 'left' }}
            >
              project name
              <button
                type="button"
                className="btn btn-block btn-outline-dark ml-3 mt-2"
                style={{
                  width: '50px',
                  height: '20px',
                  fontSize: '12px',
                  padding: '0px'
                }}
              >
                Private
              </button>
            </h2>
            <span className="badge badge-primary">In Stock</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="profile-menu">
            <ul className="nav nav-tabs nav-tabs-solid">
              <li className="nav-item">
                <a
                  className={
                    tab === 'Workspace' ? 'nav-link active' : 'nav-link'
                  }
                  onClick={() => setTab('Workspace')}
                  style={{ cursor: 'pointer' }}
                >
                  Workspace
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    tab === 'Information' ? 'nav-link active' : 'nav-link'
                  }
                  onClick={() => setTab('Information')}
                  style={{ cursor: 'pointer' }}
                >
                  Information
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={tab === 'Member' ? 'nav-link active' : 'nav-link'}
                  onClick={() => setTab('Member')}
                  style={{ cursor: 'pointer' }}
                >
                  Member
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    tab === 'Milestone' ? 'nav-link active' : 'nav-link'
                  }
                  onClick={() => setTab('Milestone')}
                  style={{ cursor: 'pointer' }}
                >
                  Milestone
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content profile-tab-cont">
            <div className="col-lg-12">
              <div className="card">
                <ProjectInformation tab={tab} />
                <ProjectMember tab={tab} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDetail
