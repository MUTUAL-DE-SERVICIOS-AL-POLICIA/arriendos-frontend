import { configureStore } from '@reduxjs/toolkit';
import { authSlice, customerSlice, propertieSlice, roomSlice, selectionSlice, typeCustomerSlice, userSlice } from '.';

export const store = configureStore({
    reducer: {

        auth: authSlice.reducer,
        selections: selectionSlice.reducer,

        users: userSlice.reducer,
        customers: customerSlice.reducer,
        typesCustomers: typeCustomerSlice.reducer,
        properties: propertieSlice.reducer,
        rooms: roomSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})