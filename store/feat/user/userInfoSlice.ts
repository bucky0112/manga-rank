import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../'

interface UserState {
  info: {
    nickname: string
    token: string
  }
}

const initialState: UserState = {
  info: {
    nickname: '',
    token: ''
  }
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.info = action.payload.info
    }
  }
})

export const { setUserInfo } = userInfoSlice.actions
export const selectUserInfo = (state: RootState) => state.user.info
export default userInfoSlice.reducer
