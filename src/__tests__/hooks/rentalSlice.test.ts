import { describe, it, expect } from 'vitest';
import {
  rentalSlice,
  setShoppingCart,
  setRentals,
  setGroupRentals,
  setRentalSelected,
  clearRentals,
  clearShoppingCart,
  setDaySelected,
} from '@/store/rentals/rentalSlice';

describe('rentalSlice', () => {
  const initialState = {
    rentals: [],
    groupRentals: [],
    rentalSelected: null,
    states: [],
    rentalInformation: null,
    currentRentalState: null,
    daySelected: null,
    shoppingCart: [],
    allRentals: [],
    allRentalsWithProducts: [],
  };

  it('should return initial state', () => {
    const state = rentalSlice.reducer(undefined, { type: 'unknown' });
    expect(state.rentals).toEqual([]);
    expect(state.shoppingCart).toEqual([]);
    expect(state.rentalSelected).toBeNull();
  });

  it('should set shopping cart', () => {
    const cart = [{ id: 1, name: 'Product 1' }];
    const state = rentalSlice.reducer(initialState, setShoppingCart({ shoppingCart: cart }));
    expect(state.shoppingCart).toEqual(cart);
  });

  it('should clear shopping cart', () => {
    const withItems = { ...initialState, shoppingCart: [{ id: 1 }, { id: 2 }] };
    const state = rentalSlice.reducer(withItems, clearShoppingCart());
    expect(state.shoppingCart).toEqual([]);
  });

  it('should set rentals', () => {
    const rentals = [{ rental: 1, name_state: 'Alquilado', start: '2024-01-01', end: '2024-01-02' }];
    const state = rentalSlice.reducer(initialState, setRentals({ rentals }));
    expect(state.rentals).toEqual(rentals);
  });

  it('should set group rentals', () => {
    const groupRentals = [{ id: 1, title: 'Test' }];
    const state = rentalSlice.reducer(initialState, setGroupRentals({ groupRentals }));
    expect(state.groupRentals).toEqual(groupRentals);
  });

  it('should set rental selected', () => {
    const rental = { rental: 1, title: 'Test' };
    const state = rentalSlice.reducer(initialState, setRentalSelected({ rentalSelected: rental }));
    expect(state.rentalSelected).toEqual(rental);
  });

  it('should clear rentals and states', () => {
    const withData = {
      ...initialState,
      rentals: [{ rental: 1 }],
      states: [{ id: 1 }],
    };
    const state = rentalSlice.reducer(withData, clearRentals());
    expect(state.rentals).toEqual([]);
    expect(state.states).toEqual([]);
  });

  it('should set day selected', () => {
    const state = rentalSlice.reducer(initialState, setDaySelected({ daySelected: '2024-06-15' }));
    expect(state.daySelected).toBe('2024-06-15');
  });
});
