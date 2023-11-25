import SubjectTableRow from './SubjectTableRow.jsx'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getListOfSubject} from '../../features/subject/subjectSlice.js'
import Pagination from '../common/table/Pagination.jsx';


const SubjectTable = ( props ) => {
  const [subjects, setSubjects] = useState( [] )
  const [status, setStatus] = useState( 'false' );
  const [arrow, setArrow] = useState({
    attribute : 'id',
    direction : 'up'
  })
  const [page, setPage] = useState( {
    totalPages: 0,
    currentPage: 1,
    pageSize: 5,
    last: 10,
  } )
  const dispatch = useDispatch()
  
  useEffect( () => {
    const fetchData = async () => {
      await dispatch( getListOfSubject( {
        currentPage: page.currentPage - 1,
        pageSize: page.pageSize,
        manager: props.selectedManager === '' ? ''
          : props.selectedManager.split( '|' )[1],
        status: props.selectedStatus,
        name: props.searchName,
        order: props.sort.order,
        sortBy: props.sort.sortBy,
      } ) ).then( ( response ) => {
        if (response.type.includes( 'fulfilled' )) {
          setSubjects( response.payload.content )
          setPage( {
            ...page,
            currentPage: response.payload.page + 1,
            pageSize: response.payload.size,
            totalPages: response.payload.totalPages,
            last: response.payload.last,
          } )
          setStatus( 'true' )
        } else {
          setStatus( 'false' )
        }
      } )
    }
    fetchData()
  }, [props.load, page.currentPage, props.sort] )
  
  const paging = []
  for (let i = 1; i <= page.totalPages; i++) {
    paging.push( i )
  }
  
  const handlePageNumber = ( e ) => {
    e.preventDefault()
    const pageNumber = e.currentTarget.getAttribute( 'id' )
    setPage( {
      ...page,
      currentPage: pageNumber,
    } )
  }
  
  const handleIncreaseOrDecrease = ( e ) => {
    e.preventDefault()
    const change = e.currentTarget.getAttribute( 'id' )
    if (change.toLowerCase() === 'next' && page.last === false) {
      const nextPage = page.currentPage + 1
      setPage( {
        ...page,
        currentPage: nextPage,
      } )
    }
    if (change.toLowerCase() === 'previous' && page.currentPage > 0) {
      const previousPage = page.currentPage - 1
      setPage( {
        ...page,
        currentPage: previousPage,
      } )
    }
  }
  const switchArrowDirection = () => {
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach((arrow) => {
      if (arrow.classList.contains('down')) {
        arrow.classList.remove('down');
        arrow.classList.add('up');
      }
    });
  };
  const sortColumn = (e) => {
    switchArrowDirection();
    if (e.currentTarget.lastChild.getAttribute('class') === 'arrow up ml-1'){
      e.currentTarget.lastChild.setAttribute('class', 'arrow down ml-1')
    } else{
      e.currentTarget.lastChild.setAttribute('class', 'arrow up ml-1')
    }
    const sortBy = e.currentTarget.getAttribute('id');
    props.setSort((prevSort) => {
      if (prevSort.sortBy === sortBy) {
        const newOrder = prevSort.order === 'ascend' ? 'descend' : 'ascend';
        return { sortBy, order: newOrder };
      } else {
        return { sortBy, order: 'ascend' };
      }
    });
  };
  
  return (
    <>
      <table className='table table-hover table-center mb-0 datatable'>
        <thead>
        <tr>
          <th id={'id'} onClick={sortColumn}>
            ID
            <i className='arrow up ml-1'></i>
          </th>
          <th id={'code'} onClick={sortColumn}>
            Code
            <i className='arrow up ml-1'></i>
          </th>
          <th id={'name'} onClick={sortColumn}>
            Name
            <i className='arrow up ml-1'></i>
          </th>
          <th id={'manager'} onClick={sortColumn}>
            Manager
            <i className='arrow up ml-1'></i>
          </th>
          <th>Status</th>
          <th className='text-right'>Action</th>
        </tr>
        </thead>
        <tbody>
        { status === 'true' ?
          subjects.map( subject => (
              <SubjectTableRow
                key={ subject.id }
                subject={ subject }
                load={ props.load }
                setLoad={ props.setLoad }
              />
            ),
          ) : (
            <tr>
              <td className={'pb-5'}>
                
                <div className={ 'mt-3' } style={ {position: 'absolute', left: '30vw'} }>
                  <h4>Data not found</h4>
                </div>
              </td>
            </tr>

          ) }
        </tbody>
      </table>
      {status === 'true' &&
      <Pagination page={ page } paging={ paging } handlePageNumber={ handlePageNumber }
                  handleIncreaseOrDecrease={ handleIncreaseOrDecrease }/>
      }
    </>
  )
}

export default SubjectTable
