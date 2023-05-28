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
  uuid?: string
}

interface CommentState {
  editPermission: boolean
  deletePermission: boolean
  cancelEditPermission: boolean
  commentDetail: CommentDetail
}

const initialState: CommentState = {
  editPermission: false,
  deletePermission: false,
  cancelEditPermission: false,
  commentDetail: {
    description: '',
    isThunder: 0,
    point: '0',
    chapter: '',
    bookTitle: '',
    mangaUuid: '',
    uuid: ''
  }
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setEditPermission: (state, action: PayloadAction<boolean>) => {
      state.editPermission = action.payload
    },
    setDeletePermission: (state, action: PayloadAction<boolean>) => {
      state.deletePermission = action.payload
    },
    setCommentDetail: (state, action: PayloadAction<CommentDetail>) => {
      state.commentDetail = action.payload
    },
    setCancelEditPermission: (state, action: PayloadAction<boolean>) => {
      state.cancelEditPermission = action.payload
    }
  }
})

export const { setEditPermission, setCommentDetail, setDeletePermission, setCancelEditPermission } = commentSlice.actions
export const selectEditPermission = (state: RootState) =>
  state.comment.editPermission
export const selectCommentDetail = (state: RootState) =>
  state.comment.commentDetail
export const selectDeletePermission = (state: RootState) =>
  state.comment.deletePermission
export const selectCancelEditPermission = (state: RootState) =>
  state.comment.cancelEditPermission
export default commentSlice.reducer
