import { describe, it, expect } from 'vitest';
import { menu } from '@/utils/menu';

describe('Menu RBAC configuration', () => {
  const menuItems = menu();

  it('should return an array of menu items', () => {
    expect(Array.isArray(menuItems)).toBe(true);
    expect(menuItems.length).toBeGreaterThan(0);
  });

  it('each item should have path, title, icon, and permission', () => {
    menuItems.forEach((item) => {
      expect(item).toHaveProperty('path');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('icon');
      expect(item).toHaveProperty('permission');
      expect(typeof item.path).toBe('string');
      expect(typeof item.title).toBe('string');
      expect(typeof item.permission).toBe('string');
    });
  });

  it('permissions should follow module.action format', () => {
    menuItems.forEach((item) => {
      expect(item.permission).toMatch(/^[a-z]+\.[a-z]+$/);
    });
  });

  it('should include Calendar with leases.view permission', () => {
    const calendar = menuItems.find((item) => item.path === '/rentalCalendarView');
    expect(calendar).toBeDefined();
    expect(calendar?.permission).toBe('leases.view');
    expect(calendar?.title).toBe('Calendario');
  });

  it('should include Customers with customers.view permission', () => {
    const customers = menuItems.find((item) => item.path === '/customersView');
    expect(customers).toBeDefined();
    expect(customers?.permission).toBe('customers.view');
    expect(customers?.title).toBe('Clientes');
  });

  it('should include Rentals with leases.view permission', () => {
    const rentals = menuItems.find((item) => item.path === '/rentalView');
    expect(rentals).toBeDefined();
    expect(rentals?.permission).toBe('leases.view');
    expect(rentals?.title).toBe('Alquileres');
  });

  it('should include Products with products.view permission', () => {
    const products = menuItems.find((item) => item.path === '/productsView');
    expect(products).toBeDefined();
    expect(products?.permission).toBe('products.view');
    expect(products?.title).toBe('Productos');
  });

  it('should have exactly 4 menu items', () => {
    expect(menuItems.length).toBe(4);
  });

  it('all permissions should start with a valid module name', () => {
    const validModules = ['leases', 'customers', 'products', 'rooms', 'users', 'requirements', 'financials', 'records', 'documents'];
    menuItems.forEach((item) => {
      const module = item.permission.split('.')[0];
      expect(validModules).toContain(module);
    });
  });
});
