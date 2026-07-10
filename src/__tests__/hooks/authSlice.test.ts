import { describe, it, expect } from 'vitest';
import { authSlice, onLogin, onLogout } from '@/store/auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    status: 'not-authenticated',
    user: {},
    username: '',
    permissions: [] as string[],
    role: null as string | null,
  };

  it('should return initial state', () => {
    const state = authSlice.reducer(undefined, { type: 'unknown' });
    expect(state.status).toBe('not-authenticated');
    expect(state.permissions).toEqual([]);
    expect(state.role).toBeNull();
  });

  it('should handle onLogin', () => {
    const payload = {
      user: { name: 'Dilan' },
      username: 'admin',
      permissions: ['products.view', 'leases.add'],
      role: 'Administrador',
    };
    const state = authSlice.reducer(initialState, onLogin(payload));
    expect(state.status).toBe('authenticated');
    expect(state.username).toBe('admin');
    expect(state.permissions).toEqual(['products.view', 'leases.add']);
    expect(state.role).toBe('Administrador');
  });

  it('should handle onLogout', () => {
    const loggedIn = {
      status: 'authenticated',
      user: { name: 'Dilan' },
      username: 'admin',
      permissions: ['products.view'],
      role: 'Admin',
    };
    const state = authSlice.reducer(loggedIn, onLogout());
    expect(state.status).toBe('not-authenticated');
    expect(state.permissions).toEqual([]);
    expect(state.role).toBeNull();
  });

  it('onLogin with empty permissions defaults to []', () => {
    const state = authSlice.reducer(initialState, onLogin({
      user: { name: 'User' },
      username: 'user1',
      permissions: undefined,
      role: undefined,
    }));
    expect(state.permissions).toEqual([]);
    expect(state.role).toBeNull();
  });
});
