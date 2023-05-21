import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../..'

interface CommentState {
  editPermission: boolean
}

const initialState: CommentState = {
  editPermission: false
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setEditPermission: (state, action: PayloadAction<CommentState>) => {
      state.editPermission = action.payload.editPermission
    }
  }
})

export const { setEditPermission } = commentSlice.actions
export const selectEditPermission = (state: RootState) => state.comment.editPermission
export default commentSlice.reducer
