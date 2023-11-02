import SystemSettingTableRow from './SystemSettingTableRow.jsx'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
  getListOfSystemSetting,
  getListOfSystemSettingWithoutPaging,
} from '../../features/system-setting/systemSettingSlice.js'

import {ToastContainer} from 'react-toastify'
import Pagination from '../common/table/Pagination.jsx';

const SystemSettingTable = ( props ) => {
  const [settings, setSettings] = useState( [] )
  const [sortName, setSortName] = useState( 'id' )
  const [classSort, setClassSort] = useState( 'fas fa-sort-down ml-3' )
  const [page, setPage] = useState( {
    totalPages: 0,
    currentPage: 1,
    pageSize: 6,
    last: 10,
  } )
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState( false )
  const [isFilter, setIsFilter] = useState( {
    isEnable: false,
    filterName: '',
  } )
  
  useEffect( () => {
    const fetchData1 = async () => {
      await dispatch( getListOfSystemSetting( {
        currentPage: page.currentPage - 1,
        pageSize: page.pageSize,
      } ) ).then( ( response ) => {
        setSettings( response.payload.content )
        setPage( {
          ...page,
          currentPage: response.payload.page + 1,
          pageSize: response.payload.size,
          totalPages: response.payload.totalPages,
          last: response.payload.last,
        } )
        setSortName( 'id' )
        setClassSort( 'fas fa-sort-down ml-3' )
      } )
    }
    const fetchData2 = async () => {
      await dispatch( getListOfSystemSettingWithoutPaging() )
        .then( ( response ) => {
          const data = response.payload
          setSettings( data.filter( setting => setting.settingGroup.includes( isFilter.filterName ) ) )
          setSortName( 'id' )
          setClassSort( 'fas fa-sort-down ml-3' )
        } )
    }
    if (isFilter.isEnable === false) {
      fetchData1()
    } else {
      fetchData2()
    }
  }, [props.load, page.currentPage, isFilter.filterName] )
  
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
  
  // toggle Dropdown
  const handleToggle = () => {
    setIsOpen( !isOpen )
  }
  // handle filter
  const handleFilter = ( name ) => {
    setIsOpen( false )
    if (name === 'default') {
      setIsFilter( prev => ({
        ...prev,
        isEnable: false,
        filterName: '',
      }) )
    } else {
      setIsFilter( prev => ({
        ...prev,
        isEnable: true,
        filterName: name.toUpperCase(),
      }) )
    }
  }
  
  // handle sort
  const handleSort = ( e, col ) => {
    const className = e.target.className
    if (col !== sortName) {
      setClassSort( 'fas fa-sort-down ml-3' )
      setSortName( col )
      if (col === 'id') {
        setSettings( [...settings].sort( ( a, b ) => b.id - a.id ) )
      } else if (col === 'settingGroup') {
        const data = [...settings].sort( ( a, b ) => a.settingGroup.toLowerCase() > b.settingGroup.toLowerCase() ? -1 : 1 )
        setSettings( data )
      } else if (col === 'name') {
        const data = [...settings].sort( ( a, b ) => a.description.toLowerCase() > b.description.toLowerCase() ? -1 : 1 )
        setSettings( data )
      } else {
        const data = [...settings].sort( ( a, b ) => a.description.toLowerCase() > b.description.toLowerCase() ? -1 : 1 )
        setSettings( data )
      }
    } else {
      if (className.includes( 'up' )) {
        setClassSort( 'fas fa-sort ml-3' )
      } else if (className.includes( 'down' )) {
        setClassSort( 'fas fa-sort-up ml-3' )
        if (col === 'id') {
          setSettings( [...settings].sort( ( a, b ) => a.id - b.id ) )
        } else if (col === 'settingGroup') {
          setSettings( [...settings].sort( ( a, b ) => a.settingGroup.toLowerCase() < b.settingGroup.toLowerCase() ? -1 : 1 ) )
        } else if (col === 'name') {
          setSettings( [...settings].sort( ( a, b ) => a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1 ) )
        } else {
          setSettings( [...settings].sort( ( a, b ) => a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1 ) )
        }
      } else {
        setClassSort( 'fas fa-sort-down ml-3' )
        if (col === 'id') {
          setSettings( [...settings].sort( ( a, b ) => b.id - a.id ) )
        } else if (col === 'settingGroup') {
          setSettings( [...settings].sort( ( a, b ) => a.settingGroup.toLowerCase() > b.settingGroup.toLowerCase() ? -1 : 1 ) )
        } else if (col === 'name') {
          setSettings( [...settings].sort( ( a, b ) => a.description.toLowerCase() > b.description.toLowerCase() ? -1 : 1 ) )
        } else {
          setSettings( [...settings].sort( ( a, b ) => a.description.toLowerCase() > b.description.toLowerCase() ? -1 : 1 ) )
        }
      }
    }
  }
  
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={ 1000 }
        style={ {width: '600px'} }
      />
      <div className=''>
        <div className='row mb-2'>
          <div className='col' style={ {display: 'flex', textAlign: 'center'} }>
            Filter by Group:
            <div className='dropdown ml-2'>
              <button className='btn btn-secondary btn-sm dropdown-toggle'
                      type='button' id='dropdownMenuButton'
                      data-toggle='dropdown'
                      onClick={ handleToggle }
              >
                Select group
              </button>
              <div className={ `dropdown-menu ${ isOpen ? 'show' : ' ' }` } aria-labelledby='dropdownMenuButton'>
                <button className='dropdown-item' onClick={ () => handleFilter( 'default' ) }>Default</button>
                <button className='dropdown-item' onClick={ () => handleFilter( 'role' ) }>Role</button>
                <button className='dropdown-item' onClick={ () => handleFilter( 'semester' ) }>Semester</button>
                <button className='dropdown-item' onClick={ () => handleFilter( 'email' ) }>Permitted email domain
                </button>
              </div>
            </div>
          </div>
          {/* <div className='col'>

          </div> */ }
        </div>
        {/* <Row style={{textAlign: 'center' , display:'flex' }}>
                <Col style={{margin: '30px', textAlign:'right'}}>Filter by User</Col>
                <Col style={{ margin: '20px', textAlign:'left'}}>
                    <DropdownButton id="dropdown-basic-button" title="Choose User">
                        {users.map( user => (
                            <Dropdown.Item key={user.id} onClick={() => handleFilter(user)}>{user.name}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
            </Row> */ }
      </div>
      <hr/>
      <table className='table table-hover table-center mb-0 datatable'>
        <thead>
        <tr>
          <th>ID<i className={ sortName !== 'id' ? 'fas fa-sort ml-3' : classSort }
                   style={ sortName !== 'id' ? {color: 'gray'} : {color: 'black'} }
                   onClick={ ( e ) => handleSort( e, 'id' ) }></i></th>
          <th>Setting Group<i className={ sortName !== 'settingGroup' ? 'fas fa-sort ml-3' : classSort }
                              style={ sortName !== 'settingGroup' ? {color: 'gray'} : {color: 'black'} }
                              onClick={ ( e ) => handleSort( e, 'settingGroup' ) }></i></th>
          <th>Setting Name<i className={ sortName !== 'name' ? 'fas fa-sort ml-3 color-gray' : classSort }
                             style={ sortName !== 'name' ? {color: 'gray'} : {color: 'black'} }
                             onClick={ ( e ) => handleSort( e, 'name' ) }></i></th>
          <th>Description<i className={ sortName !== 'description' ? 'fas fa-sort ml-3' : classSort }
                            style={ sortName !== 'description' ? {color: 'gray'} : {color: 'black'} }
                            onClick={ ( e ) => handleSort( e, 'description' ) }></i></th>
          <th>Status</th>
          <th className='text-right'>Action</th>
        </tr>
        </thead>
        <tbody>
        { settings.map( ( setting ) => (
          <SystemSettingTableRow
            key={ setting.id }
            setting={ setting }
            load={ props.load }
            setLoad={ props.setLoad }
          />
        ) ) }
        </tbody>
      </table>
      
      { isFilter.isEnable === false &&
        <div className=' ml-2 mt-3 ' style={ {display: 'flex', justifyContent: 'flex-end'} }>
          <Pagination page={ page } paging={ paging } handlePageNumber={ handlePageNumber }
                      handleIncreaseOrdecrease={ handleIncreaseOrDecrease }/>
        </div>
      }
    </>
  )
}

export default SystemSettingTable
