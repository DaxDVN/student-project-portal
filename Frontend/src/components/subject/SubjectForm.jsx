import InputInfoSubject from './InputInfoSubject.jsx'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserById, getUserByRoleWithoutPaging} from '../../features/user/userSlice.js'
import {addSubject, toggleAdd, updateSubject} from '../../features/subject/subjectSlice.js'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const SubjectForm = ( props ) => {
  const {isFormDisplay} = useSelector( store => store.subject )
  const [subject, setSubject] = useState( {
    subjectCode: '',
    subjectName: '',
    manager: '',
    isEnable: false,
  } )
  const [managerList, setManagerList] = useState()
  const dispatch = useDispatch()
  useEffect( () => {
    if (isFormDisplay === false) {
      setSubject( {
        ...subject,
        subjectCode: '',
        manager: '',
        subjectName: '',
        isEnable: false,
      } )
    }
  }, [isFormDisplay] )
  
  useEffect( () => {
    const fetchData1 = async ( source ) => {
      const [response1, response2] =
        await Promise.all( [
          dispatch( getUserByRoleWithoutPaging( {role: 'SUBJECT_MANAGER'} ) ),
          dispatch( getUserById( source.manager ) ),
        ] )
      setManagerList( response1.payload )
      
      setSubject( {
        ...subject,
        subjectCode: source.code,
        subjectName: source.name,
        manager: response2.payload.id,
        isEnable: source.isEnable === true,
      } )
    }
    const fetchData2 = async () => {
      await dispatch( getUserByRoleWithoutPaging( {role: 'SUBJECT_MANAGER'} ) )
        .then( ( response ) => {
          setManagerList( response.payload )
        } )
    }
    if (props.subject != null) {
      const source = props.subject
      fetchData1( source )
    } else {
      fetchData2()
    }
  }, [props.subject] )
  
  
  const handleInputChange = ( e ) => {
    const {
      name,
      value,
    } = e.target
    setSubject( ( prevSubject ) => ({
      ...prevSubject,
      [name]: value,
    }) )
  }
  
  const handleSubmit = async ( e ) => {
    e.preventDefault()
    let response
    if (props.subject != null) {
      const source = props.subject
      response = await dispatch( updateSubject( {
        id: source.id,
        code: subject.subjectCode,
        name: subject.subjectName,
        manager: {id: subject.manager},
        creator: source.creator,
        isEnable: subject.isEnable,
      } ) )
    } else {
      response = await dispatch( addSubject( {
        code: subject.subjectCode,
        name: subject.subjectName,
        manager: {id: subject.manager},
        isEnable: subject.isEnable,
      } ) )
    }
    if (response.type.includes( 'fulfilled' )) {
      toast.success( 'Successfully!' )
      props.setLoad( !props.load )
      dispatch( toggleAdd() )
    } else {
      if (response.payload.status === 500) {
        toast.error( 'Check Your Input Again' )
      } else {
        toast.error( 'Your Input Is Already Exist' )
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
      <div style={ {
        display: isFormDisplay ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 900,
      } }
           onClick={ () => dispatch( toggleAdd() ) }
      ></div>
      <div className='col-6' style={ {
        display: isFormDisplay ? 'block' : 'none',
        zIndex: 999,
        position: 'fixed',
        top: '20vh',
        left: '30vw',
      } }>
        <div className='card'>
          <div className='card-body'>
            <form>
              <div className='row'>
                <div className='col-12'>
                  <h5 className='form-title'>
                    <span>Add a Subject</span>
                  </h5>
                </div>
                
                <InputInfoSubject
                  label={ 'Subject Code' }
                  name='subjectCode'
                  value={ subject.subjectCode }
                  onChange={ handleInputChange }
                />
                <InputInfoSubject
                  label={ 'Subject Name' }
                  name='subjectName'
                  value={ subject.subjectName }
                  onChange={ handleInputChange }
                />
                <div className='col-12'>
                  <div className='form-group'>
                    <label>Manager</label>
                    <select className='form-control'
                            name={ 'manager' }
                            value={ subject.manager }
                            onChange={ handleInputChange }>
                      <option>-- Select Manager--</option>
                      {
                        managerList != null &&
                        managerList.map(
                          ( el, i ) => (
                            <option key={ i } value={ el.id }>{ el.fullName } | { el.email }</option>
                          ),
                        )
                      }
                    </select>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='form-group'>
                    <label>Status</label>
                    <div className='row'>
                      <div className='radio col-lg-1'></div>
                      <div className='radio col-lg-4'>
                        <label>
                          <input
                            type='radio'
                            name='isEnable'
                            value={ true }
                            checked={ subject.isEnable === 'true' || subject.isEnable === true }
                            onChange={ handleInputChange }
                          /> Enable
                        </label>
                      </div>
                      <div className='radio col-lg-4'>
                        <label>
                          <input
                            type='radio'
                            name='isEnable'
                            value={ false }
                            checked={ subject.isEnable === 'false' || subject.isEnable === false }
                            onChange={ handleInputChange }
                          /> Disable
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <button type='submit' className='btn btn-primary' onClick={ handleSubmit }>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default SubjectForm
