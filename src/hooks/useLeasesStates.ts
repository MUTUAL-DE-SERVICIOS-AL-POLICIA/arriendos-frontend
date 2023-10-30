import { useDispatch, useSelector } from "react-redux"
import { coffeApiKevin } from "@/services";
import { setLeaseState } from '@/store';
import Swal from "sweetalert2";

const api = coffeApiKevin;

export const useLeasesStates = () => {
  const { leaseStates, currentLeaseState } = useSelector((state: any) => state.leaseStates)
  const dispatch = useDispatch()

  const getLeaseState = async () => {
    const { data } = await api.get(`/leases/list_state/`)
    dispatch(setLeaseState({ leaseStates: data }))
  }
  const getCurrentLeaseState = async (rental: number) => {
    const { data } = await api.get(`/leases/get_state/`, {
      params: {
        rental: rental
      }
    })
    return data;
  }
  const postChangeRentalState = async (body: object) => {
    try {
      const res = await api.post('/leases/change_state/', body)
      if (res.status == 200) {
        return true
      } else return false
    } catch (error: any) {
      throw Swal.fire('Oops ocurrio algo', error.response, 'error')
    }
  }

  const patchUpdateTime = async (productId: number, body: object) => {
    try {
      console.log('EDITANDO LA HORA DE UN PRODUCTO SELECCIONADO');
      const { data } = await api.patch(`/leases/selected_product/${productId}`, body);
      console.log(data)
      // dispatch(refreshCustomer());
      Swal.fire('Se edito correctamente la fecha', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response, 'error');
    }
  }

  return {
    leaseStates,
    currentLeaseState,
    getLeaseState,
    getCurrentLeaseState,
    postChangeRentalState,
    patchUpdateTime
  }
}