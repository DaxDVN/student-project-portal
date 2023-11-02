import customFetch from '../../utils/axios.js'
import { getJWTFromLocalStorage } from '../../utils/localStorage.js'

export const getCurrentUserThunk = async (url, thunkAPI) => {
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

export const getUserByIdThunk = async (url, thunkAPI) => {
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
export const getUserByRoleWithoutPagingThunk = async (url, thunkAPI) => {
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
export const getUserByRoleThunk = async (url, thunkAPI) => {
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

export const getAllUsersThunk = async (url, thunkAPI) => {
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
export const getAllStudentsThunk = async (url, thunkAPI) => {
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
export const addUserThunk = async (url, user, thunkAPI) => {
  try {
    let isEnable = false
    let isVerified = false
    if (user.status === 'Disable') {
      isVerified = true
    }
    if (user.status === 'Enable') {
      isVerified = true
      isEnable = true
    }
    const resp = await customFetch.post(url, {
      email: user.email,
      password: user.password,
      fullName: user.fullName,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role.toUpperCase(),
      note: user.note,
      isEnable,
      isVerified
    }, {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    let isEnable = false
    let isVerified = false
    if (user.status === 'Disable') {
      isVerified = true
    }
    if (user.status === 'Enable') {
      isVerified = true
      isEnable = true
    }
    const resp = await customFetch.put(url, {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role.toUpperCase(),
      note: user.note,
      isEnable,
      isVerified
    }, {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
export const changePasswordThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, {
      newPass: user.newPass,
      oldPass: user.oldPass
    }, {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
export const changeAvatarThunk = async (url, user, thunkAPI) => {
  try {
    console.log(user)
    const resp = await customFetch.put(url, {
      avatar: user.avatar
    }, {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
export const updateUserStatusThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, {}, {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
