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

//View a single Campground
export const getCampground = createAsyncThunk(
  'campground/get',
  async (campId, thunkAPI) => {
    try {
      return await campgroundsService.getCampground(campId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
// View all Campground
export const getCampgrounds = createAsyncThunk(
  'campgrounds/getAll',
  async (_, thunkAPI) => {
    try {
      return await campgroundsService.getCampgrounds()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
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
    builder
      .addCase(getCampgrounds.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCampgrounds.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.campgrounds = action.payload
      })
      .addCase(getCampgrounds.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCampground.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCampground.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.campground = action.payload
      })
      .addCase(getCampground.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = campgroundsSlice.actions

export default campgroundsSlice.reducer
