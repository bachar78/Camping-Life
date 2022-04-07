import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import campgroundsReducer from '../features/campgrounds/campgroundsSlice'
import reviewsReducer from '../features/reviews/reviewsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campgrounds: campgroundsReducer,
    reviews: reviewsReducer,
  },
})
