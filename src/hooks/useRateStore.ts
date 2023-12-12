import { DialogComponent } from "@/components";
import { RateModel } from "@/models";
import { coffeApi } from "@/services";
import { refreshRate, setRates } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const api = coffeApi;

export const useRateStore = () => {
  const { rates, flag } = useSelector((state: any) => state.rates);
  const dispatch = useDispatch();

  const getRates = async (page: number, limit: number) => {
    try {
      let filter: any = { params: { page: page } };
      if (limit != -1) filter.params.limit = limit;
      const { data } = await api.get(`/requirements/allrates/`, filter);
      dispatch(setRates({ rates: data.rates }));
      return data.total;
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

  const postCreateRate = async (body: object) => {
    try {
      await api.post(`/requirements/rates/`, body);
      dispatch(refreshRate());
      Swal.fire('Tarifa creado correctamente', '', 'success');
      return true;
    } catch (error: any) {
      if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error');
      }
      return false;
    }
  }

  const deleteRemoveRate = async (rate: RateModel) => {
    const { dialogDelete } = DialogComponent();
    const state = await dialogDelete(`Se eliminará la tarifa: ${rate.name}`)
    if (state) {
      try {
        await api.delete(`/requirements/rates${rate.id}`)
        dispatch(refreshRate());
        Swal.fire(
          `¡Listo!`,
          `${rate.name}fue eliminado`,
          'success'
        )
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
  }

  return {
    //* Propiedades
    rates,
    flag,
    //* Métodos
    getRates,
    postCreateRate,
    deleteRemoveRate,
  }
}
