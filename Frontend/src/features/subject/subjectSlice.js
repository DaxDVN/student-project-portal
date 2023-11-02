import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'
import {
  getJWTFromLocalStorage
} from '../../utils/localStorage.js'
import {
  addSubjectThunk, deleteSubjectByIdThunk,
  getAllSubjects, getSubjectByIdThunk, updateSubjectStatusThunk, updateSubjectThunk,
} from './subjectThunk.js'

const initialState = {
  isLoading: false,
  allSubject: [],
  totalSubjects: 0,
  numOfPages: 1,
  page: 1,
  isFormDisplay: false,
  currentSubjectForm: '',
  token: getJWTFromLocalStorage()
}
export const getListOfSubject = createAsyncThunk(
  'subject/getListOfSubject',
  async (subject, thunkAPI) => {
    subject.name = subject.name !== undefined ? subject.name : ''
    subject.status = subject.status !== undefined ? subject.status : ''
    subject.manager = subject.manager !== undefined ? subject.manager : ''
    console.log(subject.sortBy)
    return getAllSubjects(`/subjects?page=${subject.currentPage}&size=${subject.pageSize}&name=${subject.name}&manager=${subject.manager}&status=${subject.status}&order=${subject.order}&sortBy=${subject.sortBy}`, thunkAPI)
  }
)
export const getListOfSubjectWithoutPaging = createAsyncThunk(
  'subject/getListOfSubjectWithoutPaging',
  async (subject, thunkAPI) => {
    return getAllSubjects('/subjects/all', thunkAPI)
  }
)
export const getSubjectById = createAsyncThunk(
  'subject/getSubjectById',
  async (subject, thunkAPI) => {
    return getSubjectByIdThunk('/subjects/' + subject.id, thunkAPI)
  }
)
export const addSubject = createAsyncThunk(
  'subject/addSubject',
  async (subject, thunkAPI) => {
    return addSubjectThunk('/subjects', subject, thunkAPI)
  }
)

export const updateSubject = createAsyncThunk(
  'subject/updateSubject',
  async (subject, thunkAPI) => {
    return updateSubjectThunk('/subjects/' + subject.id, subject, thunkAPI)
  }
)
export const updateSubjectStatus = createAsyncThunk(
  'subject/updateSubjectStatus',
  async (subject, thunkAPI) => {
    return updateSubjectStatusThunk('/subjects/' + subject.id + '/status', subject, thunkAPI)
  }
)
export const deleteSubjectById = createAsyncThunk(
  'subject/deleteSubjectById',
  async (subject, thunkAPI) => {
    return deleteSubjectByIdThunk('/subjects/' + subject.id, thunkAPI)
  }
)
const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    toggleAdd: (state) => {
      if (state.isFormDisplay === true){
        localStorage.removeItem('subject-update')
      }
      state.isFormDisplay = !state.isFormDisplay
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListOfSubject.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.allSubject = payload.content
      })
      .addCase(getListOfSubject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getListOfSubject.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getListOfSubjectWithoutPaging.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.allSubject = payload.content
      })
      .addCase(getListOfSubjectWithoutPaging.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getListOfSubjectWithoutPaging.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getSubjectById.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getSubjectById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSubjectById.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addSubject.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addSubject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSubject.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(updateSubject.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updateSubject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSubject.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(updateSubjectStatus.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updateSubjectStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSubjectStatus.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteSubjectById.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(deleteSubjectById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSubjectById.rejected, (state) => {
        state.isLoading = false
      })
  }
})
export const {
  toggleAdd
} = subjectSlice.actions
export default subjectSlice.reducer
