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
    daySelected: null,
    shoppingCart: <any>[],
    allRentals: [],
    allRentalsWithProducts: []
  },
  reducers: {
    setShoppingCart: (state, action) => {
      state.shoppingCart = action.payload.shoppingCart;
    },
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
      state.rentals = [...state.rentals!.map((rental: any) => {
        if (rental.product_id == action.payload.productId) {
          return {
            ...rental,
            ...action.payload,
            start_time: getDateJSON(action.payload.start),
            end_time: getDateJSON(action.payload.end),
          }
        }
        return rental;
      })];
    },
    setUpdateGroupRental: (state, action) => {
      state.groupRentals = [...state.groupRentals!.map((rental: any) => {
        if (rental.product_id == action.payload.productId) {
          return {
            ...rental,
            ...action.payload,
            start_time: getDateJSON(action.payload.start),
            end_time: getDateJSON(action.payload.end),
          }
        }
        return rental;
      })]
    },
    setUpdateRentalSelected: (state, action) => {
      state.rentalInformation = {
        ...state.rentalInformation!,
        products: state.rentalInformation.products.map((rental: any) => {
          return {
            ...rental,
            ...action.payload,
            start_time: getDateJSON(action.payload.start),
            end_time: getDateJSON(action.payload.end),
          }
        })
      }
      state.rentalSelected = {
        ...state.rentalSelected!,
        ...action.payload,
        start_time: getDateJSON(action.payload.start),
        end_time: getDateJSON(action.payload.end),
      }

    },
    setDaySelected: (state, action) => {
      state.daySelected = action.payload.daySelected
    },
    setAllRentals: (state, action) => {
      state.allRentals = action.payload.allRentals
    },
    setAllRentalsWithProducts: (state, action) => {
      state.allRentalsWithProducts = action.payload.allRentalsWithProducts
    }
  }
});


// Action creators are generated for each case reducer function
export const {
  setShoppingCart,
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
  setDaySelected,
  setAllRentals,
  setAllRentalsWithProducts
} = rentalSlice.actions;