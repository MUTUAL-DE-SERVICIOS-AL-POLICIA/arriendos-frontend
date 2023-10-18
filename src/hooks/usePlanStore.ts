import { coffeApiKevin } from "@/services";
import { setPlans } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const api = coffeApiKevin;

export const usePlanStore = () => {
  const { plans, flag } = useSelector((state: any) => state.plans);
  const dispatch = useDispatch();

  const getPlans = async () => {
    try {
      console.log('OBTENIENDO TODOS LOS PLANES')
      const { data } = await api.get(`/plans/`);
      console.log(data)
      dispatch(setPlans({ plans: data }));
      return data.total;
    } catch (error: any) {
      throw Swal.fire('Oops ocurrio algo', 'error.response.data.detail', 'error');
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
