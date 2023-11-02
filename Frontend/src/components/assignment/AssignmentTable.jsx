import React, {useEffect, useState} from 'react'
import customFetch from '../../utils/axios.js'
import {Link} from 'react-router-dom'
import {toggleAdd} from '../../features/subject/subjectSlice.js';

const AssignmentTable = () => {
  const [formDisplay, setFormDisplay] = useState( false );
  
  const [formData, setFormData] = useState( {
    id: '',
    title: '',
    description: '',
    subject: '',
  } )
  const [editID, setEditID] = useState()
  const [data, setData] = useState( [] )
  const [refresh, setRefresh] = useState( 0 )
  const {id, title, description, creatorName, date, subjectName  } = formData
  const [deleteSuccess, setDeleteSuccess] = useState( false )
  const handleChange = ( e ) => {
    setFormData( {...formData, [e.target.name]: e.target.value} )
  }
  const handleDelete = async ( deleteid ) => {
    const confirmation = confirm('Do you want to delete this assignment?')
    if (confirmation === false){
      return
    }
    try {
      await customFetch
        .delete( `http://localhost:8080/api/assignments/${ deleteid }` )
        .then(
          ( response ) => {
            setDeleteSuccess( true )
          },
        )
      setData( ( prevData ) => prevData.filter( assignment => assignment.id !== deleteid ) ) // Cập nhật state để loại bỏ mục đã xóa
    } catch (err) {
      console.error( 'Error deleting record:', err )
    } finally {
      setTimeout( () => setDeleteSuccess( false ), 3000 )
    }
  }
  const handleEdit = ( editIDNotState ) => {
    customFetch
      .get( `http://localhost:8080/api/assignments/${ editIDNotState }` )
      .then( ( res ) => {
        setFormData( res.data )
      } )
      .catch( ( err ) => console.log( err ) )
  }
  const handleUpdate = () => {
    if (id && title && description) {
      customFetch.put( `http://localhost:8080/api/assignments/${ editID }`, formData )
                 .then( ( response ) => {
                   if (response.status === 200) {
                     setFormData( {
                       id: '',
                       title: '',
                       description: '',
                     } )
                     setRefresh( refresh + 1 )
                   } else {
                     console.log( 'AssignmentTable.jsx -> line 43 -> fix or remove' )
                   }
                 } )
                 .catch( ( err ) => console.log( err ) )
    }
  }
  
  useEffect(
    () => {
      customFetch
        .get( 'http://localhost:8080/api/assignments' )
        .then( ( res ) => {
          setData( res.data )
          console.log( res.data )
        } )
        .catch( ( err ) => console.log( err ) )
    },
    [refresh],
  )
  
  return (
    <>
      { deleteSuccess &&
        <div className='alert alert-success'>
          Assignment deleted successfully!</div> }
      <table className='table table-hover table-center mb-0 datatable'>
        <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Subject</th>
          
          <th className='text-right'>Action</th>
        </tr>
        </thead>
        <tbody>
        { data.map( ( assignment ) => (
          <tr key={ assignment.id }>
            <td>{ assignment.id }</td>
            <td>
              { assignment.title }
            </td>
            <td>{ assignment.description }</td>
            <td>{ assignment.subjectName }</td>
            <td className='text-right'>
              <button
                className='btn btn-warning'
                onClick={ () => {
                  handleEdit( assignment.id )
                  setEditID( assignment.id )
                  setFormDisplay( true )
                } }
              >
                Edit
              </button>
              <button
                className='btn btn-danger'
                onClick={ () => handleDelete( assignment.id ) }
              >
                Delete
              </button>
            </td>
          </tr>
        ) ) }
        </tbody>
      </table>
      <div style={ {position: 'fixed', zIndex: '999'} }>
        <div
          onClick={ () => setFormDisplay( false ) }
          style={ {
            display: formDisplay ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 900,
          } }
        ></div>
        <div className='col-6' style={ {
          display: formDisplay ? 'block' : 'none',
          zIndex: 999,
          position: 'fixed',
          top: '5vh',
          left: '30vw',
        } }>
          <div className='card'>
            <div className='card-body'>
              <form>
                <div className='row'>
                  <div className='col-11' style={ {display: 'flex', justifyContent: 'space-between'} }>
                    <h5 className='form-title'>
                      <span>Assignment Detail</span>
                    </h5>
                  </div>
                  <div className='col-1'>
                    <i className={ 'fa fa-close' } onClick={ () => setFormDisplay( false ) }/>
                  </div>
                  <div className='col-12'>
                    <div className='form-group'>
                      <label>Title</label>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={ title }
                        onChange={ handleChange }
                      />
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='form-group'>
                      <label>Subject Name</label>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={ subjectName }
                        onChange={ handleChange }
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='form-group'>
                      <label>Creator</label>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={ creatorName }
                        onChange={ handleChange }
                        readOnly={true}
                        
                      />
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='form-group'>
                      <label>Date Created</label>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={ date }
                        onChange={ handleChange }
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='form-group'>
                      <label>Description</label>
                      <textarea
                        className='form-control'
                        name='description'
                        value={ description }
                        onChange={ handleChange }
                        rows={ 4 }
                      />
                    </div>
                  </div>
                  
                  <div className='col-6'>
                    <button type='submit' className='btn btn-primary'
                            onClick={ () => {
                              handleUpdate()
                            } }>
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      
      </div>
    
    </>
  )
}

export default AssignmentTable
