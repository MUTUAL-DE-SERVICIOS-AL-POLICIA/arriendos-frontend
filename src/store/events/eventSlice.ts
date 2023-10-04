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
    }
})

export const {
    setEvents
} = eventSlice.actions;