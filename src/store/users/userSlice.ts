import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        flag: false
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.users;
        },
        refreshUsers: (state, /* action */) => {
            state.flag = !state.flag
        },
    }
});


// Action creators are generated for each case reducer function
export const { setUsers, refreshUsers } = userSlice.actions;