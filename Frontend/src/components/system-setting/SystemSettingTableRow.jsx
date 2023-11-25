import {Link} from 'react-router-dom'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {updateSystemSetting, deleteSystemSettingById} from '../../features/system-setting/systemSettingSlice.js'
import {toast} from 'react-toastify'

const SystemSettingTableRow = ( props ) => {
  const dispatch = useDispatch()
  const [setting, setSeting] = useState( props.setting )
  const [isEnable, setIsEnable] = useState( setting.isEnable )
  const setClassSpan = setting.isEnable === true
    ? 'badge badge-pill badge-success'
    : setting.isEnable === false ? 'badge badge-pill badge-danger' : ' '
  
  const handleButton = async () => {
    const newIsEnable = !isEnable
    setIsEnable( newIsEnable )
    setSeting( prevSetting => ({
      ...prevSetting,
      isEnable: newIsEnable,
    }) )
    const response = await dispatch(
      updateSystemSetting( {
        id: setting.id,
        creator: {
          id: setting.creator.id,
        },
        settingGroup: setting.settingGroup,
        name: setting.name,
        displayOrder: 0,
        isEnable: newIsEnable,
        description: setting.description,
        adminId: setting.creator.id,
      } ),
    )
    if (response.type.includes( 'fulfilled' )) {
      toast.success( 'Successfully!' )
      props.setLoad( !props.load )
    } else {
      toast.error( 'Fail!' )
    }
  }
  const deleteSetting = async ( e ) => {
    const idCode = e.currentTarget.getAttribute( 'id' )
    const idDelete = idCode.split( '_' )[0]
    const confirm = prompt( 'Write setting id: ' + idDelete + ' to confirm that you delete it:' )
    if (confirm === idDelete) {
      await dispatch( deleteSystemSettingById( {id: idDelete} ) ).then( ( response ) => {
        if (response.type.includes( 'fulfilled' ))
          props.setLoad( !props.load )
      } ).then( () => {
        alert( 'Deleted!' )
      } )
    } else {
      alert( 'Wrong' )
    }
  }
  return (
    <tr>
      <td>{ setting.id }</td>
      <td>
        { setting.settingGroup }
      </td>
      <td>
        <h2>
          <Link to={ `/setting-detail/${ setting.id }` }>{ setting.name }</Link>
        </h2>
      </td>
      <td>{ setting.description }</td>
      <td><span className={ setClassSpan }>{ setting.isEnable === true ? 'actice' : 'deactive' }</span></td>
      <td className='text-right'>
        <div className='btn-group btn-toggle mb-2'>
          <button className={ isEnable ? 'btn btn-xs btn-secondary ' : 'btn btn-xs btn-danger ' }
                  onClick={ handleButton } value={ false }>OFF
          </button>
          <button className={ isEnable ? 'btn btn-xs btn-success ' : 'btn btn-xs btn-secondary ' }
                  onClick={ handleButton } value={ true }>ON
          </button>
        </div>
        <div className='actions'>
          <Link to={ `/setting-edit/${ setting.id }` } className='btn btn-sm bg-success-light mr-2'><i
            className='fas fa-pen'></i></Link>
          <div className='btn btn-sm bg-danger-light' onClick={ deleteSetting }
               id={ props.setting.id + '_' + setting.name }><i className='fas fa-trash'></i></div>
        </div>
      </td>
    </tr>
  )
}

export default SystemSettingTableRow
