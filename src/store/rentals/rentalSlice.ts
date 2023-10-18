import { createSlice } from '@reduxjs/toolkit';

export const rentalSlice = createSlice({
  name: 'rental',
  initialState: {
    rentals: [],
  },
  reducers: {
    setRentals: (state, action) => {
      state.rentals = action.payload.rentals;
    },
  }
});


// Action creators are generated for each case reducer function
export const { setRentals } = rentalSlice.actions;