import { configureStore } from '@reduxjs/toolkit';
import {
    authSlice,
    customerSlice,
    hourRangeSlice,
    productSlice,
    propertieSlice,
    rateSlice,
    requirementSlice,
    roomSlice,
    selectedProductSlice,
    selectionSlice,
    typeCustomerSlice,
    userSlice,
} from '.';

export const store = configureStore({
    reducer: {

        auth: authSlice.reducer,
        selections: selectionSlice.reducer,

        users: userSlice.reducer,
        customers: customerSlice.reducer,
        typesCustomers: typeCustomerSlice.reducer,
        properties: propertieSlice.reducer,
        rooms: roomSlice.reducer,
        rates: rateSlice.reducer,
        requirements: requirementSlice.reducer,
        products: productSlice.reducer,
        hourRanges: hourRangeSlice.reducer,

        selectedProducts: selectedProductSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})