import { createSlice } from '@reduxjs/toolkit';

export const requirementSlice = createSlice({
    name: 'requirement',
    initialState: {
        requirements: [],
        flag: false
    },
    reducers: {
        setRequirements: (state, action) => {
            state.requirements = action.payload.requirements;
        },
        refreshRequirement: (state, /* action */) => {
            state.flag = !state.flag
        },
    }
});


// Action creators are generated for each case reducer function
export const { setRequirements, refreshRequirement } = requirementSlice.actions;