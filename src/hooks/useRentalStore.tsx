import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import Swal from 'sweetalert2';
import { setDaySelected, setGroupRentals, setRentalSelected, setRentals, setShoppingCart, setAllRentals, setAllRentalsWithProducts } from '@/store';
import { formatDate } from '@/helpers';
import { EventsCalendarModel } from '@/models';
import {  Edit } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { MenuComponent } from '@/components/Menu';
import { printDocument } from '@/utils/helper';

const api = coffeApi;

export const useRentalStore = () => {
  const { rentals = [], groupRentals = [], shoppingCart = [], rentalSelected, daySelected, allRentals, allRentalsWithProducts } = useSelector((state: any) => state.rentals);
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
      printDocument(res)
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
      printDocument(res)
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
      printDocument(res)
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
      printDocument(res)
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

  const getAllRentals = async (page: number, limit: number, handleDialog: Function, search: string|null = null) => {
    try {
      let filter: any = { params: { page: page, search }}
      if(limit != -1) filter.params.limit = limit
      const { data } = await api.get('/leases/rental_list/', filter)
      const rentals: any = []
      data.rentals.forEach((element: any) => {
        const rental: any = {}
        rental.id = element.correlative
        rental.contract_number = element.contract_number
        rental.customer_name = element.customer_name
        rental.state_name = element.state_name
        rental.date = element.date
        rental.action = element.can_edit ?
        <Stack direction="row" spacing={1} alignItems="center">
          <Edit
            onClick={() => handleDialog(true, element.id)}
            color="success"
            sx={{cursor: 'pointer'}}
          />
          <MenuComponent
            options={[
              {id: 1, name: 'Reserva efectiva'},
              {id: 2, name: 'Conformidad garantía'},
              {id: 3, name: 'Sol. dev. garantía'},
            ]}
            rental={element.id}
          />
        </Stack> : null
        rentals.push(rental)
      });
      dispatch(setAllRentals({allRentals: rentals}))
      data.rentals.forEach((element:any) => {
        let allProducts:any = []
        element.selected_product.forEach((product:any) => {
            let newProduct: any = []
            newProduct.id = product.id
            newProduct.start_time = product.start_time
            newProduct.end_time = product.end_time
            newProduct.event = product.event
            newProduct.action = <MenuComponent
              options = {[
                {id: 4, name: 'Entrega y recep. Ambientes'},
                {id: 5, name: 'Form. horas extras'},
                {id: 6, name: 'Ejecución garantía'}
              ]}
              rental={element.id}
              event={newProduct.id}
            />
            allProducts.push(newProduct)
        })
        element.selected_product = allProducts
      });
      dispatch(setAllRentalsWithProducts({allRentalsWithProducts: data.rentals}))
      return data.total
    } catch(error:any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else {
        console.log(error)
        throw new Error('Ocurrió algun error en el backend')
      }
    }
  }

  return {
    //* Propiedades
    rentals,
    allRentals,
    allRentalsWithProducts,
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
    saveDaySelected,
    getAllRentals
  }
}