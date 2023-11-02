import React, { useState } from 'react'
import CardUpdateForm from './CardUpdateForm.jsx'
import CardSpecialSetting from './CardSpecialSetting.jsx'
import TabClass from './TabClass.jsx'

const ClassUpdate = ( prop) => {
  const tab = prop.tab
  const currentClass = prop.currentClass
  const [tabSetting, setTabSetting] = useState('update')
  return (
    <div className='card-body' style={{ display: tab === 'Information' ? 'block' : 'none' }}>
      <h5 className='card-title d-flex justify-content-between'>
        <span>Edit Class</span>
        <i className="fa fa-close" onClick={()=> prop.setIsUpdate(!prop.isUpdate)}/>
      </h5>
      <div className='row'>
        <div className='col-1'></div>
        <CardUpdateForm
          currentClass={currentClass}
          tabSetting={tabSetting}
          setTabSetting={setTabSetting}/>
      </div>
    </div>
  )
}

export default ClassUpdate
