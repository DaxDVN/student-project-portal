import React from 'react'
import { Link } from 'react-router-dom'

const ProfileDetail = ({ isDetail, currentUser }) => {
  return (
    <div
      className={isDetail ? 'tab-pane fade show active' : 'tab-pane fade'}
      id="per_details_tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between">
                <span>Personal Details</span>
                <Link to={'/update-detail'} className="edit-link">
                  <i className="far fa-edit mr-1" />
                  Edit
                </Link>
              </h5>
              <div className="row">
                <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                  Name
                </p>
                <p className="col-sm-9">{currentUser.fullName}</p>
              </div>
              {/* <div className="row"> */}
              {/*   <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3"> */}
              {/*     Date of Birth */}
              {/*   </p> */}
              {/*   <p className="col-sm-9">{currentUser.fullName}</p> */}
              {/* </div> */}
              <div className="row">
                <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                  Email ID
                </p>
                <p className="col-sm-9">
                  {currentUser.email}
                </p>
              </div>
              <div className="row">
                <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                  Phone number
                </p>
                <p className="col-sm-9">{currentUser.phone}</p>
              </div>
              <div className="row">
                <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                  Role
                </p>
                <p className="col-sm-9">{currentUser.role}</p>
              </div>
              <div className="row">
                <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                  Note
                </p>
                <p className="col-sm-9">
                  {currentUser.note === '' || currentUser.note === undefined ? 'None' : currentUser.note}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-lg-3"> */}
        {/*   <ProfileStatus /> */}
        {/*   <ProfileEx /> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default ProfileDetail
