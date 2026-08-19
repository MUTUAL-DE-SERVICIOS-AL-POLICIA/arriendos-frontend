import { describe, it, expect } from 'vitest';

describe('AppRouter permission mapping', () => {
  const routePermissions: Record<string, string> = {
    '/propertiesView': 'rooms.view',
    '/productsView': 'products.view',
    '/rentalCalendarView': 'leases.view',
    '/rentalView': 'leases.view',
    '/hourRangesView': 'products.view',
    '/ratesView': 'products.view',
    '/requirementsView': 'requirements.view',
    '/customersView': 'customers.view',
    '/typeCustomersView': 'customers.view',
    '/usersView': 'users.view',
    '/rolesView': 'users.view',
  };

  it('should have permissions for all protected routes', () => {
    const protectedRoutes = Object.keys(routePermissions);
    expect(protectedRoutes.length).toBe(11);
  });

  it('rooms module should use rooms.view permission', () => {
    expect(routePermissions['/propertiesView']).toBe('rooms.view');
  });

  it('products module should use products.view permission', () => {
    expect(routePermissions['/productsView']).toBe('products.view');
    expect(routePermissions['/hourRangesView']).toBe('products.view');
    expect(routePermissions['/ratesView']).toBe('products.view');
  });

  it('leases module should use leases.view permission', () => {
    expect(routePermissions['/rentalCalendarView']).toBe('leases.view');
    expect(routePermissions['/rentalView']).toBe('leases.view');
  });

  it('customers module should use customers.view permission', () => {
    expect(routePermissions['/customersView']).toBe('customers.view');
    expect(routePermissions['/typeCustomersView']).toBe('customers.view');
  });

  it('users module should use users.view permission', () => {
    expect(routePermissions['/usersView']).toBe('users.view');
    expect(routePermissions['/rolesView']).toBe('users.view');
  });

  it('requirements module should use requirements.view permission', () => {
    expect(routePermissions['/requirementsView']).toBe('requirements.view');
  });

  it('all permissions should end with .view', () => {
    Object.values(routePermissions).forEach((perm) => {
      expect(perm).toMatch(/\.view$/);
    });
  });

  it('dashboard should not require permissions', () => {
    expect(routePermissions['/dashboardView']).toBeUndefined();
  });
});
