import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { addHourRanges, removeHourRange, setHourRanges, updateHourRanges } from '@/store';
import Swal from 'sweetalert2';
import { HourRangeModel } from '@/models';

const api = coffeApiKevin;

export const useHourRangeStore = () => {
  const { hourRanges } = useSelector((state: any) => state.hourRanges);
  const dispatch = useDispatch();

  const getHourRanges = async () => {
    try {
      console.log('OBTENIENDO TODOS LOS RANGOS DE HORAS')
      const { data } = await api.get('/product/hour-range/');
      console.log(data);
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
      console.log('CREANDO UN NUEVO RANGO DE HORAS');
      const { data } = await api.post(`/product/hour-range/`, body)
      console.log(data);
      dispatch(addHourRanges({ hourRange: data }));
      Swal.fire('Rango de hora creado correctamente', '', 'success');
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

  const patchUpdateHourRange = async (id: number, body: object) => {
    try {
      console.log('EDITANDO UN RANGO DE HORAS');
      const { data } = await api.patch(`/product/hour-range/${id}`, body)
      console.log(data);
      dispatch(updateHourRanges({ hourRange: data }));
      Swal.fire('Rango de hora editado correctamente', '', 'success');
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

  const deleteRemoveHourRange = async (hourRange: HourRangeModel) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas eliminando el Rango de hora: ${hourRange.time} hora`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('ELIMINANDO UN RANGO DE HORA')
          const { data } = await api.delete(`/product/hour-range/${hourRange.id}`)
          console.log(data)
          dispatch(removeHourRange({ hourRange }));
          Swal.fire(
            `¡Listo!`,
            `${hourRange.time} hora fue eliminado`,
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
    })
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