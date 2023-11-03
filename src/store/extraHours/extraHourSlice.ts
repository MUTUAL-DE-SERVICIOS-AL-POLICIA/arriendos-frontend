import { createSlice } from '@reduxjs/toolkit';

export const extraHourSlice = createSlice({
  name: 'extraHour',
  initialState: {
    extraHours: [],
  },
  reducers: {
    setExtraHours: (state, action) => {
      state.extraHours = action.payload.extraHours
    },
  }
});


// Action creators are generated for each case reducer function
export const { setExtraHours } = extraHourSlice.actions;