import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'
import {
  addJWTToLocalStorage,
  getJWTFromLocalStorage,
  removeJWTToLocalStorage
} from '../../utils/localStorage.js'
import {
  getTokenByIdThunk,
  loginUserThunk,
  registerUserThunk,
  resetPasswordThunk, sendEmailVerifyThunk, updatePasswordThunk,
} from './commonThunk.js'

const initialState = {
  isLoading: false,
  isSidebarOpen: true,
  isDropdownUserOpen: false,
  isDropdownNotificationOpen: false,
  imageChange: false,
  authStatus: true,
  user: getJWTFromLocalStorage()
}

export const registerUser = createAsyncThunk(
  'common/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI)
  }
)
export const sendEmailVerify = createAsyncThunk(
  'common/sendEmailVerify',
  async (user, thunkAPI) => {
    return sendEmailVerifyThunk(`/users/${user.id}/verification`, thunkAPI)
  }
)

export const loginUser = createAsyncThunk(
  'common/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('auth/login', user, thunkAPI)
  }
)

export const resetPassword = createAsyncThunk(
  'common/resetPassword',
  async (user, thunkAPI) => {
    return resetPasswordThunk('/users/password', user, thunkAPI)
  }
)
export const updatePassword = createAsyncThunk(
  'common/updatePassword',
  async (user, thunkAPI) => {
    return updatePasswordThunk(`/users/${user.id}/password`, user, thunkAPI)
  }
)
export const getTokenById = createAsyncThunk(
  'common/getTokenById',
  async (user, thunkAPI) => {
    return getTokenByIdThunk(`/users/${user.id}/token`, thunkAPI)
  }
)

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleAuth: (state) => {
      state.authStatus = !state.authStatus
    },

    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },

    toggleDropdownUser: (state) => {
      state.isDropdownUserOpen = !state.isDropdownUserOpen
      if (state.isDropdownUserOpen && state.isDropdownNotificationOpen) {
        state.isDropdownNotificationOpen = false
      }
    },
    toggleDropdownNotification: (state) => {
      state.isDropdownNotificationOpen = !state.isDropdownNotificationOpen
      if (state.isDropdownNotificationOpen && state.isDropdownUserOpen) {
        state.isDropdownUserOpen = false
      }
    },
    toggleImage: (state) => {
      state.imageChange = !state.imageChange
    },

    resetToggle: (state) => {
      if (state.isDropdownUserOpen) {
        state.isDropdownUserOpen = false
      }
      if (state.isDropdownNotificationOpen) {
        state.isDropdownNotificationOpen = false
      }
      if (state.isSidebarOpen) {
        state.isSidebarOpen = true
      }
    },

    logoutUser: (state) => {
      state.user = null
      // state.isSidebarOpen = false;
      removeJWTToLocalStorage()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        state.authStatus = true
        toast.success('Register New Account Successfully, Please Check Your Email To Verify')
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        if (payload === undefined) {
          toast.error('Already exist!')
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { accessToken, verified } = payload
        state.isLoading = false
        if (verified === false) {
          toast.error('Do you verify? Check your email or get out!')
          return
        }
        addJWTToLocalStorage(accessToken)
        toast.success('WELCOME BACK')
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false
        toast.error('Please check your input!')
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state) => {
        toast.success('Check your email to reset your password')
        state.isLoading = false
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false
        toast.error('Please check your input!')
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePassword.fulfilled, (state) => {
        toast.success('Check your email to reset your password')
        state.isLoading = false
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false
        toast.error('Please check your input!')
      })
      .addCase(getTokenById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTokenById.fulfilled, (state) => {
        toast.success('Check your email to reset your password')
        state.isLoading = false
      })
      .addCase(getTokenById.rejected, (state) => {
        state.isLoading = false
        toast.error('Please check your input!')
      })
      .addCase(sendEmailVerify.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendEmailVerify.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(sendEmailVerify.rejected, (state) => {
        state.isLoading = false
      })
  }
})
export const {
  toggleAuth,
  toggleSidebar,
  toggleDropdownUser,
  toggleDropdownNotification,
  resetToggle,
  toggleImage
} = commonSlice.actions
export default commonSlice.reducer
