import links from '../utils/links.js'
import React, {useEffect, useState} from 'react'
import NavLinkSideBar from '../components/common/layout/NavLinkSideBar.jsx';
import {useLocation, useParams} from 'react-router-dom';
import {getCurrentUser} from '../features/user/userSlice.js';
import {useDispatch} from 'react-redux';

const Sidebar = () => {
  const [active, setActive] = useState( 'Dashboard' )
  const [user, setUser] = useState();
  const [check, setCheck] = useState( false );
  const dispatch = useDispatch()
  useEffect(
    () => {
      setUser( undefined )
      setCheck( false )
      const fetchData = async () => {
        await dispatch( getCurrentUser() )
          .then(
            ( response ) => {
              if (response.type.includes( 'fulfilled' )) {
                setUser( response.payload )
                setCheck( true )
              }
            },
          )
      }
      fetchData();
    }, [],
  )
  if (check === true) {
    return (
      <div className='sidebar' id='sidebar' style={ {zIndex: '800'} }>
        <div className='sidebar-inner slimscroll'>
          <div id='sidebar-menu' className='sidebar-menu'>
            <ul>
              <li className='menu-title'>
                <span>Main Menu</span>
              </li>
              
              {
                links.map( ( element ) => (
                  <NavLinkSideBar
                    element={ element }
                    key={ element.id }
                    active={ active }
                    setActive={ setActive }
                    user={user}
                  />
                ) ) }
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
}

export default Sidebar
