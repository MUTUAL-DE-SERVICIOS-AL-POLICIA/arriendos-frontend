import { createSlice } from '@reduxjs/toolkit';

export const requirementSlice = createSlice({
  name: 'requirement',
  initialState: {
    requirements: null,
    flag: false
  },
  reducers: {
    setRequirements: (state, action) => {
      state.requirements = action.payload.requirements;
    },
    refreshRequirement: (state, /* action */) => {
      state.flag = !state.flag
    },
    clearRequirements: (state,/* action*/) => {
      state.requirements = null
    }
  }
});


// Action creators are generated for each case reducer function
export const { setRequirements, refreshRequirement, clearRequirements } = requirementSlice.actions;