import { createSlice } from '@reduxjs/toolkit';

export const rentalSlice = createSlice({
  name: 'rental',
  initialState: {
    rentals: [],
    states: [],
    rentalInformation: null,
    currentRentalState: null,
  },
  reducers: {
    setRentals: (state, action) => {
      state.rentals = action.payload.rentals;
    },
    setStates: (state, action) => {
      state.states = action.payload.states
    },
    setRentalInformation: (state, action) => {
      state.rentalInformation = action.payload.rentalInformation
    },
    setCurrentRentalState: (state, action) => {
      state.currentRentalState = action.payload.currentRentalState;
    }
  }
});


// Action creators are generated for each case reducer function
export const { setRentals, setStates, setRentalInformation, setCurrentRentalState } = rentalSlice.actions;