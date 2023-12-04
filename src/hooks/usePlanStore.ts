import { coffeApi } from "@/services";
import { setPlans } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const api = coffeApi;

export const usePlanStore = () => {
  const { plans, flag } = useSelector((state: any) => state.plans);
  const dispatch = useDispatch();

  const getPlans = async () => {
    try {
      const { data } = await api.get(`/plans/`);
      dispatch(setPlans({ plans: data }));
      return data.total;
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }
  return {
    //* Propiedades
    plans,
    flag,
    //* Métodos
    getPlans,
  }
}
