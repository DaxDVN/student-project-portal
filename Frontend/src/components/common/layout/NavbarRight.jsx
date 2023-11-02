import { useDispatch, useSelector } from 'react-redux'
import {
  toggleDropdownNotification,
  toggleDropdownUser,
} from '../../../features/common/commonSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../../../features/user/userSlice.js'

const NavbarRight = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    isDropdownUserOpen,
    imageChange,
  } = useSelector(
    (store) => store.common,
  )
  const [currentUser, setCurrentUser] = useState()
  useEffect(
    () => {
      const fetchData = async () => {
        await dispatch(getCurrentUser())
          .then(
            (response) => {
              if (response.type.includes('fulfilled')){
                setCurrentUser(response.payload);
              }
            }
          )
      }
      fetchData()
    }, [imageChange]
  )
  
  const onClickDropDownUser = () => {
    dispatch(toggleDropdownUser())
  }
  const onClickDropDownNotification = () => {
    dispatch(toggleDropdownNotification())
  }
  
  function handleLogout () {
    localStorage.removeItem('data_access')
    dispatch(toggleDropdownUser())
    navigate('auth')
  }
  
  return (
    <React.Fragment>
      <ul className='nav user-menu'>
        <li
          className={
            !isDropdownUserOpen
              ? 'nav-item dropdown has-arrow'
              : 'nav-item dropdown has-arrow show'
          }
        >
          <a
            href='#'
            className='dropdown-toggle nav-link'
            onClick={onClickDropDownUser}
          >
            <span className='user-img'>
              <img
                className='rounded-circle'
                src={currentUser ? currentUser.avatar : 'https://i.ytimg.com/vi/l3F9zjrH-Ew/maxresdefault.jpg'}
                width={31}
                alt='Ryan Taylor'
              />
            </span>
          </a>
          <div
            className={
              !isDropdownUserOpen ? 'dropdown-menu' : 'dropdown-menu show'
            }
            style={{
              position: isDropdownUserOpen && 'absolute',
              transform: isDropdownUserOpen && 'translate3d(-111px, 60px, 0px)',
              top: isDropdownUserOpen && '0px',
              left: isDropdownUserOpen && '0px',
              willChange: isDropdownUserOpen && 'transform',
            }}
          >
            <div className='user-header'>
              <div className='avatar avatar-sm'>
                <img
                  src={currentUser ? currentUser.avatar : 'https://i.ytimg.com/vi/l3F9zjrH-Ew/maxresdefault.jpg'}
                  alt='User Image'
                  className='avatar-img rounded-circle'
                />
              </div>
              <div className='user-text'>
                <h6>{currentUser ? currentUser.fullName : 'Ngu'}</h6>
                <p className='text-muted mb-0'>{currentUser ? currentUser.role : 'Ngu'}</p>
              </div>
            </div>
            <Link className='dropdown-item' to={'./profile'}>
              My Profile
            </Link>
            <button className='dropdown-item' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </React.Fragment>
  )
}

export default NavbarRight
