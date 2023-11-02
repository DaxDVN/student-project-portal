import {Outlet, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'

import {jwtDecode} from 'jwt-decode';

const ProtectedRouteAdmin = ( props ) => {
  const token = localStorage.getItem('data_access')
  const navigate = useNavigate();
  useEffect( () => {
    if(token && jwtDecode(token).role !== 'ADMIN'){
      navigate('./')
    }
  }, [token && jwtDecode(token).role !== 'ADMIN'] );
  const decodeData = jwtDecode(token)
  if (decodeData.role === 'ADMIN'){
    return <Outlet {...props} />
  }
  else if (decodeData.role !== 'ADMIN'){
    navigate('./')
  }
}

export default ProtectedRouteAdmin
