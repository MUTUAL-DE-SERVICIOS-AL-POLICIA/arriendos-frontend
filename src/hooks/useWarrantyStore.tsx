import { coffeApi } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setWarrantys } from "@/store";
import { DeleteForever } from "@mui/icons-material";


const api = coffeApi;
export const useWarrantyStore = () => {

  const { warrantys } = useSelector((state: any) => state.warrantys)
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
      } else if(error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const getListWarranty = async (rental: number) => {
    try {
      const { data } = await api.get('/financials/register_warranty/', {
        params: {
          rental: rental
        }
      });
      const warrantys = [...data.map((e: any, index: number) => ({
        id: e.correlative,
        type: e.type,
        voucher: e.voucher,
        income: e.income,
        discount: e.discount,
        returned: e.returned,
        balance: e.balance,
        detail: e.detail,
        action: index === data.length - 1 ?
          <DeleteForever
            onClick={() => deleteLastRegisteredWarranty(rental)}
            color="error"
            sx={{ cursor: 'pointer' }}
          /> : ''
      }))];
      dispatch(setWarrantys({ warrantys: warrantys }));
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if(error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const deleteLastRegisteredWarranty = async (rental: number) => {
    Swal.fire({
      title: '¿Está seguro de esta acción?',
      text: `Esta acción no es reversible`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await api.delete(`/financials/register_warranty/${rental}/`)
          if (res.status == 200) {
            Swal.fire('Registro eliminado', res.data.message, 'success')
            getListWarranty(rental);
          }
        } catch (error: any) {
          if (error.response && error.response.status == 400) {
            const message = error.response.data.error
            Swal.fire('Error', message, 'error')
          } else if(error.response && error.response.status == 403) {
            const message = error.response.data.detail
            Swal.fire('Acceso denegado', message, 'warning')
          } else throw new Error('Ocurrió algun error en el backend')
        }
      }
    })
  }

  return {
    //* Propiedades
    warrantys,
    //* Métodos
    postRegisterWarranty,
    getListWarranty,
  }
}
