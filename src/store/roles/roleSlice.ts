import { createSlice } from '@reduxjs/toolkit';

export const roleSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: null,
        flag: false,
    },
    reducers: {}
});

export default roleSlice.reducer;
