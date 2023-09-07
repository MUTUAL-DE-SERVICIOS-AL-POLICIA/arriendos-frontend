import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: [],
        roomSelections:<Array<any>>[],
    },
    reducers: {
        clearRooms: (state) => {
            state.rooms = []
        },
        setRoom: (state, action) => {
            state.rooms = action.payload.rooms;
        },
        setSelectRoom: (state, action) => {
            state.roomSelections = [...state.roomSelections,action.payload.select];
        },
    }
});


// Action creators are generated for each case reducer function
export const { clearRooms, setRoom, setSelectRoom } = roomSlice.actions;