import { createSlice } from "@reduxjs/toolkit"

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
    clearEvents: (state,/* action*/) => {
      state.events = []
    }
  }
})

export const {
  setEvents,
  clearEvents,
} = eventSlice.actions;