import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { addHourRanges, removeHourRange, setHourRanges, updateHourRanges } from '@/store';
import Swal from 'sweetalert2';
import { HourRangeModel } from '@/models';
import { DialogComponent } from '@/components';

const api = coffeApi;

export const useHourRangeStore = () => {
  const { hourRanges } = useSelector((state: any) => state.hourRanges);
  const dispatch = useDispatch();

  const getHourRanges = async () => {
    try {
      const { data } = await api.get('/product/hour-range/');
      dispatch(setHourRanges({ hourRanges: data }))
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

  const postCreateHourRange = async (body: object) => {
    try {
      const { data } = await api.post(`/product/hour-range/`, body)
      dispatch(addHourRanges({ hourRange: data }));
      Swal.fire('Rango de hora creado correctamente', '', 'success');
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

  const patchUpdateHourRange = async (id: number, body: object) => {
    try {
      const { data } = await api.patch(`/product/hour-range/${id}`, body)
      dispatch(updateHourRanges({ hourRange: data }));
      Swal.fire('Rango de hora editado correctamente', '', 'success');
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

  const deleteRemoveHourRange = async (hourRange: HourRangeModel) => {
    const { dialogDelete } = DialogComponent();
    const state = await dialogDelete(`Esta acción no es reversible`)
    if (state) {
      try {
        await api.delete(`/product/hour-range/${hourRange.id}`)
        dispatch(removeHourRange({ hourRange }));
        Swal.fire(
          `¡Listo!`,
          `Se elimino el registro`,
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
    hourRanges,
    //* hourRanges
    getHourRanges,
    postCreateHourRange,
    patchUpdateHourRange,
    deleteRemoveHourRange,
  }
}