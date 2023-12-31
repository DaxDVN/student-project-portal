import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {
  getJWTFromLocalStorage,
} from '../../utils/localStorage.js'
import {
  
  addClassThunk,
  addStudentToClassThunk,
  getAllClassEntitysThunk, getAllManagersThunk,
  getClassEntityByIdThunk,
  getUsersWithinClassThunk,
  removeClassThunk,
  removeStudentFromClassThunk, updateClassStatusThunk,
  updateClassThunk,
} from './classEntityThunk.js'

const initialState = {
  isLoading: false,
  currentClass: {},
  totalClassEntity: 0,
  numOfPages: 1,
  page: 1,
  isFormDisplay: false,
  pagination: {
    totalPages: 0,
    currentPage: 1,
    pageSize: 6,
    last: false,
  },
  token: getJWTFromLocalStorage(),
}
export const getAllClasses = createAsyncThunk(
  'classEntity/getAllClasses',
  async ( classEntity, thunkAPI ) => {
    if(isNaN(classEntity.currentPage)){
      classEntity.currentPage = 0
    }
    if(classEntity.pageSize === undefined){
      classEntity.pageSize = 6
    }
    if(classEntity.code === undefined){
      classEntity.code = ''
    }
    if(classEntity.status === undefined){
      classEntity.status = ''
    }
    let managerEmail = ''
    if(classEntity.manager.split('|')[1] === undefined){
      managerEmail = ''
    }
    else{
      managerEmail = classEntity.manager.split('|')[1]
    }
    return getAllClassEntitysThunk( `/classes?page=${ classEntity.currentPage }&size=${ classEntity.pageSize }&code=${ classEntity.code }&manager=${ managerEmail }&status=${ classEntity.status }&semester=${ classEntity.semester }`, thunkAPI )
  },
)
export const getManagerAssignedClass = createAsyncThunk(
  'classEntity/getManagerAssignedClass',
  async ( classEntity, thunkAPI ) => {
    if(isNaN(classEntity.currentPage)){
      classEntity.currentPage = 0
    }
    if(classEntity.pageSize === undefined){
      classEntity.pageSize = 6
    }
    if(classEntity.code === undefined){
      classEntity.code = ''
    }
    if(classEntity.status === undefined){
      classEntity.status = ''
    }
    return getAllClassEntitysThunk( `/classes/${classEntity.manager}/manager?page=${ classEntity.currentPage }&size=${ classEntity.pageSize }&code=${ classEntity.code }&status=${ classEntity.status }&semester=${ classEntity.semester }`, thunkAPI )
  },
)
export const getManagerAssignedClassNotPaging = createAsyncThunk(
  'classEntity/getManagerAssignedClassNotPaging',
  async ( classEntity, thunkAPI ) => {
    return getAllClassEntitysThunk( `/classes/${classEntity.manager}/manager/not-paging`, thunkAPI )
  },
)

export const getAllManagers = createAsyncThunk(
  'classEntity/getAllManagers',
  async ( classEntity, thunkAPI ) => {
    return getAllManagersThunk( `/classes/manager`, thunkAPI )
  },
)
export const getAllClassesWithSubject = createAsyncThunk(
  'classEntity/getAllClassesWithSubject',
  async ( subject, thunkAPI ) => {
    return getAllClassEntitysThunk( `/subjects/${ subject.id }/classes?page=${ subject.currentPage }&size=${ subject.pageSize }`, thunkAPI )
  },
)
export const getClassEntityById = createAsyncThunk(
  'classEntity/getClassEntityById',
  async ( classEntity, thunkAPI ) => {
    return getClassEntityByIdThunk( '/classes/' + classEntity.id, thunkAPI )
  },
)
export const getClassByStudent = createAsyncThunk(
  'classEntity/getClassByStudent',
  async ( classEntity, thunkAPI ) => {
    return getClassEntityByIdThunk( `/classes/${classEntity.id}/student/join`, thunkAPI )
  },
)
export const getUsersWithinClass = createAsyncThunk(
  'classEntity/getUsersWithinClass',
  async ( classEntity, thunkAPI ) => {
    return getUsersWithinClassThunk( `/classes/${ classEntity.id }/users?page=${ classEntity.currentPage }&size=${ classEntity.pageSize }`, thunkAPI )
  },
)
export const getStudentsWithinClass = createAsyncThunk(
  'classEntity/getStudentsWithinClass',
  async ( classEntity, thunkAPI ) => {
    return getUsersWithinClassThunk( `/classes/${ classEntity.id }/student/in`, thunkAPI )
  },
)
export const getStudentsFreeWithinClass = createAsyncThunk(
  'classEntity/getStudentsFreeWithinClass',
  async ( classEntity, thunkAPI ) => {
    return getUsersWithinClassThunk( `/users/class/${ classEntity.id }/free`, thunkAPI )
  },
)
export const getStudentWithOutClass = createAsyncThunk(
  'classEntity/getStudentWithOutClass',
  async ( classEntity, thunkAPI ) => {
    return getUsersWithinClassThunk( `/classes/${ classEntity.id }/student/out?page=${ classEntity.currentPage }&size=${ classEntity.pageSize }`, thunkAPI )
  },
)

export const addClass = createAsyncThunk(
  'classEntity/addClass',
  async ( request, thunkAPI ) => {
    return addClassThunk( '/classes', request, thunkAPI )
  },
)
export const addStudentToClass = createAsyncThunk(
  'classEntity/addStudentToClass',
  async ( classEntity, thunkAPI ) => {
    return addStudentToClassThunk( `/classes/${ classEntity.id }/users?action=add`, classEntity.request, thunkAPI )
  },
)
export const removeStudentFromClass = createAsyncThunk(
  'classEntity/removeStudentFromClass',
  async ( classEntity, thunkAPI ) => {
    return removeStudentFromClassThunk( `/classes/${ classEntity.id }/users?action=remove`, classEntity.request, thunkAPI )
  },
)
export const updateClass = createAsyncThunk(
  'classEntity/updateClass',
  async ( request, thunkAPI ) => {
    return updateClassThunk( '/classes/' + request.id, request, thunkAPI )
  },
)
export const updateClassStatus = createAsyncThunk(
  'classEntity/updateClassStatus',
  async ( request, thunkAPI ) => {
    return updateClassStatusThunk( '/classes/' + request.id + '/status', thunkAPI )
  },
)

export const removeClass = createAsyncThunk(
  'classEntity/removeClass',
  async ( request, thunkAPI ) => {
    return removeClassThunk( '/classes/' + request.id, thunkAPI )
  },
)

const classEntitySlice = createSlice( {
  name: 'classEntity',
  initialState,
  reducers: {
    toggleClassDetail: ( state, currentClass ) => {
      state.currentClass = currentClass
      localStorage.setItem( 'current-class', JSON.stringify( currentClass ) )
    },
    toggleAdd: ( state ) => {
      state.isFormDisplay = !state.isFormDisplay
    },
    togglePagination: ( state, request ) => {
      const page = request.payload
      state.pagination.currentPage = page.currentPage
      state.pagination.totalPages = page.totalPages
      state.pagination.pageSize = page.pageSize
      state.pagination.last = page.last
    },
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( getAllClasses.fulfilled, ( state, {payload} ) => {
        state.isLoading = false
        state.allClassEntity = payload.content
      } )
      .addCase( getAllClasses.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getAllClasses.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getAllClassesWithSubject.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getAllClassesWithSubject.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getAllClassesWithSubject.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getStudentsFreeWithinClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getStudentsFreeWithinClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getStudentsFreeWithinClass.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getAllManagers.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getAllManagers.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getAllManagers.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getClassEntityById.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getClassEntityById.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getClassEntityById.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getUsersWithinClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getUsersWithinClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getUsersWithinClass.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( addClass.rejected, ( state ) => {
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
      .addCase( addStudentToClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( addStudentToClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( addStudentToClass.rejected, ( state ) => {
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
      .addCase( getStudentWithOutClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getStudentWithOutClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getStudentWithOutClass.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getStudentsWithinClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getStudentsWithinClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getStudentsWithinClass.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getManagerAssignedClass.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getManagerAssignedClass.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getManagerAssignedClass.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getManagerAssignedClassNotPaging.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getManagerAssignedClassNotPaging.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getManagerAssignedClassNotPaging.rejected, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getClassByStudent.fulfilled, ( state ) => {
        state.isLoading = false
      } )
      .addCase( getClassByStudent.pending, ( state ) => {
        state.isLoading = true
      } )
      .addCase( getClassByStudent.rejected, ( state ) => {
        state.isLoading = false
      } )
  },
} )
export const {
  toggleClassDetail,
  toggleAdd,
  togglePagination,
} = classEntitySlice.actions
export default classEntitySlice.reducer
