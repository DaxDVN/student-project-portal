import customFetch from '../../utils/axios.js'
import { getJWTFromLocalStorage } from '../../utils/localStorage.js'

export const getAllSubjects = async (url, thunkAPI) => {
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
export const getSubjectByIdThunk = async (url, thunkAPI) => {
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
export const deleteSubjectByIdThunk = async (url, thunkAPI) => {
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
export const addSubjectThunk = async (url, subject, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, {
      code: subject.code,
      manager: {
        id: subject.manager.id
      },
      name: subject.name,
      isEnable: subject.isEnable
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
export const updateSubjectThunk = async (url, subject, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, {
      code: subject.code,
      manager: {
        id: subject.manager.id
      },
      name: subject.name,
      isEnable: subject.isEnable
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
export const updateSubjectStatusThunk = async (url, subject, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, {}
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
