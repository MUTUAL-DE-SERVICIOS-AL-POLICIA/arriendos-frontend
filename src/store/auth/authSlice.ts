/**
 * Slice de autenticación para Redux Toolkit.
 *
 * Este slice maneja el estado de autenticación del usuario incluyendo:
 * - status: Estado de autenticación ('authenticated' | 'not-authenticated')
 * - user: Datos del usuario (nombre completo)
 * - username: Nombre de usuario para login
 * - permissions: Lista de permisos RBAC del usuario
 * - role: Nombre del rol asignado al usuario
 *
 * Estructura de permissions:
 * ["products.view", "leases.add", "users.change", ...]
 *
 * Formato de permiso: "modulo.accion"
 * - modulo: Código del módulo (products, leases, users, etc.)
 * - accion: Tipo de permiso (view, add, change, delete)
 *
 * Autor: Dilan Torrez
 * Fecha: 2026
 */

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        user: {},
        username: '',
        permissions: [] as string[],
        role: null as string | null,
        is_superuser: false,
    },
    reducers: {
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload.user;
            state.username = payload.username || '';
            state.permissions = payload.permissions || [];
            state.role = payload.role || null;
            state.is_superuser = payload.is_superuser || false;
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.username = '';
            state.permissions = [];
            state.role = null;
            state.is_superuser = false;
        },
    }
});

export const { onLogin, onLogout } = authSlice.actions;
