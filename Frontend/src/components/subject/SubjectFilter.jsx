import React, {useEffect, useState} from 'react';
import ComboBox from '../common/combo-box/ComboBox.jsx';
import {useDispatch} from 'react-redux';
import { getUserByRoleWithoutPaging} from '../../features/user/userSlice.js';

const SubjectFilter = (
  {
    submitFilter,
    selectedManager,
    selectedStatus,
    searchName,
    setSelectedManager,
    setSelectedStatus,
    setSearchName,
  },
) => {
  
  const dispatch = useDispatch();
  const status = ['Enable', 'Disable'];
  const [roles, setRoles] = useState( [] );
  
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response =
          await dispatch( getUserByRoleWithoutPaging( {role: 'SUBJECT_MANAGER'} ) );
        console.log( response )
        const roleArray = response.payload.map( roleEl => roleEl.fullName +  " | "+ roleEl.email);
        setRoles( roleArray );
      } catch (error) {
        console.error( 'Error fetching roles:', error );
      }
    };
    fetchData();
  }, [dispatch] );
  
  useEffect( () => {
    submitFilter();
  }, [selectedManager, selectedStatus, searchName] );
  
  const handleManagerChange = ( e ) => {
    setSelectedManager( e.target.value );
  };
  
  const handleStatusChange = ( e ) => {
    setSelectedStatus( e.target.value );
  };
  
  const handleSearchNameChange = ( e ) => {
    setSearchName( e.target.value );
  };
  
  return (
    <div className='form-group' style={ {display: 'flex', alignItems: 'center'} }>
      <div className='top-nav-search mr-5'>
        <form>
          <input
            type='text'
            className='form-control'
            placeholder='Search by name'
            value={ searchName }
            onChange={ handleSearchNameChange }
          />
        </form>
      </div>
      <ComboBox
        name='All Manager'
        selection={ roles }
        value={ selectedManager }
        onChange={ handleManagerChange }
      />
      <ComboBox
        name='All Status'
        selection={ status }
        value={ selectedStatus }
        onChange={ handleStatusChange }
      />
    </div>
  );
};


export default SubjectFilter;
