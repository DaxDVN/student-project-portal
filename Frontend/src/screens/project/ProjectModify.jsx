import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import React from 'react'

const ProjectModify = () => {
  const prop = {
    isNewProject: true
  }
  const isNewProject = prop.isNewProject
  const pageName = isNewProject ? 'Create New Project' : 'Edit Project'
  const prePage = 'Dashboard'
  return (
    <>
      <HeaderContent
        pageName={pageName}
        pageTitle={pageName}
        prePage={prePage}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Basic Examples</h5>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="form-group row">
                  <label className="col-form-label col-lg-2">Group Left</label>
                  <div className="col-lg-10">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          @
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-lg-2">Group Right</label>
                  <div className="col-lg-10">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                          @example.com
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-lg-2">URL Example</label>
                  <div className="col-lg-10">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">https://</span>
                      </div>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-lg-2">
                    Group with Price
                  </label>
                  <div className="col-lg-10">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input type="text" className="form-control" />
                      <div className="input-group-append">
                        <span className="input-group-text">.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row mb-0">
                  <label className="col-form-label col-lg-2">
                    Project Name
                  </label>
                  <div className="col-lg-10">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">avatar_creator</span>
                      </div>
                      <div className="input-group-prepend">
                        <span className="input-group-text">name</span>
                      </div>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Checkbox and Radio Addons</h5>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="form-group row">
                  <label className="col-form-label col-lg-2">Checkbox</label>
                  <div className="col-lg-10">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <input type="checkbox" />
                        </span>
                      </div>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="form-group row mb-0">
                  <label className="col-form-label col-lg-2">Radio</label>
                  <div className="col-lg-10">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <input type="radio" />
                        </span>
                      </div>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Buttons with dropdowns</h5>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="form-group row">
                  <label className="col-form-label col-lg-2">
                    Radio and Text Addons
                  </label>
                  <div className="col-lg-10">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button
                          type="button"
                          className="btn btn-white dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Action
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                          <div role="separator" className="dropdown-divider" />
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Left dropdown"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mb-0">
                  <label className="col-form-label col-lg-2">Two Addons</label>
                  <div className="col-lg-10">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Right dropdown"
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-white dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Action
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                          <div role="separator" className="dropdown-divider" />
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectModify
