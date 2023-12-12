import { useDispatch, useSelector } from "react-redux"
import { coffeApi } from "@/services";
import { setAllStates, setCurrentRentalState, setRentalInformation, setStates, setUpdateGroupRental, setUpdateRental, setUpdateRentalSelected } from '@/store';
import Swal from "sweetalert2";
import { getDateJSON } from "@/helpers";

const api = coffeApi;

export const useLeasesStates = () => {
  const { states, rentalInformation, currentRentalState } = useSelector((state: any) => state.rentals);
  const dispatch = useDispatch()

  const getLeaseState = async () => {
    try {
      const { data } = await api.get(`/leases/list_state/`)
      dispatch(setStates({ states: data }))
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

  const getAllLeaseState = async () => {
    try {
      const { data } = await api.get(`/leases/state/`)
      dispatch(setAllStates({ allStates: data }))
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

  const getRental = async (rentalId: number) => {
    try {
      dispatch(setRentalInformation({ rentalInformation: null }))
      const { data } = await api.get(`/leases/get_rental_information/`, {
        params: {
          rental: rentalId
        }
      });
      dispatch(setRentalInformation({ rentalInformation: data }))
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

  const getCurrentLeaseState = async (rental: number) => {
    try {
      dispatch(setCurrentRentalState({ currentRentalState: null }));
      const { data } = await api.get(`/leases/get_state/`, {
        params: {
          rental: rental
        }
      })
      dispatch(setCurrentRentalState({ currentRentalState: data }));
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
  const postChangeRentalState = async (body: any) => {
    try {
      const { data } = await api.post('/leases/change_state/', body)
      dispatch(setUpdateRental({ ...data, productId: body.rental }));
      dispatch(setUpdateGroupRental({ ...data, productId: body.rental }))
      dispatch(setUpdateRentalSelected({ ...data, productId: body.rental }))
      getCurrentLeaseState(body.rental)
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

  const patchUpdateTime = async (productId: number, body: any) => {
    try {
      await api.patch(`/leases/selected_product/${productId}`, {
        start_time: getDateJSON(body.start),
        end_time: getDateJSON(body.end)
      });
      Swal.fire('Se edito correctamente la fecha', '', 'success');
      dispatch(setUpdateRental({ ...body, productId }));
      dispatch(setUpdateGroupRental({ ...body, productId }))
      dispatch(setUpdateRentalSelected({ ...body }))
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
    states,
    rentalInformation,
    currentRentalState,
    /* */
    getLeaseState,
    getRental,
    getCurrentLeaseState,
    postChangeRentalState,
    patchUpdateTime,
    getAllLeaseState
  }
}