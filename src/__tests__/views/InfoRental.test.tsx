import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoRental } from '@/views/pages/rentalCalendar/stateRental/InfoRental';

vi.mock('@/hooks', () => ({
  useAuthStore: vi.fn(),
  useLeasesStates: vi.fn(),
  useRentalStore: vi.fn(),
}));

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn() },
}));

const mockUseAuthStore = vi.mocked(await import('@/hooks')).useAuthStore;
const mockUseLeasesStates = vi.mocked(await import('@/hooks')).useLeasesStates;
const mockUseRentalStore = vi.mocked(await import('@/hooks')).useRentalStore;

const mockRentalInformation = {
  customer: {
    institution_name: 'Test Institution',
    nit: '1234567',
    contacts: [
      { name: 'Juan Perez', ci_nit: '8888', phone: '7777777' },
    ],
  },
  products: [
    {
      id: 1,
      property: 'Hotel',
      room: 'Room1',
      hour_range: 4,
      start_time: '2026-07-28T09:00:00',
      end_time: '2026-07-28T13:00:00',
      detail: '',
      event: 'Conferencia',
      rental: 1,
      product_price: 500,
    },
  ],
};

function setupHooks(overrides: {
  stateId?: number;
  nextStates?: any[];
  hasPermission?: boolean;
} = {}) {
  const {
    stateId = 3,
    nextStates = [{ id: 5, name: 'Anulado' }],
    hasPermission = true,
  } = overrides;

  mockUseAuthStore.mockReturnValue({
    hasPermission: vi.fn().mockReturnValue(hasPermission),
    username: 'test',
    role: 'Operador',
  } as any);

  mockUseLeasesStates.mockReturnValue({
    rentalInformation: mockRentalInformation,
    currentRentalState: {
      current_state: { id: stateId, name: 'Alquilado' },
      next_states: nextStates,
    },
    postChangeRentalState: vi.fn(),
    patchUpdateTime: vi.fn(),
  } as any);

  mockUseRentalStore.mockReturnValue({
    rentalSelected: { rental: 1, product_id: 1 },
    postPrintDeliveryForm: vi.fn(),
  } as any);
}

describe('InfoRental', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders customer info', () => {
    setupHooks();
    render(<InfoRental date={new Date()} />);

    expect(screen.getByText('Test Institution')).toBeInTheDocument();
    expect(screen.getByText('1234567')).toBeInTheDocument();
  });

  it('renders product info', () => {
    setupHooks();
    render(<InfoRental date={new Date()} />);

    expect(screen.getByText('Conferencia')).toBeInTheDocument();
    expect(screen.getByText('Hotel-Room1')).toBeInTheDocument();
  });

  it('shows ANULAR button for state 1 (Pre-reserva)', () => {
    setupHooks({ stateId: 1 });
    render(<InfoRental date={new Date()} />);

    expect(screen.getByText('ANULAR')).toBeInTheDocument();
  });

  it('shows ANULAR button for state 2 (Reserva)', () => {
    setupHooks({ stateId: 2 });
    render(<InfoRental date={new Date()} />);

    expect(screen.getByText('ANULAR')).toBeInTheDocument();
  });

  it('shows ANULAR button for state 3 (Alquilado)', () => {
    setupHooks({ stateId: 3 });
    render(<InfoRental date={new Date()} />);

    expect(screen.getByText('ANULAR')).toBeInTheDocument();
  });

  it('shows ANULAR button for state 4 (Concluido)', () => {
    setupHooks({ stateId: 4 });
    render(<InfoRental date={new Date()} />);

    expect(screen.getByText('ANULAR')).toBeInTheDocument();
  });

  it('hides ANULAR button for state 5 (Anulado)', () => {
    setupHooks({ stateId: 5, nextStates: [] });
    render(<InfoRental date={new Date()} />);

    expect(screen.queryByText('ANULAR')).not.toBeInTheDocument();
  });

  it('hides ANULAR button when no leases.change permission', () => {
    setupHooks({ stateId: 3, hasPermission: false });
    render(<InfoRental date={new Date()} />);

    expect(screen.queryByText('ANULAR')).not.toBeInTheDocument();
  });

  it('renders contacts section when customer has institution', () => {
    setupHooks();
    render(<InfoRental date={new Date()} />);

    expect(screen.getByText('Contactos:')).toBeInTheDocument();
    expect(screen.getByText('Juan Perez')).toBeInTheDocument();
  });
});
