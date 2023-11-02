import React from 'react'

const CardProject = () => {
  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <div className="card flex-fill">
        <div className="card-header">
          <h5 className="card-title mb-1 card-project">Card with button</h5>
          <span className="badge badge-primary ml-2">In Stock</span>
        </div>
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </p>
          <div className="avatar-group">
            <div className="avatar">
              <img
                className="avatar-img rounded-circle border border-white"
                alt="User Image"
              />
            </div>
            <div className="avatar">
              <img
                className="avatar-img rounded-circle border border-white"
                alt="User Image"
              />
            </div>
            <div className="avatar">
              <img
                className="avatar-img rounded-circle border border-white"
                alt="User Image"
              />
            </div>
            <div className="avatar">
              <span className="avatar-title rounded-circle border border-white">
                CF
              </span>
            </div>
          </div>
          <br />
          <a className="btn btn-primary" href="#">
            Go somewhere
          </a>
        </div>
        <div className="card-footer text-muted">
          <p className={'progress-info'}>
            <span>Progress</span>
            <span>75%</span>
          </p>
          <div className="progress progress-xs">
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: '75%' }}
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProject
