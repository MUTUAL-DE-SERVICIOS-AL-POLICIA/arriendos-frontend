import { createSlice } from "@reduxjs/toolkit";

export const warrantySlice = createSlice({
  name: 'warranty',
  initialState: {
    warrantys: []
  },
  reducers: {
    setWarrantys: (state, action) => {
      state.warrantys = action.payload.warrantys
    },
    clearWarrantys: (state,/* action*/) => {
      state.warrantys = []
    }
  }
})

export const {
  setWarrantys,
  clearWarrantys,
} = warrantySlice.actions

