import React from 'react'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import AssignmentForm from '../../components/assignment/AssignmentForm'
const NewAssignment = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <HeaderContent
          pageTitle={'Manage Assignment'}
          pageName={'Add Assignment'}
          prePage={'Dashboard'}
        />
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <AssignmentForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default NewAssignment
