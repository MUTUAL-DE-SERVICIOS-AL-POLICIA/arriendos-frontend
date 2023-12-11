import { getDateJSON } from '@/helpers';
import { EventsCalendarModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const rentalSlice = createSlice({
  name: 'rental',
  initialState: {
    rentals: <any>[],
    groupRentals: <EventsCalendarModel[]>[],
    rentalSelected: <EventsCalendarModel | null>null,
    states: [],
    rentalInformation: <any>null,
    currentRentalState: null,
    daySelected: null
  },
  reducers: {
    setRentals: (state, action) => {
      state.rentals = action.payload.rentals;
    },
    setGroupRentals: (state, action) => {
      state.groupRentals = action.payload.groupRentals;
    },
    setRentalSelected: (state, action) => {
      state.rentalSelected = action.payload.rentalSelected;
    },
    setStates: (state, action) => {
      state.states = action.payload.states
    },
    setAllStates: (state, action) => {
      state.states = action.payload.allStates
    },
    setRentalInformation: (state, action) => {
      state.rentalInformation = action.payload.rentalInformation
    },
    setCurrentRentalState: (state, action) => {
      state.currentRentalState = action.payload.currentRentalState;
    },
    clearRentals: (state,/* action*/) => {
      state.rentals = []
      state.states = []
    },
    setUpdateRental: (state, action) => {
      console.log(action.payload.productId)
      state.rentals = [...state.rentals!.map((rental: any) => {
        if (rental.product_id == action.payload.productId) {
          console.log({ ...rental })
          return {
            ...rental,
            start: action.payload.start,
            end: action.payload.end,
          }
        }
        return rental;
      })];
    },
    setUpdateGroupRental: (state, action) => {
      state.groupRentals = [...state.groupRentals!.map((rental: any) => {
        if (rental.product_id == action.payload.productId) {
          console.log({ ...rental })
          return {
            ...rental,
            start: action.payload.start,
            end: action.payload.end,
          }
        }
        return rental;
      })]
    },
    setUpdateRentalSelected: (state, action) => {
      console.log({ ...state.rentalInformation.products[0] })
      state.rentalInformation = {
        ...state.rentalInformation!,
        products: state.rentalInformation.products.map((rental: any) => {
          return {
            ...rental,
            start_time: getDateJSON(action.payload.start),
            end_time: getDateJSON(action.payload.end),
          }
        })

      }

    },
    setDaySelected: (state, action) => {
      state.daySelected = action.payload.daySelected
    }
  }
});


// Action creators are generated for each case reducer function
export const {
  setRentals,
  setGroupRentals,
  setRentalSelected,
  setStates,
  setRentalInformation,
  setCurrentRentalState,
  clearRentals,
  setUpdateRental,
  setUpdateGroupRental,
  setUpdateRentalSelected,
  setAllStates,
  setDaySelected
} = rentalSlice.actions;