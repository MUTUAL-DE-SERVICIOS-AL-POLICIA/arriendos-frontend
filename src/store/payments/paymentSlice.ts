import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    payments: [],
    amountTotal: 0,
    detailPayment: {}
  },
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload.payments
      state.amountTotal = action.payload.amountTotal
    },
    clearPayments: (state,/* action*/) => {
      state.payments = []
    },
    // setPayment: (state, action) => {
    //   state.detailPayment = action.payload.payment
    // }
  }
});


// Action creators are generated for each case reducer function
export const { setPayments, clearPayments, /*setPayment*/ } = paymentSlice.actions;