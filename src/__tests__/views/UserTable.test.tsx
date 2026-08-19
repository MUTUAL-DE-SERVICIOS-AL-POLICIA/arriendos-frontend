import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserTable } from '@/views/pages/users/UserTable';

vi.mock('@/hooks', () => ({
  useUserStore: vi.fn(),
  useAuthStore: vi.fn(),
}));

vi.mock('@/views/pages/users', () => ({
  AssignRoleDialog: vi.fn(() => null),
}));

const mockUseUserStore = vi.mocked(await import('@/hooks')).useUserStore;
const mockUseAuthStore = vi.mocked(await import('@/hooks')).useAuthStore;

const defaultUsers = [
  {
    id: 1,
    username: 'admin1',
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@test.com',
    is_active: true,
    role: { id: 1, name: 'Administrador' },
  },
  {
    id: 2,
    username: 'operador1',
    first_name: 'Operador',
    last_name: 'User',
    email: 'op@test.com',
    is_active: true,
    role: { id: 2, name: 'Operador' },
  },
  {
    id: 3,
    username: 'cajero1',
    first_name: 'Cajero',
    last_name: 'User',
    email: 'cajero@test.com',
    is_active: true,
    role: null,
  },
];

function setupStores(overrides: Partial<ReturnType<typeof useUserStore>> = {}) {
  mockUseUserStore.mockReturnValue({
    users: defaultUsers,
    flag: 0,
    getUsers: vi.fn().mockResolvedValue(3),
    toggleActivation: vi.fn(),
    usersLDAP: [],
    getUsersLdap: vi.fn(),
    postCreateUser: vi.fn(),
    ...overrides,
  } as any);
}

function setupAuth(overrides: Partial<ReturnType<typeof useAuthStore>> = {}) {
  mockUseAuthStore.mockReturnValue({
    hasPermission: vi.fn().mockReturnValue(true),
    username: 'admin1',
    role: 'Administrador',
    ...overrides,
  } as any);
}

describe('UserTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user rows with correct data', () => {
    setupStores();
    setupAuth();

    render(<UserTable />);

    expect(screen.getByText('admin1')).toBeInTheDocument();
    expect(screen.getByText('operador1')).toBeInTheDocument();
    expect(screen.getByText('cajero1')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Sin rol')).toBeInTheDocument();
  });

  it('shows table headers', () => {
    setupStores();
    setupAuth();

    render(<UserTable />);

    expect(screen.getByText('Cuenta')).toBeInTheDocument();
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Apellido')).toBeInTheDocument();
    expect(screen.getByText('Correo')).toBeInTheDocument();
    expect(screen.getByText('Rol')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  it('disables switch for current user', () => {
    setupStores();
    setupAuth({ username: 'admin1' });

    render(<UserTable />);

    const switches = screen.getAllByRole('checkbox');
    const adminSwitch = switches[0];
    expect(adminSwitch).toBeDisabled();
  });

  it('disables switch for admin when viewer is operator', () => {
    setupStores();
    setupAuth({ username: 'operador1', role: 'Operador' });

    render(<UserTable />);

    const switches = screen.getAllByRole('checkbox');
    const adminSwitch = switches[0];
    expect(adminSwitch).toBeDisabled();
  });

  it('hides assign role button when no users.change permission', () => {
    setupStores();
    setupAuth({ hasPermission: vi.fn().mockReturnValue(false) });

    const { container } = render(<UserTable />);

    const assignButtons = container.querySelectorAll('[title="Asignar Rol"]');
    expect(assignButtons.length).toBe(0);
  });

  it('hides switch when no users.delete permission', () => {
    setupStores();
    setupAuth({ hasPermission: vi.fn().mockImplementation((p: string) => p !== 'users.delete') });

    const { container } = render(<UserTable />);

    const switches = container.querySelectorAll('input[type="checkbox"]');
    expect(switches.length).toBe(0);
  });

  it('shows "Sin rol" for user without role', () => {
    setupStores();
    setupAuth();

    render(<UserTable />);

    const sinRol = screen.getByText('Sin rol');
    expect(sinRol).toBeInTheDocument();
  });

  it('calls getUsers on mount', () => {
    const getUsers = vi.fn().mockResolvedValue(3);
    setupStores({ getUsers });
    setupAuth();

    render(<UserTable />);

    expect(getUsers).toHaveBeenCalled();
  });
});
