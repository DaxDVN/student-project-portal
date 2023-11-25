import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {
  getJWTFromLocalStorage,
} from '../../utils/localStorage.js'
import {
  addProjectThunk, addStudentToClassThunk,
  getProjects,
  removeClassThunk,
  removeStudentFromClassThunk, updateClassStatusThunk,
  updateClassThunk,
} from './projectThunk.js'
import {getClassEntityByIdThunk} from '../class/classEntityThunk.js';

const initialState = {
  isLoading: false,
  isFormDisplay: false,
  token: getJWTFromLocalStorage(),
}

export const getProjectsByManager = createAsyncThunk(
  'project/getProjectsByManager',
  async ( project, thunkAPI ) => {
    return getProjects( `/projects/manager/${project.id}`, thunkAPI )
  },
)

export const getProjectsByClass = createAsyncThunk(
  'project/getProjectsByClass',
  async ( project, thunkAPI ) => {
    return getProjects( `/projects/class/${project.id}`, thunkAPI )
  },
)

export const addProject = createAsyncThunk(
  'project/addProject',
  async ( request, thunkAPI ) => {
    return addProjectThunk( '/projects', request, thunkAPI )
  },
)

export const getProjectByStudent = createAsyncThunk(
  'classEntity/getProjectByStudent',
  async ( classEntity, thunkAPI ) => {
    return getClassEntityByIdThunk( `/projects/${classEntity.id}/student/join`, thunkAPI )
  },
)
export const addStudentToProject = createAsyncThunk(
  'project/addStudentToProject',
  async ( project, thunkAPI ) => {
    return addStudentToClassThunk( `/projects/${ project.id }/users?action=add`, project.request, thunkAPI )
  },
)
export const removeStudentToProject = createAsyncThunk(
  'project/removeStudentToProject',
  async ( project, thunkAPI ) => {
    return addStudentToClassThunk( `/projects/${ project.id }/users?action=remove`, project.request, thunkAPI )
  },
)
export const removeStudentFromClass = createAsyncThunk(
  'project/removeStudentFromClass',
  async ( project, thunkAPI ) => {
    return removeStudentFromClassThunk( `/classes/${ project.id }/users?action=remove`, project.request, thunkAPI )
  },
)
export const updateClass = createAsyncThunk(
  'project/updateClass',
  async ( request, thunkAPI ) => {
    return updateClassThunk( '/classes/' + request.id, request, thunkAPI )
  },
)
export const updateClassStatus = createAsyncThunk(
  'project/updateClassStatus',
  async ( request, thunkAPI ) => {
    return updateClassStatusThunk( '/classes/' + request.id + '/status', thunkAPI )
  },
)

export const removeClass = createAsyncThunk(
  'project/removeClass',
  async ( request, thunkAPI ) => {
    return removeClassThunk( '/classes/' + request.id, thunkAPI )
  },
)

const projectSlice = createSlice( {
  name: 'project',
  initialState,
  reducers: {
    toggleAdd: ( state ) => {
      state.isFormDisplay = !state.isFormDisplay
    },
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( getProjectsByManager.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getProjectsByManager.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getProjectsByManager.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getProjectsByClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getProjectsByClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getProjectsByClass.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addProject.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addProject.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( addProject.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( updateClass.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateClassStatus.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( updateClassStatus.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( updateClassStatus.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( removeClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( removeClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( removeClass.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addStudentToProject.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addStudentToProject.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( addStudentToProject.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( removeStudentFromClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( removeStudentFromClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( removeStudentFromClass.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getProjectByStudent.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getProjectByStudent.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getProjectByStudent.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( removeStudentToProject.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( removeStudentToProject.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( removeStudentToProject.rejected, ( state ) => {
        state.isLoading = false
      } )
  },
} )
export const {
  toggleAdd
} = projectSlice.actions
export default projectSlice.reducer
