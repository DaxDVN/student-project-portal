import React, {useEffect, useState} from 'react'
import customFetch from '../../utils/axios.js'

const AssignmentEditForm = () => {
  const [formData, setFormData] = useState( {
    id: '',
    title: '',
    description: '',
  } )
  const [editID, setEditID] = useState()
  const [data, setData] = useState( [] )
  const [refresh, setRefresh] = useState( 0 )
  const {id, title, description, subject, creator, date} = formData
  
  const handleDelete = ( id ) => {
    customFetch
      .delete( `http://localhost:8080/api/assignments/${ id }` )
      .then( ( res ) => {
        console.log( 'DELETD RECORD::::', res )
      } )
      .catch( ( err ) => console.log( err ) )
  }
  const handleEdit = ( id ) => {
    customFetch
      .get( `http://localhost:8080/api/assignments/${ id }` )
      .then( ( res ) => {
        setFormData( res.data )
        console.log( 'edit record' )
      } )
      .catch( ( err ) => console.log( err ) )
  }
  const handleUpdate = () => {
    if (id && title && description && subject && creator && date && status) {
      customFetch.put( `http://localhost:8080/api/assignments/${ editID }`, formData )
                 .then( ( response ) => {
                   if (response.status === 200) {
                     setFormData( {
                       id: '',
                       title: '',
                       description: '',
                     } )
                     setRefresh( refresh + 1 )
                   }
                   else{
                     console.log("AssignmentTable.jsx -> line 43 -> fix or remove")
                   }
                 } )
                 .catch( ( err ) => console.log( err ) )
    }
  }
  useEffect( () => {
    customFetch
      .get( 'http://localhost:8080/api/assignments' )
      .then( ( res ) => {
        setData( res.data )
      } )
      .catch( ( err ) => console.log( err ) )
  }, [refresh] )
  return (
    <>
      <form>
        <div className='row'>
          <div className='col-12'>
            <h5 className='form-title'>
              <span>Assignment Update</span>
            </h5>
          </div>
          <div className='col-12 col-sm-6'>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                className='form-control'
                name='title'
                value={ title }
                // eslint-disable-next-line no-undef
                onChange={ handleChange }
              />
            </div>
          </div>
          <div className='col-12 col-sm-6'>
            <div className='form-group'>
              <label>Description</label>
              <textarea
                type='text'
                className='form-control'
                name='description'
                value={ description }
                style={ {height: '60px'} }
                // eslint-disable-next-line no-undef
                onChange={ handleChange }
              />
            </div>
          </div>
          
          <div className='col-12'>
            <button type='submit' className='btn btn-primary'
                    onClick={ ( e ) => {
                      handleUpdate()
                    } }>
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AssignmentEditForm
