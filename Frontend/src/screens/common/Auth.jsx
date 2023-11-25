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
  const [loadingReset, setLoadingReset] = useState(false);
  const [loadingWaiting, setLoadingWaiting] = useState(true);
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
      setLoadingReset(true)
      dispatch(resetPassword({ email }))
        .then((response) => {
          if (response.type.includes('fulfilled')){
            setValues({ ...values, isForgot: false })
            setLoadingWaiting(false)
            setTimeout(
              ()=>{
                setLoadingWaiting(true)
                setLoadingReset(false)
              },2000
            )
          }
          else{
            toast.error('There is an error when sending data')
          }
        })
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
            (response) => {
              if(!response.type.includes('fulfilled')){
                toast.error('There is an error when sending data')
              }
              else{
                toast.success('Register New Account Successfully, Please Check Your Email To Verify')
              }
            }
          )
        }
        else{
          if (response.payload === 508){
            setError('This user is already exist')
          }
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
          <div className='authbox' style={{position:'relative'}}>
            <ToastContainer
              position='top-center'
              autoClose={1000}
              style={{ width: '600px' }}
            />
            <div style={{
              position: 'fixed',
              top: 0, bottom: 0,
              left: 0, right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 800,
              display: loadingReset ? 'block' : 'none'
            }}>
            </div>
            <div style={{
              backgroundColor:'white',
              position: 'absolute',
              zIndex: 999, width: '400px',
              height: '200px', top: '20%',
              left: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              display: loadingReset ? 'flex' : 'none',
            }}>
              {
                loadingWaiting === true ?
                  (
                    <>
                     <span className="spinner-border spinner-border-sm mr-2" role="status"
                           style={{width: '50px', height: '50px', borderWidth: '5px'}}></span>
                      <h4 className={'mt-3'}>Waiting for mail sending</h4>
                    </>
                   
                  ) :
                (
                  <>
                    <i className={'fas fa-check'} style={{fontSize: '50px'}}></i>
                    <h4 className={'mt-3'}>Check Your Email </h4>
                    <h4>To Reset Password</h4>
                  </>
                )
              }
            </div>
            <div className='auth-left' style={{padding: 0}}>
              <img
                className='img-fluid'
                src={'https://i.pinimg.com/736x/a4/75/c8/a475c8dc7c69dc5098e494d6912bae62.jpg'}
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
