import React, {useEffect, useState, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserById} from '../../features/user/userSlice.js'
import {useNavigate} from 'react-router-dom'
import {deleteSubjectById, toggleAdd, updateSubjectStatus} from '../../features/subject/subjectSlice.js'

const SubjectTableRow = ( {subject, load, setLoad} ) => {
  const dispatch = useDispatch()
  const {isFormDisplay} = useSelector( store => store.subject )
  const [inCharge, setInCharge] = useState( {
    manager: '',
  } )
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getUserById(subject.manager));
        const response2 = response.payload;
        
        setInCharge((prevIncharge) => ({
          ...prevIncharge,
          manager: response2,
        }));
      } catch (error) {
      }
    };
    fetchData();
  }, [subject.manager]);
  
  const memoizedManager = useMemo( () => inCharge.manager, [inCharge.manager] )
  
  const navigate = useNavigate()
  const navigateToModify = () => {
    isFormDisplay === false && dispatch( toggleAdd() )
    localStorage.setItem( 'subject-update', JSON.stringify( subject ) )
  }
  const deleteSubject = async ( e ) => {
    const idCode = e.currentTarget.getAttribute( 'id' )
    const idDelete = idCode.split( '_' )[0]
    const nameDelete = idCode.split( '_' )[1]
    const confirm = prompt( 'Write subject code: ' + nameDelete + ' to confirm that you activate/deactivate it:' )
    if (confirm === nameDelete) {
      await dispatch( updateSubjectStatus( {id: idDelete} ) ).then( ( response ) => {
        console.log(response)
        if (response.type.includes( 'fulfilled' ))
          setLoad( !load )
      } ).then( () => {
        alert( 'Updated!' )
      } )
    } else {
      alert( 'Wrong subject\'code' )
    }
  }
  // const deleteSubject = async ( e ) => {
  //   const idCode = e.currentTarget.getAttribute( 'id' )
  //   const idDelete = idCode.split( '_' )[0]
  //   const nameDelete = idCode.split( '_' )[1]
  //   const confirm = prompt( 'Write subject code: ' + nameDelete + ' to confirm that you delete it:' )
  //   if (confirm === nameDelete) {
  //     await dispatch( deleteSubjectById( {id: idDelete} ) ).then( ( response ) => {
  //       if (response.type.includes( 'fulfilled' ))
  //         setLoad( !load )
  //     } ).then( () => {
  //       alert( 'Deleted!' )
  //     } )
  //   } else {
  //     alert( 'Wrong subject\'code' )
  //   }
  // }
  return (
    <tr>
      <td>{ subject.id }</td>
      <td>{ subject.code }</td>
      <td>
        <h2>
          <a>{ subject.name }</a>
        </h2>
      </td>
      <td>
        <h2>
          <a>{ memoizedManager.fullName }</a>
        </h2>
      </td>
      <td>
        <div className={ subject.isEnable === true ? 'badge badge-success' : 'badge badge-danger' }>
          { subject.isEnable === true ? 'Enable' : 'Disable' }
        </div>
      </td>
      <td className='text-right'>
        <div className='actions'>
          <button className='btn btn-sm bg-success-light mr-2'
                  onClick={ navigateToModify }
                  id={ subject.id }
          >
            <i className='fas fa-pen'></i>
          </button>
          <button className='btn btn-sm bg-danger-light' onClick={ deleteSubject } id={ subject.id + '_' + subject.code }>
            <i className={ subject.isEnable === true ? 'fa fa-toggle-on' : 'fa fa-toggle-off' }/>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default SubjectTableRow
