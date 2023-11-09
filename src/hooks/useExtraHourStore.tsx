import { coffeApiKevin } from "@/services";
import { setExtraHours } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import printJS from 'print-js';
import { DeleteForever } from "@mui/icons-material";

const api = coffeApiKevin;


export const useExtraHourStore = () => {
  const { extraHours = [] } = useSelector((state: any) => state.extraHours);
  const dispatch = useDispatch();

  const getRegisterExtraHours = async (rental: number) => {
    try {
      console.log(`OBTENIENDO LA INFORMACIÓN DE LAS HORAS EXTRAS PAGADAS ${rental}`)
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
          <DeleteForever
            onClick={() => deleteLastRegisteredExtraHour(data[index].selected_product, rental)}
            color="error"
            sx={{ cursor: 'pointer' }}
          /> : ''
      }))];
      console.log(extraHours)
      dispatch(setExtraHours({ extraHours: extraHours }));
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error("Ocurrió algun error en el backend")
    }
  }
  const getExtraHour = async (selectedProduct: number) => {
    try {
      console.log(`OBTENIENDO EL MONTO A PAGAR ṔOR LA HORA EXTRA`);
      const { data } = await api.get('/product/get_price_additional_hour/', {
        params: {
          selected_product: selectedProduct
        }
      });
      console.log(data)
      return data.price;

    } catch (error: any) {
      if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error('Ocurrió algun error en el backend')
    }
  }

  const postRegisterExtraHour = async (rental: number, body: any) => {
    try {
      console.log(`REGISTRANDO UNA HORA EXTRA`);
      console.log(body);
      const { data } = await api.post('/leases/register_additional_hour_applied/', body, {
        responseType: 'arraybuffer'
      });
      const blob = new Blob([data], {
        type: "application/pdf"
      })
      const pdfURL = window.URL.createObjectURL(blob)
      printJS(pdfURL)
      getRegisterExtraHours(rental)
      return true
    } catch (error: any) {
      if(error.response.data instanceof ArrayBuffer) {
        const errorMessage = new TextDecoder('utf-8').decode(error.response.data)
        const message = JSON.parse(errorMessage).error
        Swal.fire('Error', message, 'error')
      } else if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }
  const deleteLastRegisteredExtraHour = async (selectedProduct: number, rental: number) => {
    Swal.fire({
      title: '¿Está seguro de esta acción?',
      text: `Esta acción no es reversible`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(selectedProduct, rental)
          // return true
          const res = await api.delete(`/leases/register_additional_hour_applied/${selectedProduct}/`)
          if (res.status == 200) {
            Swal.fire('Registro eliminado', res.data.message, 'success')
            getRegisterExtraHours(rental);
          }
        } catch (error: any) {
          if (error.response && error.response.status == 400) {
            const message = error.response.data.error
            Swal.fire('Error', message, 'error')
          }
          throw new Error('Ocurrió algun error en el backend')
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