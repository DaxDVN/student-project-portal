import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../features/user/userSlice.js';

const ProtectedRouteCommon = ({ children }) => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState({
    check: false,
    nextPage: false,
    load: true,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getCurrentUser());
        if (response.type.includes('fulfilled')) {
          setAuth((prevAuth) => ({ ...prevAuth, check: true, nextPage: true }));
        } else {
          setAuth((prevAuth) => ({ ...prevAuth, check: true, nextPage: false }));
        }
      } catch (error) {
        // Handle errors here
      }
    };
    fetchData();
  }, [dispatch]);
  
  if (auth.check) {
    if (auth.nextPage) {
      return children;
    } else {
      return <Navigate to="/auth" />;
    }
  } else {
    // You might want to return a loading state or some placeholder while checking authentication
    return null;
  }
};

export default ProtectedRouteCommon;
