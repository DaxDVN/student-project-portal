import CardProject from '../../components/project/CardProject.jsx'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import ComboBox from '../../components/common/combo-box/ComboBox.jsx';
import {useDispatch} from 'react-redux';
import {getManagerAssignedClassNotPaging} from '../../features/class/classEntitySlice.js';
import {getCurrentUser} from '../../features/user/userSlice.js';
import {getProjectsByClass, getProjectsByManager, toggleAdd} from '../../features/project/projectSlice.js';
import CardForm from '../../components/project/CardForm.jsx';
import ClassStudentFree from '../../components/project/ClassStudentFree.jsx';

const ProjectList = () => {
  const prePage = 'Dashboard'
  const dispatch = useDispatch()
  const [load, setLoad] = useState( false )
  const [classList, setClassList] = useState( [] )
  const [projectList, setProjectList] = useState( [] )
  const [addStudent, setAddStudent] = useState(false)
  const [selectedClass, setSelectedClass] = useState('All Class')
  const [currentClass, setCurrentClass] = useState();
  const [currentProject, setCurrentProject] = useState({})
  useEffect( () => {
    const fetchData = async () => {
      await dispatch( getCurrentUser() )
        .then( async ( manager ) => {
          await dispatch( getManagerAssignedClassNotPaging( {manager: manager.payload.id} ) )
            .then(
              ( response ) => {
                if (response.type.includes( 'fulfilled' )) {
                  setClassList( response.payload )
                }
              },
            )
        } )
    }
    fetchData()
  }, [load] );
  
  useEffect( () => {
    const fetchData = async () => {
      if (selectedClass === 'All Class'){
        await dispatch( getCurrentUser() )
          .then( async ( manager ) => {
            await dispatch( getProjectsByManager( {id: manager.payload.id} ) )
              .then(
                ( response ) => {
                  if (response.type.includes( 'fulfilled' )) {
                    setProjectList( response.payload )
                  }
                },
              )
          } )
      }
      else{
        for (let i = 0; i < classList.length; i ++){
          if (classList[i].code === selectedClass){
            setCurrentClass(classList[i])
            await dispatch( getProjectsByClass( {id: classList[i].id} ) )
              .then(
                ( response ) => {
                  if (response.type.includes( 'fulfilled' )) {
                    setProjectList( response.payload )
                  }
                },
              )
          }
        }
      }
    }
    fetchData()
  }, [load, selectedClass] );
  const handleClassChange = ( e ) => {
    setSelectedClass( e.target.value );
  };
  console.log(load)
  return (
    <>
      <HeaderContent
        pageTitle={ 'Project Management' }
        pageName={ 'Project Management' }
        prePage={ prePage }
      />
      <div className={ 'mb-3' } style={ {display: 'flex', justifyContent: 'space-between'} }>
        <ComboBox
          name='All Class'
          selection={ classList.map( el => el.code ) }
          value={ selectedClass }
          onChange={ handleClassChange}
        />
        <Link className={ 'btn btn-primary' } to={ '/' }
              onClick={ async (e) => {
                e.preventDefault()
                await dispatch(toggleAdd())
              } }>
          Add <i className='fas fa-plus'></i>
        </Link>
      </div>
      <section className='comp-section comp-cards'>
        <div className='row'>
          {
            projectList !== undefined &&
            projectList.map(
              ( el ) => (
                <CardProject
                  key={ el.id } setCurrentProject={setCurrentProject}
                  project={ el } addStudent={addStudent} setAddStudent={setAddStudent} selectedClass={selectedClass} load={load} setLoad={setLoad}/>
              ),
            )
          }
        </div>
      </section>
      <div style={ {position: 'fixed', zIndex: '999'} }>
        <CardForm load={ load } setLoad={ setLoad } />
      </div>
        <ClassStudentFree addStudent={addStudent} setAddStudent={setAddStudent} currentClass={currentClass} currentProject={currentProject}/>
      
    </>
  )
}

export default ProjectList
