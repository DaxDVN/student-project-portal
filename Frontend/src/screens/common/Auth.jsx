import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'
import '../../assets/css/font.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import {
  loginUser,
  registerUser,
  resetPassword, sendEmailVerify, toggleAuth
} from '../../features/common/commonSlice.js'
import { validateUser } from '../../utils/validateUser.js'
import { useNavigate } from 'react-router-dom'

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
  isMember: true,
  isForgot: false
}
const Auth = () => {
  const [values, setValues] = useState(initialState)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {
    isLoading,
    authStatus
  } = useSelector((store) => store.common)
  const dispatch = useDispatch()
  // const navigate = useNavigate();

  useEffect(() => {
    setValues({ ...values, isMember: authStatus })
  }, [authStatus])
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({
      ...values,
      [name]: value
    })
    setError('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const {
      fullName,
      email,
      phone,
      password,
      isMember,
      isForgot
    } = values
    const validation = validateUser(values)
    if (validation !== '') {
      setError(validation)
      return
    }
    if (isForgot) {
      dispatch(resetPassword({ email }))
      setValues({ ...values, isForgot: false })
      return
    }

    if (isMember) {
      const response = await dispatch(loginUser({
        email,
        password
      }))
      if (response.type.includes("fulfilled")) {
        setTimeout(() => {
          navigate(('/'))
        }, 1000)
      }
      return
    }
    await dispatch(registerUser({
      fullName,
      email,
      phone,
      password
    })).then(
      (response) => {
        if (response.type.includes('fulfilled')) {
          const id = response.payload.user.id
          navigate('../auth')
          dispatch(sendEmailVerify({
            id
          })).then(
            () => {
              toast.success('Verify successfully!')
            }
          )
        }
      }
    )
  }

  const toggleMember = () => {
    setValues({
      ...values,
      fullName: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      isMember: !values.isMember
    })
    setError('')
    dispatch(toggleAuth())
  }
  const toggleForgot = () => {
    setValues({
      ...values,
      isForgot: !values.isForgot
    })
    setError('')
  }
  return (
    <div className='main-wrapper auth-body'>
      <div className='auth-wrapper'>
        <div className='container'>
          <div className='authbox'>
            <ToastContainer
              position='top-center'
              autoClose={1000}
              style={{ width: '600px' }}
            />
            <div className='auth-left'>
              <img
                className='img-fluid'
                src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/643ba095-9995-4da2-bbe3-c31ae72e28e1/da7n227-022174ee-59d5-4d49-a474-ccce5c7077cd.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0M2JhMDk1LTk5OTUtNGRhMi1iYmUzLWMzMWFlNzJlMjhlMVwvZGE3bjIyNy0wMjIxNzRlZS01OWQ1LTRkNDktYTQ3NC1jY2NlNWM3MDc3Y2QuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.mUxAxKRlrvda_nD77vjkMEEBeeph4-2h42ENxEcR8-E'}
                alt='Logo'
              />
            </div>
            <div className='auth-right'>
              <div className='auth-right-wrap'>
                <h1>
                  {values.isForgot
                    ? 'Forgot Password?'
                    : values.isMember
                      ? 'Login'
                      : 'Register'}
                </h1>
                <p className='account-subtitle'>
                  {values.isForgot
                    ? 'Enter your email to get a password reset link'
                    : 'Access to our dashboard'}
                </p>
                <form onSubmit={onSubmit}>
                  {!values.isMember && (
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type={'text'}
                        value={values.fullName}
                        name={'fullName'}
                        onChange={handleChange}
                        placeholder={'Full Name'}
                      />
                    </div>
                  )}
                  <div className='form-group'>
                    <input
                      className='form-control'
                      type={'email'}
                      value={values.email}
                      name={'email'}
                      onChange={handleChange}
                      placeholder={'Email'}
                    />
                  </div>
                  {!values.isMember && (
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type={'text'}
                        value={values.phone}
                        name={'phone'}
                        onChange={handleChange}
                        placeholder={'Phone'}
                      />
                    </div>
                  )}
                  {!values.isForgot && (
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type={'password'}
                        value={values.password}
                        name={'password'}
                        onChange={handleChange}
                        placeholder={'Password'}
                      />
                    </div>
                  )}
                  {!values.isMember && (
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type={'password'}
                        value={values.passwordConfirm}
                        name={'passwordConfirm'}
                        onChange={handleChange}
                        placeholder={'Confirm Password'}
                      />
                    </div>
                  )}

                  <p style={{ color: 'red' }}>{error || ''}</p>

                  <div className='form-group'>
                    <button className='btn btn-primary btn-block' type='submit'>
                      Submit
                    </button>
                  </div>
                </form>

                {values.isMember && (
                  <div className='text-center forgotpass'>
                    <button
                      type={'button'}
                      onClick={toggleForgot}
                      className={'btn btn-outline-secondary'}
                      disabled={isLoading}
                    >
                      {values.isForgot
                        ? 'Remember your password?'
                        : 'Forgot your password?'}
                    </button>
                  </div>
                )}

                {!values.isForgot && (
                  <>
                    <div className='auth-or'>
                      <span className='or-line'/>
                      <span className='span-or'>or</span>
                    </div>
                    <div className='social-auth'>
                      {values.isMember
                        ? (
                          <span>Login with</span>
                          )
                        : (
                          <span>Register with</span>
                          )}

                      <a href='#' className='facebook'>
                        <i className='fab fa-facebook-f'/>
                      </a>
                      <a href='#' className='google'>
                        <i className='fab fa-google'/>
                      </a>
                    </div>
                    <div className='text-center dont-have'>
                      {values.isMember
                        ? 'Don\'t have account?'
                        : 'Already a member?'}
                      <button
                        type={'button'}
                        onClick={toggleMember}
                        className={'btn btn-outline-danger'}
                        style={{ marginLeft: '20px' }}
                        disabled={isLoading}
                      >
                        {values.isMember ? 'Register' : 'Login'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
