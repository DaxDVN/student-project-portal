import React from 'react'

const ProfileStatus = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between">
          <span>Account Status</span>
          <a className="edit-link" href="#">
            <i className="far fa-edit mr-1" /> Edit
          </a>
        </h5>
        <button className="btn btn-success" type="button">
          <i className="fe fe-check-verified" /> Active
        </button>
      </div>
    </div>
  )
}

export default ProfileStatus
