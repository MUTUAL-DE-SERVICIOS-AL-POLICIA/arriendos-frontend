import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        user: {},
        permissions: [] as string[],
        role: null as string | null,
    },
    reducers: {
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload.user;
            state.permissions = payload.permissions || [];
            state.role = payload.role || null;
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.permissions = [];
            state.role = null;
        },
    }
});

export const { onLogin, onLogout } = authSlice.actions;
