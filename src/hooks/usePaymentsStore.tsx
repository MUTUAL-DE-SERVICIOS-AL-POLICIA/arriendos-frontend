import { coffeApi } from "@/services";
import { setPayments } from "@/store";
import { DeleteForever } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const api = coffeApi;

export const usePaymentsStore = () => {
  const { payments = [], amountTotal } = useSelector((state: any) => state.payments);
  const dispatch = useDispatch();
  const getRegistersPayments = async (rental: number) => {
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
        action: index === data.payments.length - 1 ?
          <DeleteForever
            onClick={() => deleteLastRegisteredPayment(rental)}
            color="error"
            sx={{ cursor: 'pointer' }}
          /> : ''
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

  const deleteLastRegisteredPayment = async (rental: number) => {
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
          getRegistersPayments(rental);
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
    payments,
    amountTotal,
    //* Métodos

    getRegistersPayments,
    postRegisterPayment,
    deleteLastRegisteredPayment
  }
}
