import { createSlice } from '@reduxjs/toolkit';

export const selectionSlice = createSlice({
    name: 'selection',
    initialState: {
        selections: [],
    } as any,
    reducers: {
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
    }
});


// Action creators are generated for each case reducer function
export const { setSelectAll, setSelectOne, setDeselectAll, setDeselectOne, setClearAll } = selectionSlice.actions;