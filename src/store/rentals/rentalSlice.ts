import { getDateJSON } from '@/helpers';
import { EventsCalendarModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

interface RentalItem {
  rental: number;
  name_state: string;
  start: string;
  end: string;
  [key: string]: unknown;
}

interface RentalInformationProduct {
  rental: number;
  name_state: string;
  start_time: string;
  end_time: string;
  [key: string]: unknown;
}

interface RentalInformation {
  products: RentalInformationProduct[];
  [key: string]: unknown;
}

interface RentalState {
  rentals: RentalItem[];
  groupRentals: EventsCalendarModel[];
  rentalSelected: EventsCalendarModel | null;
  states: unknown[];
  rentalInformation: RentalInformation | null;
  currentRentalState: unknown;
  daySelected: unknown;
  shoppingCart: unknown[];
  allRentals: unknown[];
  allRentalsWithProducts: unknown[];
}

export const rentalSlice = createSlice({
  name: 'rental',
  initialState: {
    rentals: [] as RentalItem[],
    groupRentals: [] as EventsCalendarModel[],
    rentalSelected: null as EventsCalendarModel | null,
    states: [] as unknown[],
    rentalInformation: null as RentalInformation | null,
    currentRentalState: null,
    daySelected: null,
    shoppingCart: [] as unknown[],
    allRentals: [] as unknown[],
    allRentalsWithProducts: [] as unknown[]
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
        if (rental.rental == action.payload.productId) {
          return {
            ...rental,
            name_state: action.payload.name_state ?? rental.name_state,
            start: action.payload.start ? getDateJSON(action.payload.start) : rental.start,
            end: action.payload.end ? getDateJSON(action.payload.end) : rental.end,
          }
        }
        return rental;
      })];
    },
    setUpdateGroupRental: (state, action) => {
      state.groupRentals = [...state.groupRentals!.map((rental: any) => {
        if (rental.rental == action.payload.productId) {
          return {
            ...rental,
            name_state: action.payload.name_state ?? rental.name_state,
            start: action.payload.start ? getDateJSON(action.payload.start) : rental.start,
            end: action.payload.end ? getDateJSON(action.payload.end) : rental.end,
          }
        }
        return rental;
      })]
    },
    setUpdateRentalSelected: (state, action) => {
      if (state.rentalInformation) {
        state.rentalInformation = {
          ...state.rentalInformation,
          products: state.rentalInformation.products.map((rental: any) => {
            return {
              ...rental,
              name_state: action.payload.name_state ?? rental.name_state,
              start_time: action.payload.start ? getDateJSON(action.payload.start) : rental.start_time,
              end_time: action.payload.end ? getDateJSON(action.payload.end) : rental.end_time,
            }
          })
        }
      }
      if (state.rentalSelected) {
        const newStart = action.payload.start ? getDateJSON(action.payload.start) : state.rentalSelected.start;
        const newEnd = action.payload.end ? getDateJSON(action.payload.end) : state.rentalSelected.end;
        state.rentalSelected = {
          ...state.rentalSelected,
          name_state: action.payload.name_state ?? state.rentalSelected.name_state,
          start: newStart ?? state.rentalSelected.start,
          end: newEnd ?? state.rentalSelected.end,
        }
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