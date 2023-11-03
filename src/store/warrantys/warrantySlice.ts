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
  }
})

export const {
  setWarrantys
} = warrantySlice.actions

