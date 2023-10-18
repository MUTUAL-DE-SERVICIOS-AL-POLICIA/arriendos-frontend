import { createSlice } from '@reduxjs/toolkit';

export const planSlice = createSlice({
  name: 'plan',
  initialState: {
    plans: [],
  },
  reducers: {
    setPlans: (state, action) => {
      state.plans = action.payload.plans
    },
  }
});


// Action creators are generated for each case reducer function
export const { setPlans } = planSlice.actions;