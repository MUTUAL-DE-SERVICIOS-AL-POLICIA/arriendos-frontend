import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    payments: [],
    amountTotal: 0,
  },
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload.payments
      state.amountTotal = action.payload.amountTotal
    },
  }
});


// Action creators are generated for each case reducer function
export const { setPayments } = paymentSlice.actions;