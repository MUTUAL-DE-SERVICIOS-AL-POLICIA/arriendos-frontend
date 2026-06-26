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
