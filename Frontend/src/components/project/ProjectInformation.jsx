import React from 'react'

const ProjectInformation = (prop) => {
  const tab = prop.tab
  return (
    <div
      className="card-body"
      style={{ display: tab === 'Information' ? 'block' : 'none' }}
    >
      <h5 className="card-title d-flex justify-content-between">
        <span>Project General</span>
      </h5>
      <div className={'row'}>
        <div className={'col-lg-6'}>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Name</p>
            <p className="col-sm-9">John Doe</p>
          </div>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Date of Birth</p>
            <p className="col-sm-9">24 Jul 1983</p>
          </div>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Email ID</p>
            <p className="col-sm-9">
              <a
                href="https://preschool.dreamguystech.com/cdn-cgi/l/email-protection"
                className="__cf_email__"
                data-cfemail="711b1e191f151e14311409101c011d145f121e1c"
              >
                [email&nbsp;protected]
              </a>
            </p>
          </div>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Mobile</p>
            <p className="col-sm-9">305-310-5857</p>
          </div>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0">Address</p>
            <p className="col-sm-9 mb-0">
              4663 Agriculture Lane,
              <br />
              Miami,
              <br />
              Florida - 33165,
              <br />
              United States.
            </p>
          </div>
        </div>
        <div className={'col-lg-6'}>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Name</p>
            <p className="col-sm-9">John Doe</p>
          </div>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Date of Birth</p>
            <p className="col-sm-9">24 Jul 1983</p>
          </div>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Email ID</p>
            <p className="col-sm-9">
              <a
                href="https://preschool.dreamguystech.com/cdn-cgi/l/email-protection"
                className="__cf_email__"
                data-cfemail="711b1e191f151e14311409101c011d145f121e1c"
              >
                [email&nbsp;protected]
              </a>
            </p>
          </div>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Mobile</p>
            <p className="col-sm-9">305-310-5857</p>
          </div>
          <div className="row">
            <p className="col-sm-3 text-muted mb-0">Address</p>
            <p className="col-sm-9 mb-0">
              4663 Agriculture Lane,
              <br />
              Miami,
              <br />
              Florida - 33165,
              <br />
              United States.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectInformation
