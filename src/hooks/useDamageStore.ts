
import { coffeApi } from '@/services';
import printJS from 'print-js';
import Swal from 'sweetalert2';

const api = coffeApi;

export const useDamageStore = () => {
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
      if(error.response.data instanceof ArrayBuffer) {
        const errorMessage = new TextDecoder('utf-8').decode(error.response.data)
        const message = JSON.parse(errorMessage).error
        Swal.fire('Error', message, 'error')
      } else if (error.message && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if(error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  return {
    //* Propiedades

    //* Métodos
    postRegisterDiscountWarranty,
  }
}
