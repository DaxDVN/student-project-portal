import React, {useEffect, useState} from 'react'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import CardStatic from '../../components/common/table/CardStatic.jsx';
import {useDispatch} from 'react-redux';
import {viewDashboard} from '../../features/common/commonSlice.js';
import CardClass from '../../components/class/CardClass.jsx';
import CardForm from '../../components/class/CardForm.jsx';
import {getCurrentUser} from '../../features/user/userSlice.js';
import {getClassByStudent, getManagerAssignedClassNotPaging} from '../../features/class/classEntitySlice.js';
import {getProjectByStudent, getProjectsByManager} from '../../features/project/projectSlice.js';
import CardProject from '../../components/project/CardProject.jsx';


const Dashboard = () => {
  const prePage = ''
  const dispatch = useDispatch();
  const [dashboardInfo, setDashboardInfo] = useState( [] );
  const [currentUser, setCurrentUser] = useState( {} );
  const [studentDashBoard, setStudentDashBoard] = useState(
    {
      assignedClass: [],
      assignedProject: [],
    },
  )
  useEffect( () => {
    const fetchData = async () => {
      await dispatch( getCurrentUser() )
        .then(
          async ( response ) => {
            setCurrentUser( response.payload )
            if (response.payload.role === 'ADMIN' || response.payload.role === 'SUBJECT_MANAGER') {
              console.log( 1 )
              await dispatch( viewDashboard( {role: 'admin'} ) )
                .then(
                  ( response ) => {
                    if (response.type.includes( 'fulfilled' )) {
                      setDashboardInfo( response.payload )
                    }
                  },
                )
            }
            if (response.payload.role === 'STUDENT') {
              try {
                const [classResponse, projectResponse] = await Promise.all( [
                  dispatch( getClassByStudent( {id: response.payload.id} ) ),
                  dispatch( getProjectByStudent( {id: response.payload.id} ) ),
                ] );
                
                setStudentDashBoard( {
                  ...studentDashBoard,
                  assignedClass: classResponse.payload,
                  assignedProject: projectResponse.payload,
                } );
                
              } catch (error) {
                console.error( 'Error fetching class or project data:', error );
              }
            }
            if (response.payload.role === 'LECTURE') {
              try {
                const [classResponse, projectResponse] = await Promise.all( [
                  dispatch( getManagerAssignedClassNotPaging( {manager: response.payload.id} ) ),
                  dispatch( getProjectsByManager( {id: response.payload.id} ) ),
                ] );
                
                setStudentDashBoard( {
                  ...studentDashBoard,
                  assignedClass: classResponse.payload,
                  assignedProject: projectResponse.payload,
                } );
                
              } catch (error) {
                console.error( 'Error fetching class or project data:', error );
              }
            }
          },
        )
    }
    fetchData()
  }, [] );
  console.log(currentUser)
  const cardMock = [
    {
      id: 1,
      color: 'card bg-one w-100',
      iconClass: 'fas fa-user-pen',
      number: dashboardInfo[0],
      type: 'Users',
    },
    {
      id: 2,
      color: 'card bg-two w-100',
      iconClass: 'fas fa-book-atlas',
      number: dashboardInfo[1],
      type: 'Subjects',
    },
    {
      id: 3,
      color: 'card bg-three w-100',
      iconClass: 'fas fa-group-arrows-rotate',
      number: dashboardInfo[2],
      type: 'Classes',
    },
    {
      id: 4,
      color: 'card bg-four w-100',
      iconClass: 'fas fa-project-diagram',
      number: dashboardInfo[3],
      type: 'Projects',
    },
  ]
  return (
    <>
      <HeaderContent
        pageTitle={ 'Welcome back' }
        pageName={ 'Dashboard' }
        prePage={ prePage }
      />
      {
        currentUser !== null &&
        (currentUser.role === 'ADMIN' ||
        currentUser.role === 'SUBJECT_MANAGER') &&
        (
          <div className='row'>
            { cardMock.map( ( card ) => (
              <CardStatic
                color={ card.color }
                iconClass={ card.iconClass }
                number={ card.number }
                type={ card.type }
                key={ card.id }
              />
            ) ) }
          </div>
        )
      }
      {
        (currentUser.role === 'STUDENT' ||
        currentUser.role === 'LECTURE') &&
        (
          <>
            <div className='row'>
              <div className='col-sm-12'>
                <h4>Assigned Class</h4>
                <div className='card card-table'>
                  <div className='card-body'>
                    <div className='table-responsive'>
                      <table className='table table-hover table-center mb-0 datatable'>
                        <thead>
                        <tr>
                          <th>ID</th>
                          <th>Class Code</th>
                          <th>Semester</th>
                          <th>Subject</th>
                          <th>Manager</th>
                          <th>Status</th>
                          {
                            currentUser.role === 'SUBJECT_MANAGER' &&
                            (
                              <th>Action</th>
                            )
                          }
                        </tr>
                        </thead>
                        <tbody>
                        { studentDashBoard.assignedClass.map(
                          ( el ) => (
                            <CardClass key={ el.id } classElement={ el } role={ currentUser ? currentUser.role : 'null' }/>
                          ),
                        ) }
                        </tbody>
                      </table>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4>Assigned Project</h4>
            <section className='comp-section comp-cards'>
              <div className='row'>
                {
                  studentDashBoard.assignedProject !== undefined &&
                  studentDashBoard.assignedProject.map(
                    ( el ) => (
                      <CardProject key={ el.id } project={ el } role={ currentUser ? currentUser.role : 'null' }/>
                    ),
                  )
                }
              </div>
            </section>
          </>
        )
        
      }

    </>
  )
}

export default Dashboard
