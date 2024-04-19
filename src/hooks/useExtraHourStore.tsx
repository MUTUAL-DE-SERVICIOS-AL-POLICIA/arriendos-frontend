import { coffeApi } from "@/services";
import { setExtraHours } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { Reason } from "@/views/pages/rentalCalendar/stateRental/payments";
import { printDocument } from "@/utils/helper";

const api = coffeApi;


export const useExtraHourStore = () => {
  const { extraHours = [] } = useSelector((state: any) => state.extraHours);
  const dispatch = useDispatch();

  const getRegisterExtraHours = async (rental: number, canEdit: boolean = false, handleModal?: Function) => {
    try {
      const { data } = await api.get('/leases/list_additional_hour_applied/', {
        params: {
          rental: rental
        }
      });
      const extraHours = [...data.map((e: any, index: number) => ({
        roomTitle: `${e.property} ${e.room} ${e.date}`,
        event: e.event,
        voucherNumber: e.voucher_number,
        quantity: e.number,
        total: e.total,
        detail: e.description,
        action: index == data.length - 1 ?
          <Stack>
            <DeleteForever
              onClick={() => deleteLastRegisteredExtraHour(data[index].selected_product, rental)}
              color="error"
              sx={{ cursor: 'pointer' }}
            />
            { canEdit &&
              <Edit
                onClick={() => handleModal!(true, Reason.extraHour)}
                color="success"
                sx={{cursor: 'pointer'}}
              />
            }
          </Stack>  : canEdit && <Edit
            onClick={() => handleModal!(true, Reason.extraHour)}
            color="success"
            sx={{ cursor: 'pointer'}}
          />
      }))];
      dispatch(setExtraHours({ extraHours: extraHours }));
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
  const getExtraHour = async (selectedProduct: number) => {
    try {
      const { data } = await api.get('/product/get_price_additional_hour/', {
        params: {
          selected_product: selectedProduct
        }
      });
      return data.price;
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

  const postRegisterExtraHour = async (rental: number, body: any) => {
    try {
      const res = await api.post('/leases/register_additional_hour_applied/', body, {
        responseType: 'arraybuffer'
      });
      printDocument(res)
      getRegisterExtraHours(rental)
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
  const deleteLastRegisteredExtraHour = async (selectedProduct: number, rental: number) => {
    Swal.fire({
      title: '¿Está seguro de esta acción?',
      text: `Esta acción no es reversible`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0B815A',
      confirmButtonText: 'Eliminar',
      cancelButtonColor: '#F04438',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await api.delete(`/leases/register_additional_hour_applied/${selectedProduct}/`)
          if (res.status == 200) {
            Swal.fire('Registro eliminado', res.data.message, 'success')
            getRegisterExtraHours(rental);
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
    })
  }

  return {
    //* Propiedades
    extraHours,
    //* Métodos
    getRegisterExtraHours,
    getExtraHour,
    postRegisterExtraHour,
  }
}
