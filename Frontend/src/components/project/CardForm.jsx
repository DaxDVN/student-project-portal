import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentUser,
} from '../../features/user/userSlice.js';
import { getManagerAssignedClassNotPaging} from '../../features/class/classEntitySlice.js';
import {addProject, toggleAdd} from '../../features/project/projectSlice.js';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CardForm = ( {load, setLoad} ) => {
  const dispatch = useDispatch();
  const {isFormDisplay} = useSelector( ( store ) => store.project );
  const [formData, setFormData] = useState( {
    code: '',
    subject: '',
    detail: '',
    manager: '',
    projectName: '',
    title: '',
    groupName: '',
    description: '',
    class: '',
  } );
  const [classError, setClassError ] = useState('');
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
    if (!formData.title || !formData.groupName || !formData.projectName || !formData.description || !formData.class || formData.class === '-- Select Class--'){
      setClassError('Please input all fields')
      return
    }
    
    await dispatch( getCurrentUser() ).then( async ( response ) => {
      const creator = response.payload.id;
      const responseAdd = await dispatch(
        addProject( {
          title: formData.title,
          groupName:formData.groupName,
          description: formData.description,
          class: formData.class,
          projectName: formData.projectName,
          creator,
        } ),
      );
      if (responseAdd.type.includes( 'fulfilled' )) {
        dispatch( toggleAdd() );
        setFormData({
          ...formData,
          title: '',
          groupName: '',
          detail: '',
          description: '',
          projectName: '',
          class: '-- All classes --',
        })
        setLoad( !load );
      } else {
        if (responseAdd.payload === 409){
          toast.error( 'This Project is already exist' );
        }
        else{
          toast.error( 'Check your input again' );
        }
      }
    } );
  };
  
  useEffect( () => {
    const fetchData = async () => {
      await dispatch( getCurrentUser() )
        .then( async ( manager ) => {
          await dispatch( getManagerAssignedClassNotPaging( {manager: manager.payload.id} ) )
            .then(
              ( response ) => {
                if (response.type.includes( 'fulfilled' )) {
                  console.log(response)
                  setList({...list, subjectList: response.payload}  )
                }
              },
            )
        } )
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
            <>
              <h4>Add Project</h4>
            </>
            <form onSubmit={ handSubmitForm }>
              <div className='col-12'>
                <div className='form-group'>
                  <span className={ 'col-4' }>Project Name</span>
                  <input
                    type={'text'}
                    name='projectName'
                    className='form-control'
                    placeholder='Enter project name here'
                    value={ formData.projectName }
                    onChange={ handleChange }
                  />
                </div>
                <br/>
              </div>
              <div className='col-12'>
                <div className='form-group'>
                  <span className={ 'col-4' }>Title</span>
                  <input
                    type={'text'}
                    name='title'
                    className='form-control'
                    placeholder='Enter title here'
                    value={ formData.title }
                    onChange={ handleChange }
                  />
                </div>
                <br/>
              </div>
              <div className='col-12'>
                <div className='form-group'>
                  <span className={ 'col-4' }>Group Name</span>
                  <input
                    type={'text'}
                    name='groupName'
                    className='form-control'
                    placeholder='Enter group name here'
                    value={ formData.groupName }
                    onChange={ handleChange }
                  />
                </div>
                <br/>
              </div>
 
              <div className='col-12'>
                <div className='form-group'>
                  <span className={ 'col-4' }>Description</span>
                  <textarea
                    rows={3}
                    name='description'
                    className='form-control'
                    placeholder='Enter description here'
                    value={ formData.description }
                    onChange={ handleChange }
                  />
                </div>
                <br/>
              </div>
              
              <div className='col-12'>
                <div className='form-group'>
                  <label>Class</label>
                  <select
                    className='form-control'
                    name={ 'class' }
                    value={ formData.class }
                    onChange={ handleChange }
                  >
                    <option>-- Select Class--</option>
                    { list.subjectList.length &&
                      list.subjectList.map( ( el ) => (
                        <option key={ el.id } value={ el.id }>
                          { el.code }
                        </option>
                      ) ) }
                  </select>
                </div>
              </div>
              <p style={{ color: 'red' }}>{classError || ''}</p>
              
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
