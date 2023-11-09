import { configureStore } from '@reduxjs/toolkit';
import { paymentSlice } from './payments/paymentSlice';
import {
    authSlice,
    customerSlice,
    eventSlice,
    hourRangeSlice,
    planSlice,
    productSlice,
    propertieSlice,
    rateSlice,
    rentalSlice,
    requirementSlice,
    roomSlice,
    typeCustomerSlice,
    userSlice,
    extraHourSlice,
    warrantySlice,
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
        plans: planSlice.reducer,
        rentals: rentalSlice.reducer,
        payments: paymentSlice.reducer,
        extraHours: extraHourSlice.reducer,
        warrantys: warrantySlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})