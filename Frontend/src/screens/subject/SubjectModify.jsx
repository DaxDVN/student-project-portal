import SubjectForm from '../../components/subject/SubjectForm.jsx'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import React from 'react'

const SubjectModify = () => {
  return (
    <>
      <HeaderContent
          pageTitle={'Subject Edit'}
          pageName={'Subject Edit'}
          prePage={'Subject Manager'}
        />
      <SubjectForm/>
    </>
  )
}

export default SubjectModify
