import { createSlice } from '@reduxjs/toolkit';

export const selectionSlice = createSlice({
    name: 'selection',
    initialState: {
        selections:<Array<any>>[],
        selectionsRooms:<Array<any>>[],
    },
    reducers: {
        /*ARRAY DE SELECTORES */
        setSelectAll: (state, action) => {
            state.selections = [...state.selections, ...action.payload.selections];
        },
        setSelectOne: (state, action) => {
            state.selections = [...state.selections, action.payload.select];
        },
        setDeselectAll: (state, action) => {
            state.selections = [...state.selections.filter((e: any) => !action.payload.selection.includes(e))];
        },
        setDeselectOne: (state, action) => {
            state.selections = [...state.selections.filter((e: any) => e !== action.payload.select)];
        },
        setClearAll: (state, /* action */) => {
            state.selections = [];
        },
        /*ARRAY DE SELECTORES DE AMBIENTES */
        setSelectRoomAdd:(state,action)=> {
            state.selectionsRooms = [...state.selectionsRooms,action.payload.selectRoom];
        },
        setDeselectRoomOne:(state,action)=> {
            state.selectionsRooms = [...state.selectionsRooms.filter((e: any) => e !== action.payload.selectRoom)];
        },
        setClearRoomAll: (state, /* action */) => {
            state.selectionsRooms = [];
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    /*METODOS DE SELECCION  DEL SELECTOR*/
    setSelectAll,
    setSelectOne,
    setDeselectAll,
    setDeselectOne,
    setClearAll,
    /*METODOS DE SELECCION DE AMBIENTES*/
    setSelectRoomAdd,
    setDeselectRoomOne,
    setClearRoomAll,
} = selectionSlice.actions;