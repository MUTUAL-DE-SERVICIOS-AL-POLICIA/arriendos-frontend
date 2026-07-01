/**
 * Hook personalizado para gestión de autenticación.
 *
 * Este hook proporciona funcionalidades para:
 * - Iniciar sesión (startLogin)
 * - Cerrar sesión (startLogout)
 * - Verificar token de autenticación (checkAuthToken)
 * - Verificar permisos del usuario (hasPermission)
 *
 * Flujo de autenticación:
 * 1. startLogin envía credenciales al backend
 * 2. Backend retorna tokens JWT + datos del usuario + permisos RBAC
 * 3. Datos se almacenan en localStorage y Redux
 * 4. hasPermission verifica si el usuario tiene un permiso específico
 *
 * Formato de permiso: "modulo.accion"
 * Ejemplo: "products.view", "leases.add"
 *
 * Autor: Dilan Torrez
 * Fecha: 2026
 */

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApi } from "@/services";
import {
  clearCustomers,
  clearEvents,
  clearExtraHours,
  clearHourRange,
  clearPayments,
  clearPlans,
  clearProducts,
  clearProperties,
  clearRates,
  clearRentals,
  clearRequirements,
  clearTypesCustomers,
  clearUsers,
  clearWarrantys,
  onLogin,
  onLogout,
} from "@/store";

export const useAuthStore = () => {
  const { status, user, username, permissions, role } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  /**
   * Inicia sesión del usuario.
   *
   * Envía credenciales al backend y almacena:
   * - Tokens JWT (access y refresh) en localStorage
   * - Datos del usuario en localStorage y Redux
   * - Permisos RBAC del usuario
   *
   * @param username - Nombre de usuario
   * @param password - Contraseña del usuario
   *
   * Respuesta exitosa del backend:
   * {
   *   access: "token_jwt...",
   *   refresh: "token_refresh...",
   *   user_id: 1,
   *   username: "admin",
   *   first_name: "Administrador",
   *   last_name: "Sistema",
   *   role: "Operador",
   *   permissions: ["products.view", ...]
   * }
   */
  const startLogin = async ({ username, password }: { username: string, password: string }) => {
    try {
      const { data } = await coffeApi.post('/login/auth/', { username, password });
      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh', data.refresh);
      const userName = `${data.first_name} ${data.last_name}`;
      localStorage.setItem('user', userName);
      localStorage.setItem('username', data.username);
      localStorage.setItem('permissions', JSON.stringify(data.permissions || []));
      localStorage.setItem('role', data.role || '');
      dispatch(onLogin({
        user: userName,
        username: data.username,
        permissions: data.permissions || [],
        role: data.role || null,
      }));
    } catch (error: any) {
      dispatch(onLogout());
      const message = error.response.data.error
      Swal.fire('Error', message, 'error')
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = localStorage.getItem('user')
      const username = localStorage.getItem('username') || '';
      const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
      const role = localStorage.getItem('role') || null;
      const decodedToken = decodeToken(token)
      if(isTokenExpired(decodedToken)) {
        localStorage.clear();
        return dispatch(onLogout());
      } else {
        return dispatch(onLogin({ user, username, permissions, role }))
      }
    } else {
      localStorage.clear();
      dispatch(onLogout());
    }
  }

  const isTokenExpired = (decodeToken:any) => {
    if(!decodeToken || !decodeToken.exp) {
      return true
    }
    return decodeToken.exp * 1000 < Date.now();
  }

  const decodeToken = (token:any) => {
    try {
      const payload = token.split('.')[1]
      return JSON.parse(atob(payload))
    } catch(e) {
      console.error('Failed to decode token: ', e)
      return null
    }
  };

  /**
   * Verifica si el usuario tiene un permiso específico.
   *
   * Utilizada en componentes para mostrar/ocultar elementos
   * basándose en los permisos del usuario.
   *
   * @param permission - Permiso a verificar en formato "modulo.accion"
   * @returns true si tiene el permiso, false si no
   *
   * Ejemplos:
   * hasPermission('products.view') - ¿Puede ver productos?
   * hasPermission('leases.add') - ¿Puede crear arriendos?
   * hasPermission('users.delete') - ¿Puede eliminar usuarios?
   */
  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(clearCustomers())
    dispatch(clearEvents());
    dispatch(clearExtraHours());
    dispatch(clearHourRange());
    dispatch(clearPayments());
    dispatch(clearPlans());
    dispatch(clearProducts());
    dispatch(clearProperties());
    dispatch(clearRates());
    dispatch(clearRentals());
    dispatch(clearRequirements());
    dispatch(clearTypesCustomers());
    dispatch(clearUsers());
    dispatch(clearWarrantys());
    dispatch(onLogout());
  }

  return {
    status,
    user,
    username,
    permissions,
    role,
    startLogin,
    checkAuthToken,
    startLogout,
    hasPermission,
  }
}
