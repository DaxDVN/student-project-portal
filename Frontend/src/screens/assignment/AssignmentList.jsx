import React from 'react'
import { Link } from 'react-router-dom'
import AssignmentTable from '../../components/assignment/AssignmentTable.jsx'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
const AssignmentList = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <HeaderContent
          pageTitle={'Manage Assignment'}
          pageName={'Assignment List'}
          prePage={'Dashboard'}
        />
      </div>
      <div className="row text-right ml-auto mb-3" style={{display: 'flex', justifyContent:'flex-end'}}>
        <Link to="/new-assignment" className="btn btn-primary">
          Add New Assignment<i className="fas fa-plus"></i>
        </Link>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                <AssignmentTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AssignmentList;
