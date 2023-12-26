import { coffeApi } from "@/services";
import { setPayments } from "@/store";
import { Reason } from "@/views/pages/rentalCalendar/stateRental/payments";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const api = coffeApi;

export const usePaymentsStore = () => {
  const { payments = [], amountTotal, detailPayment = {} } = useSelector((state: any) => state.payments);
  const dispatch = useDispatch();
  const getRegistersPayments = async (rental: number, canEdit: boolean = false, handleModal?: Function) => {
    try {
      const { data } = await api.get('/financials/register_payment/', {
        params: {
          rental: rental
        }
      });
      const payments = [...data.payments.map((e: any, index: number) => ({
        voucher_number: e.voucher_number,
        amount_paid: e.amount_paid,
        payable_mount: e.payable_mount,
        detail: e.detail,
        action: index == data.payments.length - 1 ?
          <Stack direction="row" alignItems="center">
            <DeleteForever
              onClick={() => deleteLastRegisteredPayment(rental, canEdit, handleModal)}
              color="error"
              sx={{ cursor: 'pointer' }}
            />
            { canEdit &&
              <Edit
                onClick={() => handleModal!(true, e.id, Reason.payment)}
                color="success"
                sx={{cursor: 'pointer'}}
              />
            }
          </Stack> : ''
            // canEdit && <Edit
            //   onClick={() => handleModal!(true, e.id, Reason.payment)}
            //   color="success"
            //   sx={{cursor: 'pointer'}}
            // />
      }))];
      dispatch(setPayments({ payments: payments, amountTotal: data.total_mount }));
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
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const deleteLastRegisteredPayment = async (rental: number, canEdit?: boolean, handleModal?: Function) => {
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
          const res = await api.delete(`/financials/register_payment/${rental}/`)
          if (res.status == 200) {
            Swal.fire('Registro eliminado', res.data.message, 'success')
          }
          getRegistersPayments(rental, canEdit, handleModal);
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

  const getDetailPayment = async (payment: number) => {
    try {
      const { data } = await api.get(`/financials/edit_payment/${payment}/`)
      return data
    } catch(error:any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const patchRegisterPayment = async (body: object, payment: number) => {
    try {
      const { data } = await api.patch(`/financials/edit_payment/${payment}/`, body)
      Swal.fire(data.message, '', 'success');
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
    payments,
    detailPayment,
    amountTotal,
    //* Métodos

    getRegistersPayments,
    postRegisterPayment,
    deleteLastRegisteredPayment,
    getDetailPayment,
    patchRegisterPayment
  }
}
