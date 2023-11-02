import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getUserById} from '../../features/user/userSlice.js'
import {getSubjectById} from '../../features/subject/subjectSlice.js'
import {Link, useLocation} from 'react-router-dom'
import {removeClass, toggleClassDetail, updateClassStatus} from '../../features/class/classEntitySlice.js'

const CardClass = ( {classElement, load, setLoad} ) => {
  let status = ''
  const location = useLocation()
  useEffect( () => {
    localStorage.removeItem( 'current-class' )
  }, [location] )
  
  switch (classElement.status) {
    case 'PENDING':
      status = 'badge badge-info ml-2'
      break
    case 'ONGOING':
      status = 'badge badge-primary ml-2'
      break
    case 'COMPLETED':
      status = 'badge badge-success ml-2'
      break
    case 'CANCELLED':
      status = 'badge badge-danger ml-2'
      break
  }
  
  const dispatch = useDispatch()
  const [info, setInfo] = useState( {
    manager: '',
    subject: '',
  } )
  
  const cancelledClass = async () => {
    const confirmation = confirm( 'Do you want to cancelled this class?' )
    if (confirmation === false) {
      return
    }
    await dispatch( updateClassStatus( {id: classElement.id} ) )
      .then(
        ( response ) => {
          if (response.type.includes( 'fulfilled' )) {
            setLoad( !load )
          }
        },
      )
  }
  const removePendingClass = async () => {
    const confirmation = confirm( 'Do you want to remove this class?' )
    if (confirmation === false) {
      return
    }
    await dispatch( removeClass( {id: classElement.id} ) )
      .then(
        ( response ) => {
          if (response.type.includes( 'fulfilled' )) {
            setLoad( !load )
          }
        },
      )
  }
  
  useEffect( () => {
    const fetchData = async () => {
      try {
        if (typeof classElement.manager.id !== 'number') {
          return
        }
        const [response1, response2] =
          await Promise.all( [
            dispatch( getUserById( {id: classElement.manager.id} ) ),
            dispatch( getSubjectById( {id: classElement.subject.id} ) ),
          ] )
        
        setInfo( ( prevIncharge ) => ({
          ...prevIncharge,
          manager: response1.payload,
          subject: response2.payload,
        }) )
      } catch (error) {
        // Handle errors here
      }
    }
    fetchData()
  }, [classElement.manager.id, classElement.subject.id] )
  
  const memoizedManager = useMemo( () => info.manager, [info.manager] )
  const memoizedSubject = useMemo( () => info.subject, [info.subject] )
  return (
    <>
      <tr>
        <td>{ classElement.id }</td>
        <td>{ classElement.code }</td>
        <td>{ classElement.semester }</td>
        <td>{ memoizedSubject.code }</td>
        <td>{ memoizedManager ? memoizedManager.fullName : '' }</td>
        <td>{ classElement.status }</td>
        <td>
          <Link to={ '../class-detail' }
                onClick={ () => dispatch( toggleClassDetail( classElement ) ) }
                className='btn btn-info'>View</Link>
          <button className='btn btn-danger'
                  style={ {display: classElement.status === 'CANCELLED' ? 'none' : ''} }
                  onClick={ cancelledClass }>
            Cancel
          </button>
          <button className='btn btn-outline-secondary'
                  style={ {display: classElement.students.length !== 0 ? 'none' : ''} }
                  onClick={ removePendingClass }>
            Remove
          </button>
        </td>
      
      
      </tr>
    </>
  
  
  )
}

export default CardClass
