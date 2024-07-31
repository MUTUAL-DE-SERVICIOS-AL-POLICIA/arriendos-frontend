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
  const { status, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ username, password }: { username: string, password: string }) => {
    try {
      const { data } = await coffeApi.post('/login/auth/', { username, password });
      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh', data.refresh);
      const user = `${data.first_name} ${data.last_name}`;
      localStorage.setItem('user', user);
      dispatch(onLogin(user));
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
      const decodedToken = decodeToken(token)
      if(isTokenExpired(decodedToken)) {
        localStorage.clear();
        return dispatch(onLogout());
      } else {
        return dispatch(onLogin(user))
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
    console.log(token)
    try {
      const payload = token.split('.')[1]
      return JSON.parse(atob(payload))
    } catch(e) {
      console.error('Failed to decode token: ', e)
      return null
    }
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
    //* Propiedades
    status,
    user,

    //* Métodos
    startLogin,
    checkAuthToken,
    startLogout,
  }

}
