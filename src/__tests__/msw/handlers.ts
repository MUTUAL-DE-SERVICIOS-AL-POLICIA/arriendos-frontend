import { http, HttpResponse } from 'msw';

const BASE = '/api';

export const handlers = [
  http.get(`${BASE}/users/`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 0);
    const limit = Number(url.searchParams.get('limit') || 10);

    return HttpResponse.json({
      status: 'success',
      total: 2,
      page,
      last_page: 1,
      users: [
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
      ],
    });
  }),

  http.delete(`${BASE}/users/state/:id`, ({ params }) => {
    const id = Number(params.id);
    return HttpResponse.json({
      status: 'success',
      message: id === 1 ? 'Usuario desactivado' : 'Usuario activado',
    });
  }),

  http.post(`${BASE}/roles/assign/`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({
      status: 'success',
      data: { id: 1, user: body.user_id, role: body.role_id },
    }, { status: 201 });
  }),

  http.get(`${BASE}/roles/`, () => {
    return HttpResponse.json({
      status: 'success',
      total: 2,
      page: 0,
      last_page: 1,
      roles: [
        { id: 1, name: 'Administrador', description: 'Admin role', is_active: true, permissions_data: [] },
        { id: 2, name: 'Operador', description: 'Operator role', is_active: true, permissions_data: [] },
      ],
    });
  }),

  http.get(`${BASE}/roles/assignments/`, () => {
    return HttpResponse.json({
      status: 'success',
      user_roles: [
        { id: 1, user: { id: 1, username: 'admin1' }, role: { id: 1, name: 'Administrador' } },
        { id: 2, user: { id: 2, username: 'operador1' }, role: { id: 2, name: 'Operador' } },
      ],
    });
  }),
];
