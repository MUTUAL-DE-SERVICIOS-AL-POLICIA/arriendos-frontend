import { coffeApi } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setWarrantys } from "@/store";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { Reason } from "@/views/pages/rentalCalendar/stateRental/payments";


const api = coffeApi;
export const useWarrantyStore = () => {

  const { warrantys = [], totalWarranty } = useSelector((state: any) => state.warrantys)
  const dispatch = useDispatch();
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
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const getListWarranty = async (rental: number, canEdit: boolean = false, handleModal?: Function) => {
    try {
      const { data } = await api.get('/financials/register_warranty/', {
        params: {
          rental: rental
        }
      });
      const warrantys = [...data.warranty_movements.map((e: any, index: number) => ({
        id: e.correlative,
        type: e.type,
        voucher: e.voucher,
        income: e.income,
        discount: e.discount,
        returned: e.returned,
        balance: e.balance,
        detail: e.detail,
        action: index == data.warranty_movements.length - 1 ?
          <Stack direction="row" alignItems="center">
            <DeleteForever
              onClick={() => deleteLastRegisteredWarranty(rental, canEdit, handleModal)}
              color="error"
              sx={{ cursor: 'pointer' }}
            />
            { canEdit &&
              <Edit
                onClick={() => handleModal!(true, e.id, Reason.warranty)}
                color="success"
                sx={{cursor: 'pointer'}}
              />
            }
          </Stack> : ''
            // canEdit && <Edit
            //   onClick={() => handleModal!(true, e.id, Reason.warranty)}
            //   color="success"
            //   sx={{cursor: 'pointer'}}
            // />
      }))];

      dispatch(setWarrantys({ warrantys: warrantys, totalWarranty: data.total_warranty }));
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

  const deleteLastRegisteredWarranty = async (rental: number, canEdit?: boolean, handleModal?: Function) => {
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
          const res = await api.delete(`/financials/register_warranty/${rental}/`)
          if (res.status == 200) {
            Swal.fire('Registro eliminado', res.data.message, 'success')
            getListWarranty(rental, canEdit, handleModal);
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

  const getDetailWarranty = async (warranty: number) => {
    try {
      const { data } = await api.get(`/financials/edit_warranty/${warranty}/`)
      return data
    } catch(error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const patchRegisterWarranty = async (body: object, warranty: number) => {
    try {
      const { data } = await api.patch(`/financials/edit_warranty/${warranty}/`, body)
      Swal.fire(data.message, '', 'success')
    } catch(error: any) {
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
    warrantys,
    totalWarranty,
    //* Métodos
    postRegisterWarranty,
    getListWarranty,
    getDetailWarranty,
    patchRegisterWarranty
  }
}
