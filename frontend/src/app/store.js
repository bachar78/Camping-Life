import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import campgroundsReducer from '../features/campgrounds/campgroundsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campgrounds: campgroundsReducer,
  },
})
