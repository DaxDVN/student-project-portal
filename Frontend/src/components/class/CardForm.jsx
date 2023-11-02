import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentUser,
  getUserByRoleWithoutPaging,
} from '../../features/user/userSlice.js';
import {getListOfSubjectWithoutPaging} from '../../features/subject/subjectSlice.js';
import {addClass, toggleAdd} from '../../features/class/classEntitySlice.js';
import {toast, ToastContainer} from 'react-toastify';
import InputInfoClass from './InputInfoClass.jsx';
import 'react-toastify/dist/ReactToastify.css';
import {
  getListOfSystemSettingByGroup,
  getListOfSystemSettingWithoutPaging,
} from '../../features/system-setting/systemSettingSlice.js';
import {Form} from 'react-router-dom';

const CardForm = ( {load, setLoad} ) => {
  const subject = JSON.parse( localStorage.getItem( 'subject-classes' ) );
  const dispatch = useDispatch();
  const {isFormDisplay} = useSelector( ( store ) => store.classEntity );
  const [formData, setFormData] = useState( {
    code: '',
    subject: '',
    detail: '',
    manager: '',
    semester: '',
  } );
  
  const [list, setList] = useState( {
    subjectList: {},
    managerList: {},
    semesterList: {},
  } );
  const handleChange = ( event ) => {
    const {name, value} = event.target;
    setFormData( {
      ...formData,
      [name]: value,
    } );
  };
  
  const handSubmitForm = async (e) => {
    e.preventDefault()
    await dispatch( getCurrentUser() ).then( async ( response ) => {
      const creator = response.payload.id;
      const responseAdd = await dispatch(
        addClass( {
          code: formData.code,
          subject: subject === null ? formData.subject : subject.id,
          detail: formData.detail,
          manager: formData.manager,
          semester: formData.semester,
          creator,
        } ),
      );
      if (responseAdd.type.includes( 'fulfilled' )) {
        dispatch( toggleAdd() );
        setFormData({
          ...formData,
          code: '',
          subject: '',
          detail: '',
          manager: '',
          semester: '',
        })
        setLoad( !load );
      } else {
        toast.error( 'All ready have, stupid' );
      }
    } );
  };
  
  useEffect( () => {
    const fetchData = async () => {
      const [response1, response2, response3] = await Promise.all( [
        dispatch( getListOfSubjectWithoutPaging() ),
        dispatch( getUserByRoleWithoutPaging( {role: 'LECTURE'} ) ),
        dispatch( getListOfSystemSettingWithoutPaging( {group: 'SEMESTER'} ) ),
      ] );
      setList( {
        ...list,
        subjectList: response1.payload,
        managerList: response2.payload,
        semesterList: response3.payload,
      } );
    };
    if (isFormDisplay === true) {
      fetchData();
    }
  }, [isFormDisplay] );
  
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={ 1000 }
        style={ {width: '600px'} }
      />
      <div
        style={ {
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
      <div
        className='col-6'
        style={ {
          display: isFormDisplay ? 'block' : 'none',
          zIndex: 999,
          position: 'fixed',
          top: '5vh',
          left: '30vw',
        } }
      >
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={ handSubmitForm }>
              <div className='row'>
                <div className='col-12'>
                  <h5 className='form-title'>
                    <span>Add a Class</span>
                  </h5>
                  <span
                    className='badge badge-info ml-2'
                  >
                    PENDING
                  </span>
                </div>
                <InputInfoClass
                  label={ 'Class Code' }
                  name='code'
                  placeholder='Code'
                  value={ formData.code }
                  onChange={ handleChange }
                />
              </div>
              <div className='col-12'>
                <div className='form-group'>
                  <span className={ 'col-4' }>Detail</span>
                  <textarea
                    rows={3}
                    name='detail'
                    className='form-control'
                    placeholder='Enter detail here'
                    value={ formData.detail }
                    onChange={ handleChange }
                  />
                </div>
                <br/>
              </div>
              
              <div className='col-12'>
                <div className='form-group'>
                  <label>Subject</label>
                  <select
                    className='form-control'
                    name={ 'subject' }
                    value={ subject === null ? formData.subject : subject.id }
                    onChange={ handleChange }
                    disabled={ subject !== null }
                  >
                    <option>-- Select Subject--</option>
                    { list.subjectList.length &&
                      list.subjectList.map( ( el ) => (
                        <option key={ el.id } value={ el.id }>
                          { el.code + ' | ' + el.name }
                        </option>
                      ) ) }
                  </select>
                </div>
              </div>
              <div className='col-12'>
                <div className='form-group'>
                  <label>Semester</label>
                  <select
                    className='form-control'
                    name={ 'semester' }
                    value={ formData.semester  }
                    onChange={ handleChange }
                  >
                    <option>-- Select Semester--</option>
                    { list.semesterList.length &&
                      list.semesterList.map( ( el ) => (
                        <option key={ el.name } value={ el.name }>
                          { 'Semester ' + el.name }
                        </option>
                      ) ) }
                  </select>
                </div>
              </div>
              
              <div className='col-12'>
                <div className='form-group'>
                  <label>Manager</label>
                  <select
                    className='form-control'
                    name={ 'manager' }
                    value={ formData.manager }
                    onChange={ handleChange }
                  >
                    <option>-- Select Manager--</option>
                    { list.managerList.length &&
                      list.managerList.map( ( el ) => (
                        <option key={ el.id } value={ el.id }>
                          { el.fullName + ' | ' + el.email }
                        </option>
                      ) ) }
                  </select>
                </div>
              </div>
              
              <button className='btn btn-primary' onClick={ handSubmitForm }>
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardForm;
