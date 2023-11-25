import React, {useEffect, useState} from 'react'
import {ToastContainer} from 'react-toastify'
import {getTokenById, updatePassword} from '../../features/common/commonSlice.js'
import {useDispatch} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'

const Password = () => {
  const [values, setValues] = useState( {
    password: '',
    passwordConfirm: '',
  } )
  const [error, setError] = useState( '' )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  
  useEffect(
    () => {
      const fetchUser = async () => {
        const response = await dispatch( getTokenById( {
          id: params.id,
        } ) )
        if (response.type.includes( 'rejected' )) {
          navigate( '../../../auth' )
        }
      }
      fetchUser()
    }, [],
  )
  
  const handleChange = ( e ) => {
    const name = e.target.name
    const value = e.target.value
    setValues( {
      ...values,
      [name]: value,
    } )
    setError( '' )
  }
  const onSubmit = async ( e ) => {
    e.preventDefault()
    const {
      password,
      passwordConfirm,
    } = values
    
    if (!password) {
      setError( 'All fields are required!' )
    }
    
    if (password.length < 7 || password.length > 17) {
      setError( 'Please input password in range 7 to 17!' )
    }
    
    if (password !== passwordConfirm) {
      setError( 'Password confirm is not the same!' )
    }
    
    await dispatch( updatePassword( {
      id: params.id,
      password: values.password,
    } ) ).then( ( response ) => {
      if (response.type.includes( 'fulfilled' ))
        navigate( '../../../auth' )
    } )
  }
  
  return (
    <div className='main-wrapper auth-body'>
      <div className='auth-wrapper'>
        <div className='container'>
          <div className='authbox'>
            <ToastContainer
              position='top-center'
              autoClose={ 1000 }
              style={ {width: '600px'} }
            />
            <div className='auth-left'>
              <img
                className='img-fluid'
                src={ 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/643ba095-9995-4da2-bbe3-c31ae72e28e1/da7n227-022174ee-59d5-4d49-a474-ccce5c7077cd.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0M2JhMDk1LTk5OTUtNGRhMi1iYmUzLWMzMWFlNzJlMjhlMVwvZGE3bjIyNy0wMjIxNzRlZS01OWQ1LTRkNDktYTQ3NC1jY2NlNWM3MDc3Y2QuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.mUxAxKRlrvda_nD77vjkMEEBeeph4-2h42ENxEcR8-E' }
                alt='Logo'
              />
            </div>
            <div className='auth-right'>
              <div className='auth-right-wrap'>
                <h1>
                  { 'Update your password :) => Forget again and you will be arrested' }
                </h1>
                <form onSubmit={ onSubmit }>
                  <div className='form-group'>
                    <input
                      className='form-control'
                      type={ 'password' }
                      value={ values.password }
                      name={ 'password' }
                      onChange={ handleChange }
                      placeholder={ 'Password' }
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='form-control'
                      type={ 'password' }
                      value={ values.passwordConfirm }
                      name={ 'passwordConfirm' }
                      onChange={ handleChange }
                      placeholder={ 'Confirm Password' }
                    />
                  </div>
                  
                  <p style={ {color: 'red'} }>{ error || '' }</p>
                  
                  <div className='form-group'>
                    <button className='btn btn-primary btn-block' type='submit'>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Password
