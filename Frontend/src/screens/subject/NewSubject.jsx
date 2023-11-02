import SubjectForm from '../../components/subject/SubjectForm.jsx'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import React from 'react'

const NewSubject = () => {
  return (
    <>
      <HeaderContent
          pageTitle={'New Subject'}
          pageName={'New Subject'}
          prePage={'Dashboard'}
        />
      <SubjectForm />
    </>
  )
}

export default NewSubject
