import customFetch from '../../utils/axios.js'
import { getJWTFromLocalStorage } from '../../utils/localStorage.js'

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.status)
  }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, {
      email: user.email,
      password: user.password
    }, {
      headers: {
        authorization: `Bearer ${getJWTFromLocalStorage()}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.status)
  }
}
export const resetPasswordThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, {
      email: user.email
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.status)
  }
}
export const updatePasswordThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, {
      password: user.password
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.status)
  }
}
export const getTokenByIdThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.status)
  }
}
export const sendEmailVerifyThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.status)
  }
}
