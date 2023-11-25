import customFetch from '../../utils/axios.js'
import {getJWTFromLocalStorage} from '../../utils/localStorage.js'

export const getProjects = async ( url, thunkAPI ) => {
  try {
    const resp = await customFetch.get( url, {
      headers: {
        authorization: `Bearer ${ getJWTFromLocalStorage() }`,
      },
    } )
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue( error.response.data.message )
  }
}
export const removeClassThunk = async ( url, thunkAPI ) => {
  try {
    const resp = await customFetch.delete( url, {
      headers: {
        authorization: `Bearer ${ getJWTFromLocalStorage() }`,
      },
    } )
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue( error.response.data.message )
  }
}

export const addProjectThunk = async ( url, request, thunkAPI ) => {
  try {
    console.log(request)
    const resp = await customFetch.post( url, {
        title: request.title,
        description: request.description,
        groupName: request.groupName,
        classId: request.class,
        creatorId: request.creator,
        projectName: request.projectName,
        memberIds: [],
      }
      , {
        headers: {
          authorization: `Bearer ${ getJWTFromLocalStorage() }`,
        },
      } )
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue( error.response.status )
  }
}
export const addStudentToClassThunk = async ( url, request, thunkAPI ) => {
  try {
    const resp = await customFetch.post( url, request
      , {
        headers: {
          authorization: `Bearer ${ getJWTFromLocalStorage() }`,
        },
      } )
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue( error.response.data )
  }
}
export const removeStudentFromClassThunk = async ( url, request, thunkAPI ) => {
  try {
    const resp = await customFetch.post( url, request
      , {
        headers: {
          authorization: `Bearer ${ getJWTFromLocalStorage() }`,
        },
      } )
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue( error.response.data.message )
  }
}

export const updateClassThunk = async ( url, request, thunkAPI ) => {
  try {
    const resp = await customFetch.put( url, {
        code: request.code,
        detail: request.detail,
        status: request.status,
        semester: request.semester,
        manager: {
          id: request.manager,
        },
        subject: {
          id: request.subject,
        },
        adminId: request.updateBy,
        creator: {
          id: request.creator,
        },
        students: request.students,
      }
      , {
        headers: {
          authorization: `Bearer ${ getJWTFromLocalStorage() }`,
        },
      } )
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue( error.response.data.message )
  }
}

export const updateClassStatusThunk = async ( url, thunkAPI ) => {
  try {
    const resp = await customFetch.put( url, {}
      , {
        headers: {
          authorization: `Bearer ${ getJWTFromLocalStorage() }`,
        },
      } )
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue( error.response.data.message )
  }
}
