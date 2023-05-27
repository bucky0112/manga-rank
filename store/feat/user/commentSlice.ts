import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../..'

interface CommentDetail {
  description?: string
  isThunder?: number
  point?: string
  chapter?: string
  bookTitle?: string
  mangaUuid?: string
}

interface CommentState {
  editPermission: boolean
  commentDetail: CommentDetail
}

const initialState: CommentState = {
  editPermission: false,
  commentDetail: {
    description: '',
    isThunder: 0,
    point: '0',
    chapter: '',
    bookTitle: '',
    mangaUuid: ''
  }
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setEditPermission: (state, action: PayloadAction<boolean>) => {
      state.editPermission = action.payload
    },
    setCommentDetail: (state, action: PayloadAction<CommentDetail>) => {
      state.commentDetail = action.payload
    }
  }
})

export const { setEditPermission, setCommentDetail } = commentSlice.actions
export const selectEditPermission = (state: RootState) =>
  state.comment.editPermission
export const selectCommentDetail = (state: RootState) =>
  state.comment.commentDetail
export default commentSlice.reducer
