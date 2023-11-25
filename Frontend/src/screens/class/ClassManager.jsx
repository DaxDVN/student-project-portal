import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import React, {useEffect, useState} from 'react';
import CardClass from '../../components/class/CardClass.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllClasses,
  getAllClassesWithSubject, getManagerAssignedClass,
  toggleAdd,
  togglePagination,
} from '../../features/class/classEntitySlice.js';

import CardForm from '../../components/class/CardForm.jsx';
import Pagination from '../../components/common/table/Pagination.jsx';
import ClassFilter from '../../components/class/ClassFilter.jsx';
import {getCurrentUser} from '../../features/user/userSlice.js';

const ClassManager = () => {
  const prePage = 'Dashboard';
  const [load, setLoad] = useState( false );
  const [classEntities, setClassEntities] = useState( [] );
  const dispatch = useDispatch();
  const {pagination, isFormDisplay} = useSelector( store => store.classEntity )
  const [status, setStatus] = useState( false );
  const [selectedManager, setSelectedManager] = useState( '' );
  const [selectedStatus, setSelectedStatus] = useState( 'All Status' );
  const [searchName, setSearchName] = useState( '' );
  const [selectedSemester, setSelectedSemester] = useState( 'All Semester' );
  const [currentUser, setCurrentUser] = useState()
  useEffect( () => {
    const fetchData = async () => {
      await dispatch( getCurrentUser() ).then( async ( response ) => {
        if (response.payload.role === 'SUBJECT_MANAGER') {
          await dispatch(
            getAllClasses( {
              currentPage: pagination.currentPage - 1,
              pageSize: pagination.pageSize,
              code: searchName,
              manager: selectedManager,
              status: selectedStatus,
              semester: selectedSemester,
              sortBy: '',
              order: '',
            } ),
          ).then( function ( response ) {
            if (response.type.includes( 'fulfilled' )) {
              setClassEntities( response.payload.content );
              setStatus( true );
              dispatch(
                togglePagination( {
                  currentPage: response.payload.page + 1,
                  pageSize: response.payload.size,
                  totalPages: response.payload.totalPages,
                  last: response.payload.last,
                } ),
              );
            } else {
              setStatus( false );
            }
          } );
        }
        setCurrentUser( response.payload )
        if (response.payload.role === 'LECTURE') {
          await dispatch(
            getManagerAssignedClass( {
              currentPage: pagination.currentPage - 1,
              pageSize: pagination.pageSize,
              code: searchName,
              manager: response.payload.id,
              status: selectedStatus,
              semester: selectedSemester,
              sortBy: '',
              order: '',
            } ),
          ).then( function ( response ) {
            if (response.type.includes( 'fulfilled' )) {
              setClassEntities( response.payload.content );
              setStatus( true );
              dispatch(
                togglePagination( {
                  currentPage: response.payload.page + 1,
                  pageSize: response.payload.size,
                  totalPages: response.payload.totalPages,
                  last: response.payload.last,
                } ),
              );
            } else {
              setStatus( false );
            }
          } );
        }
      } )
      
    };
    fetchData();
  }, [load, pagination.currentPage] );
  
  const paging = [];
  for (let i = 1; i <= pagination.totalPages; i++) {
    paging.push( i );
  }
  const handlePageNumber = ( e ) => {
    e.preventDefault()
    const pageNumber = e.currentTarget.getAttribute( 'id' )
    dispatch( togglePagination( {
      currentPage: pageNumber,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
      last: pagination.last,
    } ) )
  }
  
  
  const handleIncreaseOrDecrease = ( e ) => {
    console.log( 1 )
    e.preventDefault();
    const change = e.currentTarget.getAttribute( 'id' );
    if (change.toLowerCase() === 'next' && pagination.last === false) {
      const nextPage = pagination.currentPage + 1;
      dispatch(
        togglePagination( {
          currentPage: nextPage,
          pageSize: pagination.pageSize,
          totalPages: pagination.totalPages,
          last: pagination.last,
        } ),
      );
    }
    if (change.toLowerCase() === 'previous' && pagination.currentPage > 0) {
      const previousPage = pagination.currentPage - 1;
      dispatch(
        togglePagination( {
          currentPage: previousPage,
          pageSize: pagination.pageSize,
          totalPages: pagination.totalPages,
          last: pagination.last,
        } ),
      );
    }
  };
  const submitFilter = () => {
    setLoad( !load )
  };
  return (
    <>
      <HeaderContent
        pageTitle={ 'Class Management' }
        pageName={ 'Class Management' }
        prePage={ prePage }
      />
      <div
        className={ 'row' }
        style={ {display: 'flex', justifyContent: 'flex-end'} }
      >
      
      </div>
      <div
        className={ 'mb-3' }
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
        } }
      >
        {
          currentUser !== undefined && currentUser.role === 'SUBJECT_MANAGER' &&
          (
            <>
              <ClassFilter
                submitFilter={ submitFilter }
                selectedManager={ selectedManager } setSelectedManager={ setSelectedManager }
                selectedStatus={ selectedStatus } setSelectedStatus={ setSelectedStatus }
                searchName={ searchName } setSearchName={ setSearchName }
                selectedSemester={ selectedSemester } setSelectedSemester={ setSelectedSemester }
              />
              <button
                className={ 'btn btn-primary' }
                onClick={ () => {
                  dispatch( toggleAdd() );
                } }
              >
                { isFormDisplay === true ? 'Add New Class ' : 'Add New Class ' }
                { isFormDisplay === true ? (
                  <i className='fas fa-plus'></i>
                ) : (
                  <i className='fas fa-plus'></i>
                ) }
              </button>
            </>
          )
        }
      
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='card card-table'>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table table-hover table-center mb-0 datatable'>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Class Code</th>
                    <th>Semester</th>
                    <th>Subject</th>
                    <th>Manager</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  { status === true ?
                    classEntities.map(
                      ( el ) => (
                        <CardClass key={ el.id } classElement={ el } load={ load } setLoad={ setLoad }/>
                      ),
                    )
                    : (
                      <tr>
                        <td className={ 'pb-5' }>
                          
                          <div className={ 'mt-3' } style={ {position: 'absolute', left: '30vw'} }>
                            <h4>Data not found</h4>
                          </div>
                        </td>
                      </tr>
                    ) }
                  </tbody>
                </table>
              
              </div>
            </div>
          </div>
        </div>
        
        <div style={ {position: 'fixed', zIndex: '999'} }>
          <CardForm load={ load } setLoad={ setLoad }/>
        </div>
      </div>
      <div className={ 'mb-5' } style={ {marginTop: '-20px'} }>
        <Pagination page={ pagination } paging={ paging } handlePageNumber={ handlePageNumber }
                    handleIncreaseOrDecrease={ handleIncreaseOrDecrease }/>
      </div>
    </>
  );
};

export default ClassManager;
