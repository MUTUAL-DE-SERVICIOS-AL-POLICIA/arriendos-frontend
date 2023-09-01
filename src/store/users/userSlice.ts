import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        usersLDAP: [],
        users: [],
        flag: false
    },
    reducers: {
        setUsersLdap: (state, action) => {
            state.usersLDAP = action.payload.usersLDAP;
        },
        setUsers: (state, action) => {
            state.users = action.payload.users;
        },
        refreshUsers: (state, /* action */) => {
            state.flag = !state.flag
        },
    }
});


// Action creators are generated for each case reducer function
export const { setUsersLdap, setUsers, refreshUsers } = userSlice.actions;