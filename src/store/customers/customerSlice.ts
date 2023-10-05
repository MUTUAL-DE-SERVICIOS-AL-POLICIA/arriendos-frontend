import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [],
        flag: false,
        CustomerSelection: <object>{}
    },
    reducers: {
        setCustomers: (state, action) => {
            state.customers = action.payload.customers;
        },
        refreshCustomer: (state, /* action */) => {
            state.flag = !state.flag
        },
        setCustomerSelect: (state, action) => {
            state.CustomerSelection = action.payload.customer;
            console.log(state.CustomerSelection)
        },
        setClearSelectCustomer: (state) => {
            state.CustomerSelection = {};
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    setCustomers,
    refreshCustomer,
    setCustomerSelect,
    setClearSelectCustomer
} = customerSlice.actions;