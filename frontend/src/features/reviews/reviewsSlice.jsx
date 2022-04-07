import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reviewService from './reviewService'

const initialState = {
  reviews: [],
  review: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  isDeleted: false,
  message: '',
}

//Get a campground reviews
export const getReviews = createAsyncThunk(
  'reviews/getAll',
  async (campId, thunkAPI) => {
    try {
      //   const token = thunkAPI.getState().auth.member.token
      //Don't forget to add the token as a second param in this fun
      return await reviewService.getReviews(campId)
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

//Create a review
export const createReview = createAsyncThunk(
  'review/create',
  async (data, thunkAPI) => {
    try {
      //   const token = thunkAPI.getState().auth.member.token
      return await reviewService.createReview(data)
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
// Update a review
export const updateReview = createAsyncThunk(
  'review/update',
  async (data, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.member.token
      return await reviewService.updateReview(data)
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
// Delete a review
export const deleteReview = createAsyncThunk(
  'review/delete',
  async (data, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.member.token
      return await reviewService.deleteReview(data)
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

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reviews = action.payload
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reviews.push(action.payload)
        state.review = action.payload
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.isUpdated = true
        state.reviews.map((review) =>
          action.payload._id === review._id ? action.payload : review
        )
        state.review = action.payload
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.isDeleted = true
        state.reviews.filter((review) => action.payload._id !== review._id)
        state.review = action.payload
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = reviewSlice.actions

export default reviewSlice.reducer
