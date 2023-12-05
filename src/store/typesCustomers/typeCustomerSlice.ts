import { createSlice } from '@reduxjs/toolkit';

export const typeCustomerSlice = createSlice({
  name: 'typeCustomer',
  initialState: {
    typesCustomers: null,
    flag: false
  } as any,
  reducers: {
    setTypesCustomers: (state, action) => {
      state.typesCustomers = action.payload.typesCustomers;
    },
    refreshTypesCustomers: (state, /* action */) => {
      state.flag = !state.flag
    },
    clearTypesCustomers: (state,/* action*/) => {
      state.typesCustomers = null
    }
  }
});


// Action creators are generated for each case reducer function
export const { setTypesCustomers, refreshTypesCustomers, clearTypesCustomers } = typeCustomerSlice.actions;