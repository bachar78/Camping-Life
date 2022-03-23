import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import campgroundsService from './campgroundsService'

const initialState = {
  campgrounds: [],
  campground: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  isDeleted: false,
  message: '',
}

// // Create a new Task
// export const createTask = createAsyncThunk(
//   'task/create',
//   async (taskData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.member.token
//       return await taskService.createTask(taskData, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )
// // Update a Task
// export const updateTask = createAsyncThunk(
//   'task/update',
//   async (data, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.member.token
//       return await taskService.updateTask(data, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

// //View a single task
// export const getTask = createAsyncThunk(
//   'task/get',
//   async (taskId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.member.token
//       return await taskService.getTask(taskId, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )
// // View my Tasks
// export const getTasks = createAsyncThunk('task/getAll', async (_, thunkAPI) => {
//   try {
//     const token = thunkAPI.getState().auth.member.token
//     return await taskService.getTasks(token)
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString()

//     return thunkAPI.rejectWithValue(message)
//   }
// })
// // Delete a finished Task
// export const deleteTask = createAsyncThunk(
//   'task/delete',
//   async (taskId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.member.token
//       return await taskService.deleteTask(taskId, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const campgroundsSlice = createSlice({
  name: 'campgrounds',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    
  },
})

export const { reset } = campgroundsSlice.actions

export default campgroundsSlice.reducer
