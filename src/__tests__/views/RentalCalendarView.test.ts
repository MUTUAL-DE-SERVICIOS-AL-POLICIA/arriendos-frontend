import { describe, it, expect } from 'vitest';
import {
  rentalSlice,
  setShoppingCart,
  clearShoppingCart,
  setRentals,
  setRentalSelected,
  setDaySelected,
  setGroupRentals,
} from '@/store/rentals/rentalSlice';
import { virifyDate } from '@/helpers/formatDate';

describe('RentalCalendarView logic', () => {
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

  describe('Shopping cart reset on state change', () => {
    it('should clear shopping cart when resetShoppingCart is dispatched', () => {
      const withItems = {
        ...initialState,
        shoppingCart: [
          { id: 1, name: 'Product A', price: 100 },
          { id: 2, name: 'Product B', price: 200 },
        ],
      };
      const state = rentalSlice.reducer(withItems, clearShoppingCart());
      expect(state.shoppingCart).toEqual([]);
    });

    it('should not affect other state when clearing cart', () => {
      const withData = {
        ...initialState,
        rentals: [{ rental: 1 }],
        rentalSelected: { rental: 1 },
        daySelected: '2024-06-15',
        shoppingCart: [{ id: 1 }],
      };
      const state = rentalSlice.reducer(withData, clearShoppingCart());
      expect(state.rentals).toHaveLength(1);
      expect(state.rentalSelected).not.toBeNull();
      expect(state.daySelected).toBe('2024-06-15');
      expect(state.shoppingCart).toEqual([]);
    });

    it('should handle clearing empty cart gracefully', () => {
      const state = rentalSlice.reducer(initialState, clearShoppingCart());
      expect(state.shoppingCart).toEqual([]);
    });
  });

  describe('Day selection for calendar', () => {
    it('should set day selected', () => {
      const date = '2024-06-15';
      const state = rentalSlice.reducer(initialState, setDaySelected({ daySelected: date }));
      expect(state.daySelected).toBe(date);
    });

    it('should update day selected', () => {
      const withDay = { ...initialState, daySelected: '2024-06-15' };
      const state = rentalSlice.reducer(withDay, setDaySelected({ daySelected: '2024-07-20' }));
      expect(state.daySelected).toBe('2024-07-20');
    });

    it('should accept null day selected', () => {
      const withDay = { ...initialState, daySelected: '2024-06-15' };
      const state = rentalSlice.reducer(withDay, setDaySelected({ daySelected: null }));
      expect(state.daySelected).toBeNull();
    });
  });

  describe('Date verification for calendar selection', () => {
    it('should allow today as valid date', () => {
      const today = new Date();
      today.setHours(12, 0, 0, 0);
      expect(virifyDate(today)).toBe(true);
    });

    it('should allow future dates', () => {
      const future = new Date();
      future.setDate(future.getDate() + 7);
      expect(virifyDate(future)).toBe(true);
    });

    it('should reject past dates', () => {
      const past = new Date();
      past.setDate(past.getDate() - 1);
      expect(virifyDate(past)).toBe(false);
    });
  });

  describe('Calendar rental events', () => {
    it('should set rental events for calendar display', () => {
      const events = [
        { rental: 1, name_state: 'Alquilado', start: '2024-06-15', end: '2024-06-16', title: 'Conferencia' },
        { rental: 2, name_state: 'Reserva', start: '2024-06-20', end: '2024-06-21', title: 'Reunion' },
      ];
      const state = rentalSlice.reducer(initialState, setRentals({ rentals: events }));
      expect(state.rentals).toHaveLength(2);
      expect(state.rentals[0].name_state).toBe('Alquilado');
      expect(state.rentals[1].name_state).toBe('Reserva');
    });

    it('should set group rentals for calendar', () => {
      const groups = [
        { rental: 1, start: new Date('2024-06-15'), end: new Date('2024-06-16'), title: 'Event 1' },
      ];
      const state = rentalSlice.reducer(initialState, setGroupRentals({ groupRentals: groups }));
      expect(state.groupRentals).toHaveLength(1);
    });

    it('should set rental selected from calendar click', () => {
      const rental = { rental: 1, name_state: 'Alquilado', title: 'Test Event' };
      const state = rentalSlice.reducer(initialState, setRentalSelected({ rentalSelected: rental }));
      expect(state.rentalSelected).toEqual(rental);
      expect(state.rentalSelected?.name_state).toBe('Alquilado');
    });

    it('should clear rental selected', () => {
      const withSelected = {
        ...initialState,
        rentalSelected: { rental: 1, name_state: 'Alquilado' },
      };
      const state = rentalSlice.reducer(withSelected, setRentalSelected({ rentalSelected: null }));
      expect(state.rentalSelected).toBeNull();
    });
  });
});
