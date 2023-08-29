import { createSlice } from '@reduxjs/toolkit';

export const propertieSlice = createSlice({
    name: 'propertie',
    initialState: {
        properties: [],
    },
    reducers: {
        setProperties: (state, action) => {
            state.properties = action.payload.properties;
        },
    }
});


// Action creators are generated for each case reducer function
export const { setProperties } = propertieSlice.actions;