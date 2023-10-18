import { createSlice } from "@reduxjs/toolkit"

export const leaseStateSlice = createSlice({
    name: 'leaseState',
    initialState: {
        leaseStates: [],
        currentLeaseState: {}
    },
    reducers: {
        setLeaseState: (state, action) => {
            state.leaseStates = action.payload.leaseStates
        },
        setCurrentLeaseState: (state, action) => {
            state.currentLeaseState = action.payload.currentLeaseState
        }
    }
})

export const {
    setLeaseState,
    setCurrentLeaseState
} = leaseStateSlice.actions