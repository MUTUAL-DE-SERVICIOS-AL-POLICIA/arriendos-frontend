import { describe, it, expect } from 'vitest';
import { menu } from '@/utils/menu';

describe('menu', () => {
  it('returns an array of menu items', () => {
    const items = menu();
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
  });

  it('each item has path, title, icon, and permission', () => {
    const items = menu();
    items.forEach((item) => {
      expect(item).toHaveProperty('path');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('icon');
      expect(item).toHaveProperty('permission');
    });
  });

  it('calendar item requires leases.view', () => {
    const items = menu();
    const calendar = items.find((i) => i.path === '/rentalCalendarView');
    expect(calendar).toBeDefined();
    expect(calendar!.permission).toBe('leases.view');
  });

  it('customers item requires customers.view', () => {
    const items = menu();
    const customers = items.find((i) => i.path === '/customersView');
    expect(customers).toBeDefined();
    expect(customers!.permission).toBe('customers.view');
  });

  it('products item requires products.view', () => {
    const items = menu();
    const products = items.find((i) => i.path === '/productsView');
    expect(products).toBeDefined();
    expect(products!.permission).toBe('products.view');
  });

  it('rental item requires leases.view', () => {
    const items = menu();
    const rental = items.find((i) => i.path === '/rentalView');
    expect(rental).toBeDefined();
    expect(rental!.permission).toBe('leases.view');
  });
});
