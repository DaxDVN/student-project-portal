import React, {useEffect, useState} from 'react';
import ComboBox from '../common/combo-box/ComboBox.jsx';
import {useDispatch} from 'react-redux';
import {getListOfSystemSettingByGroup} from '../../features/system-setting/systemSettingSlice.js';

const UserFilter = ( {
                       submitFilter,
                       selectedManager,
                       selectedStatus,
                       searchName,
                       setSelectedManager,
                       setSelectedStatus,
                       setSearchName,
                     } ) => {
  
  const dispatch = useDispatch();
  const status = ['Active', 'Deactive', 'Unverified'];
  const [roles, setRoles] = useState( [] );
  
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response
          = await dispatch( getListOfSystemSettingByGroup( {group: 'ROLE'} ) );
        const roleArray = response.payload.content.map( roleEl => {
          return roleEl.name.includes( '_' )
            ? `${ roleEl.name.split( '_' )[0] } ${ roleEl.name.split( '_' )[1] }`
            : roleEl.name;
        } );
        setRoles( roleArray );
      } catch (error) {
        // Xử lý lỗi khi fetch dữ liệu roles
        console.error( 'Error fetching roles:', error );
      }
    };
    fetchData();
  }, [dispatch] );
  
  useEffect( () => {
    submitFilter();
  }, [selectedManager, selectedStatus, searchName] );
  
  const handleRoleChange = ( e ) => {
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
        name='All Role'
        selection={ roles }
        value={ selectedManager }
        onChange={ handleRoleChange }
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


export default UserFilter;
