import customFetch from '../../utils/axios.js'
import { getJWTFromLocalStorage } from '../../utils/localStorage.js'

export const getAllClassEntitysThunk = async ( url, thunkAPI) => {
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

export const getAllManagersThunk = async (url, thunkAPI) => {
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
export const getClassEntityByIdThunk = async (url, thunkAPI) => {
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
export const getUsersWithinClassThunk = async (url, thunkAPI) => {
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
export const removeClassThunk = async (url, thunkAPI) => {
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

export const addClassThunk = async (url, classRequest, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, {
      code: classRequest.code,
      detail: classRequest.detail,
      status: 'PENDING',
      semester: classRequest.semester,
      manager: {
        id: classRequest.manager
      },
      subject: {
        id: classRequest.subject
      },
      creator: {
        id: classRequest.creator
      },
      students: []
    }
    , {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.status)
  }
}
export const addStudentToClassThunk = async (url, classRequest, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, classRequest
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
export const removeStudentFromClassThunk = async (url, classRequest, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, classRequest
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

export const updateClassThunk = async (url, classRequest, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, {
      code: classRequest.code,
      detail: classRequest.detail,
      status: classRequest.status,
      semester: classRequest.semester,
      manager: {
        id: classRequest.manager
      },
      subject: {
        id: classRequest.subject
      },
      adminId: classRequest.updateBy,
      creator: {
        id: classRequest.creator
      },
      students: classRequest.students
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

export const updateClassStatusThunk = async (url, thunkAPI) => {
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
