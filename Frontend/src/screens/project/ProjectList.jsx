import CardProject from '../../components/project/CardProject.jsx'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import { Link } from 'react-router-dom'
import React from 'react'

const ProjectList = () => {
  const prePage = 'Dashboard'
  return (
    <>
      <HeaderContent
        pageTitle={'List of teacher'}
        pageName={'List of teacher'}
        prePage={prePage}
      />
      <Link className={'btn btn-primary'} to={'/'}>
        Add <i className="fas fa-plus"></i>
      </Link>
      <section className="comp-section comp-cards">
        <div className="row">
          <CardProject />
          <CardProject />
          <CardProject />
          <CardProject />
          <CardProject />
          <CardProject />
        </div>
      </section>
    </>
  )
}

export default ProjectList
