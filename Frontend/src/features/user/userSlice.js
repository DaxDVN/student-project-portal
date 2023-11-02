import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
  getJWTFromLocalStorage,
} from '../../utils/localStorage.js'
import {
  addUserThunk, changeAvatarThunk, changePasswordThunk,
  getAllStudentsThunk,
  getAllUsersThunk,
  getCurrentUserThunk,
  getUserByIdThunk,
  getUserByRoleThunk,
  getUserByRoleWithoutPagingThunk,
  updateUserStatusThunk,
  updateUserThunk,
} from './userThunk.js'

const initialState = {
  token: getJWTFromLocalStorage(),
  isFormDisplay: false,
}

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async ( user, thunkAPI ) => {
    return getCurrentUserThunk( '/users/me', thunkAPI )
  },
)

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async ( user, thunkAPI ) => {
    return getUserByIdThunk( '/users/' + user.id, thunkAPI )
  },
)

export const getUserByRoleWithoutPaging = createAsyncThunk(
  'user/getUserByRoleWithoutPaging',
  async ( user, thunkAPI ) => {
    return getUserByRoleWithoutPagingThunk( '/users/role/' + user.role + '/all', thunkAPI )
  },
)
export const getUserByRole = createAsyncThunk(
  'user/getUserByRole',
  async ( user, thunkAPI ) => {
    user.currentPage = user.currentPage !== undefined ? user.currentPage : ''
    user.pageSize = user.pageSize !== undefined ? user.pageSize : ''
    return getUserByRoleThunk( '/users/role/' + user.role + `?page=${ user.currentPage }&size=${ user.pageSize }`, thunkAPI )
  },
)

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async ( user, thunkAPI ) => {
    return getAllUsersThunk( `/users?page=${ user.currentPage }&size=${ user.pageSize }&role=${ user.selectedRole }&status=${ user.selectedStatus }&name=${ user.searchName }&order=${ user.order }&sortBy=${ user.sortBy }`, thunkAPI )
  },
)
export const getAllStudents = createAsyncThunk(
  'user/getAllStudents',
  async ( user, thunkAPI ) => {
    return getAllStudentsThunk( `/users/students?page=${ user.currentPage }&size=${ user.pageSize }`, thunkAPI )
  },
)
export const addUser = createAsyncThunk(
  'user/addUser',
  async ( user, thunkAPI ) => {
    return addUserThunk( '/users', user, thunkAPI )
  },
)
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ( user, thunkAPI ) => {
    return updateUserThunk( '/users/' + user.id, user, thunkAPI )
  },
)
export const updateUserStatus = createAsyncThunk(
  'user/updateUserStatus',
  async ( user, thunkAPI ) => {
    return updateUserStatusThunk( `/users/${ user.id }/status`, thunkAPI )
  },
)
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ( user, thunkAPI ) => {
    return changePasswordThunk( `/users/${ user.id }/password-change`, user, thunkAPI )
  },
)
export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async ( user, thunkAPI ) => {
    return changeAvatarThunk( `/users/${ user.id }/avatar`, user, thunkAPI )
  },
)

const userSlice = createSlice( {
  name: 'user',
  initialState,
  reducers: {
    toggleForm: ( state ) => {
      state.isFormDisplay = !state.isFormDisplay
    },
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( getCurrentUser.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getCurrentUser.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getCurrentUser.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getUserById.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getUserById.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getUserById.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getUserByRoleWithoutPaging.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getUserByRoleWithoutPaging.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getUserByRoleWithoutPaging.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getAllUsers.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getAllUsers.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getAllUsers.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addUser.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addUser.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( addUser.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateUserStatus.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateUserStatus.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( updateUserStatus.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateUser.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateUser.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( updateUser.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( changePassword.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( changePassword.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( changePassword.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getAllStudents.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getAllStudents.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getAllStudents.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getUserByRole.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getUserByRole.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getUserByRole.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( changeAvatar.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( changeAvatar.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( changeAvatar.rejected, ( state ) => {
        state.isLoading = false
      } )
  },
} )
export const {
  toggleForm,
} = userSlice.actions
export default userSlice.reducer
