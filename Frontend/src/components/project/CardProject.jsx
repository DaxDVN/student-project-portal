import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux';
import {getUserByListId} from '../../features/user/userSlice.js';
import {removeStudentToProject} from '../../features/project/projectSlice.js';

const CardProject = ( {project, setAddStudent, selectedClass, setCurrentProject, role} ) => {
  const dispatch = useDispatch();
  const [loadList, setLoadList] = useState(false)
  const [memberDisplay, setMemberDisplay] = useState( false );
  const [memberList, setMemberList] = useState( [] )
  const [projectCard, setProjectCard] = useState( {
    id: '',
    classId: '',
    description: '',
    groupName: '',
    isActive: false,
    leaderId: '',
    mentorId: '',
    projectName: '',
    title: '',
  } )
  useEffect( () => {
    setProjectCard( {
      ...projectCard,
      id: project.id,
      classId: project.classId,
      description: project.description,
      groupName: project.groupName,
      isActive: project.isActive,
      leaderId: project.leaderId,
      mentorId: project.mentorId,
      projectName: project.projectName,
      title: project.title,
    } )
  }, [] );
  useEffect( () => {
    const fetchData = async () => {
      await dispatch( getUserByListId( {
        list: project.memberIds,
      } ) ).then( ( response ) => {
        if (response.type.includes( 'fulfilled' )) {
          setMemberList( response.payload )
        }
      } )
    }
    fetchData()
  }, [loadList] );
  console.log(loadList)
  async function handleRemove(e) {
    e.preventDefault()
    const array = []
    array.push(
      {
        id: e.currentTarget.getAttribute('id')
      }
    )
    await dispatch(removeStudentToProject({
      id: projectCard.id,
      request: array
    })).then(
      (response) => {
        console.log(response)
        setLoadList(!loadList)
        if (response.type.includes('fulfilled')){
          // setLoadList(!loadList)
        }
      }
    )
  }
  
  return (
    <div className='col-12 col-md-6 col-lg-4'>
      <div className='card flex-fill'>
        <div className='card-header' onClick={ () => setMemberDisplay( !memberDisplay ) }>
          <h5 className='card-title mb-1 card-project'>{ projectCard.projectName }</h5>
          <span className={ projectCard.isActive ? 'badge badge-primary ml-2' : 'badge badge-danger ml-2' }>
            { projectCard.isActive ? 'Active' : 'Deactivate' }
          </span>
        </div>
        <div className='card-body' style={ {display: memberDisplay ? 'block' : 'none'} }>
          { role !== 'STUDENT'
            &&
            (
              <>
                {/*<a className='btn btn-primary' href='#'>*/}
                {/*  View Details*/}
                {/*</a>*/}
                <button className='btn btn-primary'
                        onClick={ () => {
                          setAddStudent( true )
                          setCurrentProject( project )
                        } }
                        style={ {display: selectedClass !== 'All Class' ? 'block' : 'none'} }>
                  Add member
                </button>
              </>
            )
          }
          
          <div className='table-responsive'>
            <table className='table table-hover table-center mb-0 datatable'>
              <tbody>
              {
                memberList !== undefined &&
                memberList.map(
                  el => (
                    <tr key={ el.id }>
                      <td style={{justifyContent: 'space-between', display: 'flex'}}>
                        { el.fullName }
                        <i className={'fas fa-close'} id={el.id} style={{cursor: 'pointer'}} onClick={handleRemove}></i>
                      </td>
                    </tr>
                  ),
                )
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProject
