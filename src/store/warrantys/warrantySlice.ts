import { createSlice } from "@reduxjs/toolkit";

export const warrantySlice = createSlice({
  name: 'warranty',
  initialState: {
    warrantys: [],
    totalWarranty: 0
  },
  reducers: {
    setWarrantys: (state, action) => {
      state.warrantys = action.payload.warrantys
      state.totalWarranty = action.payload.totalWarranty
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

