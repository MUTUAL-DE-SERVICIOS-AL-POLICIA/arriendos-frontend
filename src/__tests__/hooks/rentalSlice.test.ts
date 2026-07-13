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
  setStates,
  setAllStates,
  setRentalInformation,
  setCurrentRentalState,
  setUpdateRental,
  setUpdateGroupRental,
  setUpdateRentalSelected,
  setAllRentals,
  setAllRentalsWithProducts,
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

  it('should set states', () => {
    const states = [{ id: 1, name: 'Pre-reserva' }, { id: 2, name: 'Reserva' }];
    const state = rentalSlice.reducer(initialState, setStates({ states }));
    expect(state.states).toEqual(states);
  });

  it('should set all states', () => {
    const withStates = { ...initialState, states: [{ id: 1, name: 'Old' }] };
    const allStates = [{ id: 3, name: 'Alquilado' }];
    const state = rentalSlice.reducer(withStates, setAllStates({ allStates }));
    expect(state.states).toEqual(allStates);
  });

  it('should set rental information', () => {
    const info = { products: [{ rental: 1, name_state: 'Alquilado' }], customer: { name: 'Test' } };
    const state = rentalSlice.reducer(initialState, setRentalInformation({ rentalInformation: info }));
    expect(state.rentalInformation).toEqual(info);
  });

  it('should set current rental state', () => {
    const state = rentalSlice.reducer(initialState, setCurrentRentalState({ currentRentalState: 'Reserva' }));
    expect(state.currentRentalState).toBe('Reserva');
  });

  it('should set all rentals', () => {
    const allRentals = [{ rental: 1 }, { rental: 2 }];
    const state = rentalSlice.reducer(initialState, setAllRentals({ allRentals }));
    expect(state.allRentals).toEqual(allRentals);
  });

  it('should set all rentals with products', () => {
    const data = [{ rental: 1, products: [] }];
    const state = rentalSlice.reducer(initialState, setAllRentalsWithProducts({ allRentalsWithProducts: data }));
    expect(state.allRentalsWithProducts).toEqual(data);
  });

  it('should update rental in list', () => {
    const withRentals = {
      ...initialState,
      rentals: [
        { rental: 1, name_state: 'Pre-reserva', start: '2024-01-01', end: '2024-01-02' },
        { rental: 2, name_state: 'Reserva', start: '2024-02-01', end: '2024-02-02' },
      ],
    };
    const state = rentalSlice.reducer(withRentals, setUpdateRental({
      productId: 1, name_state: 'Alquilado',
      start: new Date('2024-03-01'), end: new Date('2024-03-02'),
    }));
    expect(state.rentals[0].name_state).toBe('Alquilado');
    expect(state.rentals[1].name_state).toBe('Reserva');
  });

  it('should update group rental in list', () => {
    const withGroup = {
      ...initialState,
      groupRentals: [
        { rental: 1, name_state: 'Pre-reserva', start: '2024-01-01', end: '2024-01-02' },
      ],
    };
    const state = rentalSlice.reducer(withGroup, setUpdateGroupRental({
      productId: 1, name_state: 'Concluido',
      start: new Date('2024-04-01'), end: new Date('2024-04-02'),
    }));
    expect(state.groupRentals[0].name_state).toBe('Concluido');
  });

  it('should update rental selected', () => {
    const withInfo = {
      ...initialState,
      rentalSelected: { rental: 1, name_state: 'Pre-reserva', start: '2024-01-01', end: '2024-01-02' },
      rentalInformation: {
        products: [{ rental: 1, name_state: 'Pre-reserva', start_time: '2024-01-01', end_time: '2024-01-02' }],
      },
    };
    const state = rentalSlice.reducer(withInfo, setUpdateRentalSelected({
      name_state: 'Alquilado',
      start: new Date('2024-05-01'),
      end: new Date('2024-05-02'),
    }));
    expect(state.rentalSelected?.name_state).toBe('Alquilado');
    expect(state.rentalInformation?.products[0].name_state).toBe('Alquilado');
  });

  it('should update rental selected without rentalInformation', () => {
    const withSelected = {
      ...initialState,
      rentalSelected: { rental: 1, name_state: 'Pre-reserva', start: '2024-01-01', end: '2024-01-02' },
    };
    const state = rentalSlice.reducer(withSelected, setUpdateRentalSelected({
      name_state: 'Reserva',
    }));
    expect(state.rentalSelected?.name_state).toBe('Reserva');
  });
});
