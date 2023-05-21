import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './feat/user/userInfoSlice'
import googleOauthReducer from './feat/user/googleOauthSlice'
import sideBarReducer from './feat/share/sideBarSlice'
import commentReducer from './feat/user/commentSlice'

export const store = configureStore({
  reducer: {
    user: userInfoReducer,
    googleOauth: googleOauthReducer,
    sideBar: sideBarReducer,
    comment: commentReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
