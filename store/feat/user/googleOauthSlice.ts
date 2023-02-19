import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../'

interface GoogleOauthState {
  info: {
    nickname: string
    token: string
    email: string
    result: number
  }
}

const initialState: GoogleOauthState = {
  info: {
    nickname: '',
    token: '',
    email: '',
    result: 0
  }
}

export const googleOauthSlice = createSlice({
  name: 'googleOauth',
  initialState,
  reducers: {
    setGoogleOauthInfo: (state, action: PayloadAction<GoogleOauthState>) => {
      state.info = action.payload.info
    }
  }
})

export const { setGoogleOauthInfo } = googleOauthSlice.actions
export const selectGoogleOauthInfo = (state: RootState) => state.googleOauth.info
export default googleOauthSlice.reducer
