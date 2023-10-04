import { HourRangeModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const hourRangeSlice = createSlice({
    name: 'hourRange',
    initialState: {
        hourRanges: <Array<HourRangeModel>>[]
    },
    reducers: {
        setHourRanges: (state, action) => {
            state.hourRanges = action.payload.hourRanges;
        },
        addHourRanges: (state, action) => {
            state.hourRanges = [...state.hourRanges, action.payload.hourRange];
        },
        updateHourRanges: (state, action) => {
            state.hourRanges = [...state.hourRanges.map(((hourRange: HourRangeModel) => {
                if (hourRange.id == action.payload.hourRange.id) {
                    return { ...action.payload.hourRange }
                }
                return hourRange;
            }))];
        },

        removeHourRange: (state, action) => {
            state.hourRanges = [...state.hourRanges.filter(((hourRange: HourRangeModel) => hourRange.id != action.payload.hourRange.id))];
        },
    }
});


// Action creators are generated for each case reducer function
export const { setHourRanges, addHourRanges, updateHourRanges, removeHourRange, } = hourRangeSlice.actions;