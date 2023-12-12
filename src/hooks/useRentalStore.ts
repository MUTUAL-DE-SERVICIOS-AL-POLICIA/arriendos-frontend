import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import Swal from 'sweetalert2';
import { setDaySelected, setGroupRentals, setRentalSelected, setRentals, setShoppingCart } from '@/store';
import printJS from 'print-js';
import { formatDate } from '@/helpers';
import { EventsCalendarModel } from '@/models';

const api = coffeApi;

export const useRentalStore = () => {
  const { rentals = [], groupRentals = [], shoppingCart = [], rentalSelected, daySelected } = useSelector((state: any) => state.rentals);
  const dispatch = useDispatch();

  const setUpdateShoppingCart = async (items: any) => {
    dispatch(setShoppingCart({ shoppingCart: items }))
  }
  const getRentals = async (roomId?: number) => {
    try {
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
        event.name_state = element.name_state
        events.push(event)
        i++
      });
      dispatch(setRentals({ rentals: events }));
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

  const saveGroupRental = (rentals: EventsCalendarModel[]) => {
    dispatch(setGroupRentals({ groupRentals: rentals }))
  }
  const saveRentalSelected = (rental: EventsCalendarModel) => {
    dispatch(setRentalSelected({ rentalSelected: rental }))
  }

  const postCreateRental = async (body: object, onClose: Function) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Se creará un alquiler`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0B815A',
      confirmButtonText: 'Crear',
      cancelButtonColor: '#F04438',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.post('/leases/', body)
          Swal.fire('¡Prereserva exitoso!', '', 'success');
          setShoppingCart({ shoppingCart: [] })
          onClose()
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
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
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
      if (error.response.data instanceof ArrayBuffer) {
        const errorMessage = new TextDecoder('utf-8').decode(error.response.data)
        const message = JSON.parse(errorMessage).error
        Swal.fire('Error', message, 'error')
      } else if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response.status == 400) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
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
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  // Solicitud de devolución de garantía
  const getPrintWarrantyReturn = async (rental: number) => {
    try {
      const res = await api.get('/financials/warranty_request/', {
        params: {
          rental: rental
        },
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
      if (error.response.data instanceof ArrayBuffer) {
        const errorMessage = new TextDecoder('utf-8').decode(error.response.data)
        const message = JSON.parse(errorMessage).error
        Swal.fire('Error', message, 'error')
      } else if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  // Impresión de acta de entrega
  const postPrintDeliveryForm = async (body: object) => {
    try {
      const res = await api.post('/leases/deliveryform/', body, {
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
      if (error.response.data instanceof ArrayBuffer) {
        const errorMessage = new TextDecoder('utf-8').decode(error.response.data)
        const message = JSON.parse(errorMessage).error
        Swal.fire('Error', message, 'error')
      } else if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  // Impresión de conformidad
  const getPrintReturnWarrantyForm = async (rental: number) => {
    try {
      const res = await api.get('/financials/return_warranty_form/', {
        params: {
          rental: rental
        },
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
      if (error.response.data instanceof ArrayBuffer) {
        const errorMessage = new TextDecoder('utf-8').decode(error.response.data)
        const message = JSON.parse(errorMessage).error
        Swal.fire('Error', message, 'error')
      } else if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const saveDaySelected = async (day: Date) => {
    dispatch(setDaySelected({ daySelected: day }))
  }

  return {
    //* Propiedades
    rentals,
    groupRentals,
    rentalSelected,
    daySelected,
    shoppingCart,
    //* Métodos
    setUpdateShoppingCart,
    getRentals,
    saveGroupRental,
    saveRentalSelected,
    getRentalRequirements,
    postSendRequirements,
    postWarrantyReturn,
    postCreateRental,
    getPrintWarrantyReturn,
    postPrintDeliveryForm,
    getPrintReturnWarrantyForm,
    saveDaySelected
  }
}