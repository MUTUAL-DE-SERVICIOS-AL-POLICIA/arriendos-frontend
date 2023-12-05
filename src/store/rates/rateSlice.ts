import { createSlice } from '@reduxjs/toolkit';

export const rateSlice = createSlice({
  name: 'rate',
  initialState: {
    rates: null,
    flag: false
  },
  reducers: {
    setRates: (state, action) => {
      state.rates = action.payload.rates;
    },
    refreshRate: (state, /* action */) => {
      state.flag = !state.flag
    },
    clearRates: (state, /* action */) => {
      state.rates = null;
    }
  }
});


// Action creators are generated for each case reducer function
export const { setRates, refreshRate, clearRates } = rateSlice.actions;