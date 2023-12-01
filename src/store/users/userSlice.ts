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
    clearUsers: (state,/* action*/) => {
      state.usersLDAP = []
      state.users = []
    }
  }
});


// Action creators are generated for each case reducer function
export const { setUsersLdap, setUsers, refreshUsers, clearUsers } = userSlice.actions;