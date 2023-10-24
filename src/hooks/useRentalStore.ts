import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import Swal from 'sweetalert2';
import { setRentals } from '@/store';

const api = coffeApiKevin;

const getFormatDate = (isoDate: string): Date => {
  const date = new Date(isoDate);
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return utcDate;
};


export const useRentalStore = () => {
  const { rentals = [] } = useSelector((state: any) => state.rentals);
  const dispatch = useDispatch();

  const getRentals = async (roomId?: number) => {
    try {
      console.log("OBTENIENDO ALQUILERES")
      const { data } = await api.get(`/leases/calendar/${roomId ? `?room=${roomId}` : ''}`)
      console.log(data)
      let i = 0;
      const events: any = []
      data.forEach((element: any) => {
        const event: any = {}
        event.id = i
        event.title = element.event_type_name
        event.start = getFormatDate(element.start_time)
        event.rental = element.rental
        event.end = getFormatDate(element.end_time)
        events.push(event)
        i++
      });
      dispatch(setRentals({ rentals: events }))
      return data;
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response, 'error')
    }
  }
  const postCreateRental = async (body: object, setShoppingCart: Function, onClose: Function) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas creando un Alquiler`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("REGISTRANDO ALQUILER")
          console.log(body)
          await api.post('/leases/', body)
          Swal.fire('¡Prereserva exitoso!', '', 'success');
          setShoppingCart([])
          onClose()
        } catch (error: any) {
          throw Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
      }
    })
  }
  const getRentalRequirements = async (rental: number) => {
    try {
      
      const { data } = await api.get('/requirements/customer/', {
        params: {
          rental: rental
        }
      })
      return data.data
    } catch(error: any) {
      Swal.fire('Oops ocurrio algo', error.response, 'error')
    }
  }
  const postSendRequirements = async (body: object) => {
    try {
      const res = await api.post('/requirements/register_delivered_requirements', body)
      if(res.status == 200) {
        return true
      } else return false
    } catch(error: any) {
      throw Swal.fire('Oops ocurrio algo', error.response, 'error')
    }
  }

  const postRegisterPayment = async (body: object) => {
    try {
      const res = await api.post('/leases/register_payment/', body)
      if(res.status == 200) {
        Swal.fire('Registro exitoso', res.data.message, 'success')
      } else {
        new Error("Error en la llamada al servidor")
      }
    } catch(error: any) {
      throw Swal.fire('Oops ocurrio algo', error.message, 'error')
    }
  }

  const getRegistersPayments = async (rental:number) => {
    try {
      const res = await api.get('/leases/register_payment/', {
        params: {
          rental: rental
        }
      })
      if(res.status == 200) {
        const { data } = res
        return data
      } else new Error("Error en la llamada al servidor")
    } catch(error: any) {
      Swal.fire('Oops ocurrio algo', error.message, 'error')
    }
  }

  return {
    //* Propiedades
    rentals,
    //* Métodos
    postCreateRental,
    getRentals,
    getRentalRequirements,
    postSendRequirements,
    postRegisterPayment,
    getRegistersPayments
  }
}