import { coffeApiKevin } from "@/services";
import Swal from "sweetalert2";


const api = coffeApiKevin;
export const useWarrantyStore = () => {
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
  return {
    //* Propiedades

    //* Métodos
    postRegisterWarranty,
  }
}
