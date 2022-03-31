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
  isCreated: false,
  message: '',
}

// Create a new Campground
export const createCampground = createAsyncThunk(
  'campground/create',
  async (data, thunkAPI) => {
    try {
      return await campgroundsService.createCampground(data)
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
// Update a campground
export const updateCampground = createAsyncThunk(
  'campground/update',
  async (data, thunkAPI) => {
    try {
      return await campgroundsService.updateCampground(data)
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
// Delete a Campground
export const deleteCampground = createAsyncThunk(
  'campground/delete',
  async (campId, thunkAPI) => {
    try {
      return await campgroundsService.deleteCampground(campId)
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
      .addCase(deleteCampground.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCampground.fulfilled, (state, action) => {
        state.isLoading = false
        state.isDeleted = true
        state.campgrounds.filter(
          (campground) => action.payload._id !== campground._id
        )
      })
      .addCase(deleteCampground.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createCampground.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCampground.fulfilled, (state, action) => {
        state.isLoading = false
        state.isCreated = true
        state.campground = action.payload
        state.campgrounds.unshift(action.payload)
      })
      .addCase(createCampground.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCampground.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCampground.fulfilled, (state, action) => {
        state.isLoading = false
        state.isUpdated = true
        state.campground = action.payload
        state.campgrounds.map((campground) =>
          action.payload._id === campground._id ? action.payload : campground
        )
      })
      .addCase(updateCampground.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = campgroundsSlice.actions

export default campgroundsSlice.reducer
