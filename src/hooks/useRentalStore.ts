import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin, coffeApiLeandro } from '@/services';
import Swal from 'sweetalert2';
import { setRentals } from '@/store';
import printJS from 'print-js';
import { formatDate } from '@/helpers';

const api = coffeApiKevin;

export const useRentalStore = () => {
  const { rentals = [] } = useSelector((state: any) => state.rentals);
  const dispatch = useDispatch();

  const getRentals = async (roomId?: number) => {
    try {
      console.log("OBTENIENDO ALQUILERES")
      const { data } = await api.get(`/leases/calendar/`, {
        params: {
          room: roomId
        }
      })
      let i = 0;
      const events: any = []
      data.forEach((element: any) => {
        const event: any = {}
        event.id = i
        event.title = element.event_type_name
        event.start = formatDate(element.start_time)
        event.rental = element.rental
        event.end = formatDate(element.end_time)
        event.product_id = element.selected_product_id
        events.push(event)
        i++
      });
      console.log(events)
      dispatch(setRentals({ rentals: events }));
    } catch (error: any) {
      if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error('Ocurrió algun error en el backend')
    }
  }

  const getRental = async (rentalId: number) => {
    console.log("OBTENIENDO LA INFORMACIÓN DE UN ALQUILER")
    const { data } = await api.get(`/leases/get_rental_information/`, {
      params: {
        rental: rentalId
      }
    });
    console.log(data)
    return data;
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
          if (error.message && error.response.status == 400) {
            const message = error.response.data.error
            Swal.fire('Error', message, 'error')
          }
          throw new Error('Ocurrió algun error en el backend')
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
    } catch (error: any) {
      if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error('Ocurrió algun error en el backend')
    }
  }

  const postSendRequirements = async (body: object) => {
    try {
      const res = await api.post('/requirements/register_delivered_requirements', body, {
        responseType: 'arraybuffer'
      })
      if (res.status != 200 && res.status != 404) {
        return false
      }
      const contentType = res.headers['content-type']
      if (contentType != 'application/pdf') {
        return false
      }
      const blob = new Blob([res.data], {
        type: "application/pdf"
      })
      const pdfURL = window.URL.createObjectURL(blob)
      printJS(pdfURL)
      return true
    } catch (error: any) {
      if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error('Ocurrió algun error en el backend')
    }
  }

  const postRegisterPayment = async (body: object) => {
    try {
      const res = await api.post('/financials/register_payment/', body)
      if (res.status == 201) {
        Swal.fire('Registro exitoso', res.data.message, 'success')
      }
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error("Ocurrió algun error en el backend")
    }
  }

  const getRegistersPayments = async (rental: number) => {
    try {
      const res = await api.get('/financials/register_payment/', {
        params: {
          rental: rental
        }
      })
      if (res.status == 200) {
        const { data } = res
        return data
      }
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error("Ocurrió algun error en el backend")
    }
  }

  const postRegisterWarranty = async (body: object) => {
    try {
      const res = await api.post('/financials/register_warranty/', body)
      if (res.status == 201) {
        Swal.fire('Registro exitoso', res.data.message, 'success')
      }
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error('Ocurrió algun error en el backend')
    }
  }

  const postRegisterDiscountWarranty = async (body: object) => {
    try {
      const res = await api.post('/financials/discount_warranty/', body, {
        responseType: 'arraybuffer'
      })

      const blob = new Blob([res.data], {
        type: "application/pdf"
      })
      const pdfURL = window.URL.createObjectURL(blob)
      printJS(pdfURL)
      return true

    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error('Ocurrió algun error en el backend')
    }
  }

  const postWarrantyReturn = async (body: object) => {
    try {
      const res = await api.post('/financials/warranty_returned/', body)
      if (res.status == 201) {
        Swal.fire('Devolución exitosa', res.data.message, 'success')
      }
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error('Ocurrió algun error en el backend')
    }
  }

  const deleteLastRegisteredPayment = async (rental: number) => {
    try {
      const res = await api.delete(`/financials/register_payment/${rental}/`)
      if(res.status == 200) {
        Swal.fire('Registro eliminado', res.data.message, 'success')
      }
    } catch(error: any) {
      if(error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error('Ocurrió algun error en el backend')
    }
  }

  return {
    //* Propiedades
    rentals,
    //* Métodos
    getRentals,
    getRentalRequirements,
    postSendRequirements,
    postRegisterPayment,
    getRegistersPayments,
    postRegisterWarranty,
    postRegisterDiscountWarranty,
    postWarrantyReturn,
    getRental,
    postCreateRental,
    deleteLastRegisteredPayment
  }
}