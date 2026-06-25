import { createSlice } from '@reduxjs/toolkit';

export const roleSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: null,
        flag: false,
    },
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload.roles;
        },
        refreshRoles: (state) => {
            state.flag = !state.flag;
        },
        clearRoles: (state) => {
            state.roles = null;
        },
    }
});

export const { setRoles, refreshRoles, clearRoles } = roleSlice.actions;
