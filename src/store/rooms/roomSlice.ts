import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: [],
    },
    reducers: {
        clearRooms: (state) => {
            state.rooms = []
        },
        setRoom: (state, action) => {
            state.rooms = action.payload.rooms;
        },
    }
});


// Action creators are generated for each case reducer function
export const { clearRooms, setRoom } = roomSlice.actions;