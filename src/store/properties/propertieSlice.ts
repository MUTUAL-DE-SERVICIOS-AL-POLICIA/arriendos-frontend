import { PropertieModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const propertieSlice = createSlice({
    name: 'propertie',
    initialState: {
        properties: <Array<PropertieModel>>[],
    },
    reducers: {
        setProperties: (state, action) => {
            state.properties = action.payload.properties;
        },
        addPropertie: (state, action) => {
            state.properties = [...state.properties, action.payload.propertie]
        },
        updatePropertie: (state, action) => {
            state.properties = [...state.properties.map((e: PropertieModel) => {
                if (e.id === action.payload.propertie.id) {
                    return { ...action.payload.propertie }
                }
                return e
            })]
        },
    }
});


// Action creators are generated for each case reducer function
export const { setProperties, addPropertie, updatePropertie } = propertieSlice.actions;