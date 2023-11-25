import React, {useEffect, useState} from 'react';
import ComboBox from '../common/combo-box/ComboBox.jsx';
import {useDispatch} from 'react-redux';
import {getAllManagers} from '../../features/class/classEntitySlice.js';
import {getListOfSystemSettingWithoutPaging} from '../../features/system-setting/systemSettingSlice.js';

const ClassFilter = (
  {
    submitFilter,
    selectedManager,
    selectedStatus,
    selectedSemester,
    searchName,
    setSelectedManager,
    setSelectedStatus,
    setSelectedSemester,
    setSearchName,
  },
) => {
  
  const dispatch = useDispatch();
  const [comboBox, setComboBox] = useState({
    manager: [],
    semester: [],
    status: ['CANCELLED','COMPLETED','ONGOING','PENDING']
  });
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response =
          await dispatch( getAllManagers() );
        const managerArray = response.payload.map( roleEl => roleEl.fullName +  " | "+ roleEl.email);
        
        const responseSemester = await dispatch(
          getListOfSystemSettingWithoutPaging({
            group: "SEMESTER"
          })
        )
        const semesterArray = responseSemester.payload.map(el => el.name);
        setComboBox({...comboBox, manager: managerArray, semester: semesterArray} );
        
      } catch (error) {
        console.error( 'Error fetching roles:', error );
      }
    };
    fetchData();
  }, [dispatch] );
  
  useEffect( () => {
    submitFilter();
  }, [selectedManager, selectedStatus, selectedSemester, searchName] );
  
  const handleManagerChange = ( e ) => {
    setSelectedManager( e.target.value );
  };
  
  const handleStatusChange = ( e ) => {
    setSelectedStatus( e.target.value );
  };
  
  const handleSearchNameChange = ( e ) => {
    setSearchName( e.target.value );
  };
  const handleSemesterChange = ( e ) => {
    setSelectedSemester( e.target.value );
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
        selection={ comboBox.manager}
        value={ selectedManager }
        onChange={ handleManagerChange }
      />
      <ComboBox
        name='All Status'
        selection={ comboBox.status }
        value={ selectedStatus }
        onChange={ handleStatusChange }
      />
      <ComboBox
        name='All Semester'
        selection={ comboBox.semester }
        value={ selectedSemester }
        onChange={ handleSemesterChange }
      />
    </div>
  );
};


export default ClassFilter;
