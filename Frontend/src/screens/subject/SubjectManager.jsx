import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import SubjectTable from '../../components/subject/SubjectTable.jsx'
import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import SubjectForm from '../../components/subject/SubjectForm.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {toggleAdd} from '../../features/subject/subjectSlice.js'
import SubjectFilter from '../../components/subject/SubjectFilter.jsx';

const SubjectManager = () => {
  const location = useLocation()
  const [load, setLoad] = useState( false )
  
  const [selectedManager, setSelectedManager] = useState( '' );
  const [selectedStatus, setSelectedStatus] = useState( 'All Status' );
  const [searchName, setSearchName] = useState( '' );
  
  const [sort, setSort] = useState( {
    sortBy: 'id',
    order: 'ascend',
  } );
  
  const {isFormDisplay} = useSelector( store => store.subject )
  const dispatch = useDispatch()
  useEffect( () => {
    localStorage.removeItem( 'subject-update' )
  }, [location] )
  const subject = JSON.parse( localStorage.getItem( 'subject-update' ) )
  
  const submitFilter = () => {
    setLoad( !load )
  };
  
  return (
    <>
      <div style={ {display: 'flex'} }>
        <HeaderContent
          pageTitle={ 'Subject Management' }
          pageName={ 'Subject Management' }
          prePage={ 'Dashboard' }
        />
      </div>
      <div className={ 'mb-3' } style={ {display: 'flex', justifyContent: 'space-between'} }>
        <SubjectFilter
          submitFilter={submitFilter}
          selectedManager={selectedManager} setSelectedManager={setSelectedManager}
          selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
          searchName={searchName} setSearchName={setSearchName}
        />
        <button className={ 'btn btn-primary' } onClick={ () => {
          dispatch( toggleAdd() )
        } }>
          { isFormDisplay === true ? 'Close Form ' : ('Add form ') }
          { isFormDisplay === true ? (<i className='fas fa-close'></i>)
            : (<i className='fas fa-plus'></i>) }
        </button>
      </div>
      <div className='row'>
        <div className={ 'col-12' }>
          <div className='card card-table'>
            <div className='card-body'>
              <div className='table-responsive'>
                <SubjectTable
                  load={ load } setLoad={ setLoad }
                  selectedManager={selectedManager}
                  selectedStatus={selectedStatus}
                  searchName={searchName}
                  sort={sort} setSort={setSort}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={ {position: 'fixed' , zIndex: '999'} }>
          <SubjectForm subject={ subject } load={ load } setLoad={ setLoad }/>
        </div>
      </div>
    </>
  )
}

export default SubjectManager
