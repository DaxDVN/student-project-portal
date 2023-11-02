import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
  getJWTFromLocalStorage,
} from '../../utils/localStorage.js'
import {
  addSystemSettingThunk, deleteSystemSettingByIdThunk,
  getAllSystemSettings, getSystemSettingByIdThunk, updateSystemSettingThunk,
} from './systemSettingThunk.js'

const initialState = {
  isLoading: false,
  allSystemSetting: [],
  totalSystemSetting: 0,
  numOfPages: 1,
  page: 1,
  isFormDisplay: false,
  currentSystemSettingForm: '',
  token: getJWTFromLocalStorage(),
}
export const getListOfSystemSetting = createAsyncThunk(
  'system-setting/getListOfSystemSetting',
  async ( setting, thunkAPI ) => {
    return getAllSystemSettings( `/system-setting?page=${ setting.currentPage }&size=${ setting.pageSize }`, thunkAPI )
  },
)
export const getListOfSystemSettingByGroup = createAsyncThunk(
  'system-setting/getListOfSystemSettingByGroup',
  async ( setting, thunkAPI ) => {
    return getAllSystemSettings( `/system-setting/group?group=` + setting.group, thunkAPI )
  },
)
export const getListOfSystemSettingWithoutPaging = createAsyncThunk(
  'system-setting/getListOfSystemSettingWithoutPaging',
  async ( setting, thunkAPI ) => {
    return getAllSystemSettings( '/system-setting/group/all?group=' + setting.group, thunkAPI )
  },
)
export const getSystemSettingById = createAsyncThunk(
  'system-setting/getSystemSettingById',
  async ( setting, thunkAPI ) => {
    return getSystemSettingByIdThunk( '/system-setting/' + setting.id, thunkAPI )
  },
)
export const addSystemSetting = createAsyncThunk(
  'system-setting/addSystemSetting',
  async ( setting, thunkAPI ) => {
    return addSystemSettingThunk( '/system-setting', setting, thunkAPI )
  },
)

export const updateSystemSetting = createAsyncThunk(
  'system-setting/updateSystemSetting',
  async ( setting, thunkAPI ) => {
    return updateSystemSettingThunk( '/system-setting/' + setting.id, setting, thunkAPI )
  },
)
export const deleteSystemSettingById = createAsyncThunk(
  'system-setting/deleteSystemSettingById',
  async ( setting, thunkAPI ) => {
    return deleteSystemSettingByIdThunk( '/system-setting/' + setting.id, thunkAPI )
  },
)
const settingSlice = createSlice( {
  name: 'setting',
  initialState,
  reducers: {
    toggleAdd: ( state ) => {
      state.isFormDisplay = !state.isFormDisplay
    },
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( getListOfSystemSetting.fulfilled, ( state, {payload} ) => {
        state.isLoading = false
        state.allSubject = payload.content
      } )
      .addCase( getListOfSystemSetting.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getListOfSystemSetting.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getListOfSystemSettingByGroup.fulfilled, ( state, {payload} ) => {
        state.isLoading = false
        state.allSubject = payload.content
      } )
      .addCase( getListOfSystemSettingByGroup.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getListOfSystemSettingByGroup.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getListOfSystemSettingWithoutPaging.fulfilled, ( state, {payload} ) => {
        state.isLoading = false
        state.allSubject = payload.content
      } )
      .addCase( getListOfSystemSettingWithoutPaging.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getListOfSystemSettingWithoutPaging.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getSystemSettingById.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getSystemSettingById.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getSystemSettingById.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addSystemSetting.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addSystemSetting.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( addSystemSetting.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateSystemSetting.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateSystemSetting.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( updateSystemSetting.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( deleteSystemSettingById.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( deleteSystemSettingById.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( deleteSystemSettingById.rejected, ( state ) => {
        state.isLoading = false
      } )
  },
} )
export const {
  toggleAdd,
} = settingSlice.actions
export default settingSlice.reducer
