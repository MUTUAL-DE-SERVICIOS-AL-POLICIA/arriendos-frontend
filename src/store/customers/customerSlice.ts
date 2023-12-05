import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: null,
    flag: false,
  },
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload.customers;
    },
    refreshCustomer: (state, /* action */) => {
      state.flag = !state.flag
    },
    clearCustomers: (state,/* action*/) => {
      state.customers = null
    }
  }
});


// Action creators are generated for each case reducer function
export const {
  setCustomers,
  refreshCustomer,
  clearCustomers,
} = customerSlice.actions;