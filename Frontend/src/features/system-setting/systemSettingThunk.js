import customFetch from '../../utils/axios.js'
import { getJWTFromLocalStorage } from '../../utils/localStorage.js'

export const getAllSystemSettings = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}

export const getSystemSettingByIdThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}

export const deleteSystemSettingByIdThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url, {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
export const addSystemSettingThunk = async (url, setting, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, {
      id: setting.id,
      creator: {
        id: setting.creator.id
      },
      settingGroup: setting.settingGroup,
      name: setting.name,
      displayOrder: setting.displayOrder,
      isEnable: setting.isEnable,
      description: setting.description,
      adminId: setting.adminId
    }
    , {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
export const updateSystemSettingThunk = async (url, setting, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, {
      id: setting.id,
      creator: {
        id: setting.creator.id
      },
      settingGroup: setting.settingGroup,
      name: setting.name,
      displayOrder: setting.displayOrder,
      isEnable: setting.isEnable,
      description: setting.description,
      adminId: setting.adminId
    }
    , {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
