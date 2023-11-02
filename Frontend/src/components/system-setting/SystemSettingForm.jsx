import InputInfoSystemSetting from './InputInfoSystemSetting.jsx'
import { addSystemSetting, updateSystemSetting } from '../../features/system-setting/systemSettingSlice.js'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const SystemSettingForm = ( props) => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const [ setting, setSetting] = useState({})
  const [ radio, setRadio] = useState(props.setting.isEnable || null)
  console.log(setting)
  // console.log(props.setting.isEnable)
  // console.log(props.load)
  useEffect(() => {
    if (props.setting !== setting) {
      setSetting(props.setting)
    }
    // const fetchData = async () => {
    //   await dispatch(getCurrentUser()).then((response) => {
    //     setCreator(response.payload)
    //     // setSetting(props.setting)
    //   })
    // }
    // fetchData()
  }, [props.setting])

  const handleInputChangeFromChild = (name, value) => {
    setSetting((prevSetting)=> ({
        ...prevSetting,
        [name]: value
    }))
  }

  // handle radio type
  const handleRadio = (checked) => {
    setRadio(JSON.parse(checked))
    setSetting((prevSetting) => ({
      ...prevSetting,
      isEnable: JSON.parse(checked)
  }))
  }

  //handle select change
  const handleSelectChange = (group) => {
    setSetting((prevSetting) => ({
      ...prevSetting,
      settingGroup: group
    }))
  }

  // hadle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    let response
    if (props.setting.id != null) {
      response = await dispatch(updateSystemSetting({
        id: setting.id,
        creator: {
          id: setting.creator.id
        },
        settingGroup: setting.settingGroup,
        name: setting.name,
        displayOrder: setting.displayOrder,
        isEnable: setting.isEnable,
        description: setting.description,
        adminId: setting.creatorId
      }))
    } else {
        response = await dispatch(
        addSystemSetting({
          id: 0,
          creator: {
            id: setting.creator.id
          },
          settingGroup: setting.settingGroup,
          name: setting.name,
          displayOrder: 0,
          isEnable: setting.isEnable,
          description: setting.description,
          adminId: setting.creator.id
        }))
    }
    if (response.type.includes('fulfilled')) {
      navigateTo('/setting-manager')
      toast.success('Successfully!')
    } else {
      toast.error('Failed, your input is so f*ckin stupid. Check it before you do something!')
    }
  }
  


  return (
    <div className="row">

      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-12">
                  <h5 className="form-title">
                    <span>Setting Information</span>
                  </h5>
                </div>
                <InputInfoSystemSetting
                  type={'text'}
                  label={'Setting Name'}
                  name="name"
                  value={props.load ? props.setting.name : ''}
                  onChange={handleInputChangeFromChild}
                />
                <InputInfoSystemSetting
                  type={'text'}
                  label={'Setting Decription'}
                  name="description"
                  value={props.load ? props.setting.description : ''}
                  onChange={handleInputChangeFromChild}
                />
                <fieldset className="form-group col-12 col-sm-6">
                  <div className="row">
                    <legend className="col-form-label col-sm-3 pt-0">
                      Status
                    </legend>
                    <div className="col-sm-9">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gridRadios"
                          id="gridRadios1"
                          value={true}
                          checked={props.load ? setting.isEnable === true : radio === true}
                          onChange={e => handleRadio(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridRadios1"
                        >
                          Active
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gridRadios"
                          id="gridRadios2"
                          value={false}
                          checked = {props.load ? setting.isEnable === false : radio === false}
                          onChange={e => handleRadio(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridRadios2"
                        >
                          Deactive
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="form-group col-12 col-sm-6">
                  <label className="my-1 mr-2">Setting Group</label>
                  <select className="custom-select custom-select-sm col-12 col-sm-6" defaultValue={props.load ? setting.settingGroup : 'DEFAULT'} onChange={e => handleSelectChange(e.target.value) }>
                  <option value="DEFAULT" disabled>Choose...</option>
                    <option value="SEMESTER" >Semester</option>
                    <option value="ROLE">Role</option>
                    <option value="PERMITTED_EMAIL_DOMAIN">Permitted email domain</option>
                  </select>
                </div>

                <div className="col-12" style={{ textAlign: 'center' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemSettingForm

