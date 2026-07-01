/**
 * Hook personalizado para gestión de roles (RBAC).
 *
 * Este hook proporciona funcionalidades para:
 * - Obtener roles del sistema (getRoles)
 * - Obtener módulos disponibles (getModules)
 * - Obtener permisos disponibles (getPermissions)
 * - Crear roles (postCreateRole)
 * - Actualizar roles (patchUpdateRole)
 * - Eliminar roles (deleteRemoveRole)
 * - Asignar roles a usuarios (assignRole)
 * - Obtener asignaciones de roles (getUserRoles)
 * - Remover roles de usuarios (removeUserRole)
 *
 * Formato de permiso: "modulo.accion"
 * Ejemplo: "products.view", "leases.add"
 *
 * Autor: Dilan Torrez
 * Fecha: 2026
 */

import { coffeApi } from '@/services';
import Swal from 'sweetalert2';

const api = coffeApi;

export const useRoleStore = () => {

  const getRoles = async (page: number, limit: number, search: string) => {
    try {
      let filter: any = { params: { page: page } };
      if (limit != -1) filter.params.limit = limit;
      if (search !== '') filter.params.search = search;
      const { data } = await api.get('/roles/', filter);
      return { roles: data.roles, total: data.total };
    } catch (error: any) {
      if (error.response && error.response.status == 403) {
        Swal.fire('Acceso denegado', error.response.data.detail, 'warning');
      }
      return { roles: [], total: 0 };
    }
  };

  const getModules = async () => {
    try {
      const { data } = await api.get('/roles/modules/');
      return data.modules;
    } catch (error: any) {
      return [];
    }
  };

  const getPermissions = async () => {
    try {
      const { data } = await api.get('/roles/permissions/');
      return data.permissions;
    } catch (error: any) {
      return [];
    }
  };

  const postCreateRole = async (body: object) => {
    try {
      await api.post('/roles/', body);
      Swal.fire('Rol creado correctamente', '', 'success');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.detail || error.response?.data?.message || 'Error al crear el rol';
      Swal.fire('Error', message, 'error');
      return false;
    }
  };

  const patchUpdateRole = async (id: number, body: object) => {
    try {
      await api.patch(`/roles/${id}`, body);
      Swal.fire('Rol actualizado correctamente', '', 'success');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.detail || error.response?.data?.message || 'Error al actualizar el rol';
      Swal.fire('Error', message, 'error');
      return false;
    }
  };

  const deleteRemoveRole = async (id: number) => {
    try {
      await api.delete(`/roles/${id}`);
      Swal.fire('Rol eliminado correctamente', '', 'success');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.detail || error.response?.data?.message || 'Error al eliminar el rol';
      Swal.fire('Error', message, 'error');
      return false;
    }
  };

  const assignRole = async (userId: number, roleId: number) => {
    try {
      await api.post('/roles/assign/', { user_id: userId, role_id: roleId });
      Swal.fire('Rol asignado correctamente', '', 'success');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.detail || error.response?.data?.message || 'Error al asignar el rol';
      Swal.fire('Error', message, 'error');
      return false;
    }
  };

  const getUserRoles = async () => {
    try {
      const { data } = await api.get('/roles/assignments/');
      return data.user_roles;
    } catch (error: any) {
      return [];
    }
  };

  const removeUserRole = async (id: number) => {
    try {
      await api.delete(`/roles/assignments/${id}`);
      Swal.fire('Rol removido del usuario', '', 'success');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.detail || error.response?.data?.message || 'Error al remover el rol';
      Swal.fire('Error', message, 'error');
      return false;
    }
  };

  return {
    getRoles,
    getModules,
    getPermissions,
    postCreateRole,
    patchUpdateRole,
    deleteRemoveRole,
    assignRole,
    getUserRoles,
    removeUserRole,
  };
};
