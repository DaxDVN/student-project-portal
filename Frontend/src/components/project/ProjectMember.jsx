import React from 'react'

const ProjectMember = (prop) => {
  const tab = prop.tab
  return (
    <div
      className="card-body"
      style={{ display: tab === 'Member' ? 'block' : 'none' }}
    >
      <div className="table-responsive">
        <table className="table table-hover table-center mb-0 datatable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>User created</th>
              <th>Access granted</th>
              <th>Role</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A Block</td>
              <td>101</td>
              <td>Medium</td>
              <td>6</td>
              <td>
                <span className="badge badge-danger">Full</span>
              </td>
              <td className="text-right">
                <div className="actions">
                  <a
                    href="edit-room.html"
                    className="btn btn-sm bg-success-light mr-2"
                  >
                    <i className="fas fa-pen" />
                  </a>
                  <a href="#" className="btn btn-sm bg-danger-light">
                    <i className="fas fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>A Block</td>
              <td>101</td>
              <td>Medium</td>
              <td>6</td>
              <td>
                <span className="badge badge-success">Available</span>
              </td>
              <td className="text-right">
                <div className="actions">
                  <a
                    href="edit-room.html"
                    className="btn btn-sm bg-success-light mr-2"
                  >
                    <i className="fas fa-pen" />
                  </a>
                  <a href="#" className="btn btn-sm bg-danger-light">
                    <i className="fas fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>A Block</td>
              <td>102</td>
              <td>Medium</td>
              <td>6</td>
              <td>
                <span className="badge badge-danger">Full</span>
              </td>
              <td className="text-right">
                <div className="actions">
                  <a
                    href="edit-room.html"
                    className="btn btn-sm bg-success-light mr-2"
                  >
                    <i className="fas fa-pen" />
                  </a>
                  <a href="#" className="btn btn-sm bg-danger-light">
                    <i className="fas fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>B Block</td>
              <td>104</td>
              <td>Big</td>
              <td>8</td>
              <td>
                <span className="badge badge-danger">Full</span>
              </td>
              <td className="text-right">
                <div className="actions">
                  <a
                    href="edit-room.html"
                    className="btn btn-sm bg-success-light mr-2"
                  >
                    <i className="fas fa-pen" />
                  </a>
                  <a href="#" className="btn btn-sm bg-danger-light">
                    <i className="fas fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>A Block</td>
              <td>107</td>
              <td>Medium</td>
              <td>6</td>
              <td>
                <span className="badge badge-success">Available</span>
              </td>
              <td className="text-right">
                <div className="actions">
                  <a
                    href="edit-room.html"
                    className="btn btn-sm bg-success-light mr-2"
                  >
                    <i className="fas fa-pen" />
                  </a>
                  <a href="#" className="btn btn-sm bg-danger-light">
                    <i className="fas fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>A Block</td>
              <td>108</td>
              <td>Medium</td>
              <td>6</td>
              <td>
                <span className="badge badge-success">Available</span>
              </td>
              <td className="text-right">
                <div className="actions">
                  <a
                    href="edit-room.html"
                    className="btn btn-sm bg-success-light mr-2"
                  >
                    <i className="fas fa-pen" />
                  </a>
                  <a href="#" className="btn btn-sm bg-danger-light">
                    <i className="fas fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>B Block</td>
              <td>102</td>
              <td>Medium</td>
              <td>6</td>
              <td>
                <span className="badge badge-warning">2 Available</span>
              </td>
              <td className="text-right">
                <div className="actions">
                  <a
                    href="edit-room.html"
                    className="btn btn-sm bg-success-light mr-2"
                  >
                    <i className="fas fa-pen" />
                  </a>
                  <a href="#" className="btn btn-sm bg-danger-light">
                    <i className="fas fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>B Block</td>
              <td>107</td>
              <td>Small</td>
              <td>6</td>
              <td>
                <span className="badge badge-success">Available</span>
              </td>
              <td className="text-right">
                <div className="actions">
                  <a
                    href="edit-room.html"
                    className="btn btn-sm bg-success-light mr-2"
                  >
                    <i className="fas fa-pen" />
                  </a>
                  <a href="#" className="btn btn-sm bg-danger-light">
                    <i className="fas fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectMember
