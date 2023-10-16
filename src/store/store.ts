import { configureStore } from '@reduxjs/toolkit';
import {
    authSlice,
    customerSlice,
    eventSlice,
    hourRangeSlice,
    productSlice,
    propertieSlice,
    rateSlice,
    requirementSlice,
    roomSlice,
    typeCustomerSlice,
    userSlice,
} from '.';

export const store = configureStore({
    reducer: {

        auth: authSlice.reducer,

        users: userSlice.reducer,
        customers: customerSlice.reducer,
        typesCustomers: typeCustomerSlice.reducer,
        properties: propertieSlice.reducer,
        rooms: roomSlice.reducer,
        rates: rateSlice.reducer,
        requirements: requirementSlice.reducer,
        products: productSlice.reducer,
        hourRanges: hourRangeSlice.reducer,
        events: eventSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})