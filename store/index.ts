import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './feat/user/userInfoSlice'

export const store = configureStore({
  reducer: {
    user: userInfoReducer,
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
