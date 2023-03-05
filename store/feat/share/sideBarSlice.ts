import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "store"

interface SideBarState {
  isOpen: boolean
}

const initialState: SideBarState = {
  isOpen: false
}

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    setSideBarOpen: (state, action: PayloadAction<SideBarState>) => {
      state.isOpen = action.payload.isOpen
    }
  }
})

export const { setSideBarOpen } = sideBarSlice.actions
export const selectSideBarOpen = (state: RootState) => state.sideBar.isOpen
export default sideBarSlice.reducer
