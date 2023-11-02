import React from 'react'
const ProfileEx = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between">
          <span>Skills </span>
          <a className="edit-link" href="#">
            <i className="far fa-edit mr-1" /> Edit
          </a>
        </h5>
        <div className="skill-tags">
          <span>Html5</span>
          <span>CSS3</span>
          <span>WordPress</span>
          <span>Javascript</span>
          <span>Android</span>
          <span>iOS</span>
          <span>Angular</span>
          <span>PHP</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileEx
