import { coffeApiKevin } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setWarrantys } from "@/store";
import { DeleteForever } from "@mui/icons-material";


const api = coffeApiKevin;
export const useWarrantyStore = () => {

  const { warrantys } = useSelector((state:any) => state.warrantys)
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
      }
      throw new Error('Ocurrió algun error en el backend')
    }
  }

  const getListWarranty = async (rental: number) => {
    try {
      console.log(`OBTENIENDO LA INFORMACIÓN DE LAS GARANTÍAS ${rental}`)
      const { data } = await api.get('/financials/register_warranty/', {
        params: {
          rental: rental
        }
      });
      const warrantys = [...data.map((e: any, index: number) => ({
        voucher: e.voucher,
        income: e.income,
        discount: e.disocunt,
        returned: e.returned,
        balance: e.balance,
        detail: e.detail,
        action: index === data.length - 1 ?
          <DeleteForever
            onClick={() => deleteLastRegisteredWarranty(rental)}
            color="error"
            sx={{ cursor: 'pointer'}}
          /> : ''
      }))];
      console.log(warrantys)
      dispatch(setWarrantys({ warrantys: warrantys }));
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      }
      throw new Error("Ocurrió algun error en el backend")
    }
  }

  const deleteLastRegisteredWarranty = async (rental: number) => {
    alert("me eliminaste")
  }

  return {
    //* Propiedades
    warrantys,
    //* Métodos
    postRegisterWarranty,
    getListWarranty,
  }
}
