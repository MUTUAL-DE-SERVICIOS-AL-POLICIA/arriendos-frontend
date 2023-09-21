import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: [],
        RoomSelection: {}
    },
    reducers: {
        clearRooms: (state) => {
            state.rooms = []
        },
        setRoom: (state, action) => {
            state.rooms = action.payload.rooms;
        },
        /*ARRAY DE SELECTORES DE AMBIENTES */
        setRoomSelect: (state, action) => {
            state.RoomSelection = action.payload.room;
        },
        setClearSelect: (state, /* action */) => {
            state.RoomSelection = {};
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    clearRooms,
    setRoom,

    /*METODOS DE SELECCION DE AMBIENTES*/
    setRoomSelect,
    setClearSelect,
} = roomSlice.actions;