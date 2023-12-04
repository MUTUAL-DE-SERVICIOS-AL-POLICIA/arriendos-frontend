import { coffeApi } from "@/services";
import { useDispatch, useSelector } from "react-redux"
import { setEvents } from '@/store';
import Swal from "sweetalert2";


const api = coffeApi

export const useEventStore = () => {
  const { events } = useSelector((state: any) => state.events);
  const dispatch = useDispatch();

  const getEvents = async () => {
    try {
      const { data } = await api.get('/leases/event/')
      dispatch(setEvents({ events: data }));
      return data
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
    events,
    getEvents
  }
}