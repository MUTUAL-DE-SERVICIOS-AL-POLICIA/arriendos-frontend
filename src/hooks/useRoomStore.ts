import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setRoomSelect, setClearSelect, updateRoom, addRoom } from '@/store';
import Swal from 'sweetalert2';

const api = coffeApi;

export const useRoomStore = () => {
  const { rooms, RoomSelection } = useSelector((state: any) => state.rooms);
  const dispatch = useDispatch();

  const postRoom = async (body: object) => {
    try {
      const { data } = await api.post(`/rooms/`, body);
      dispatch(addRoom({ room: data }));
      Swal.fire('Ambiente creado correctamente', '', 'success');
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

  const patchEditRoom = async (id: number, body: object) => {
    try {
      const { data } = await api.patch(`/rooms/${id}/`, body);
      dispatch(updateRoom({ room: data }));
      Swal.fire('Requisito editado correctamente', '', 'success');
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

  /*MÉTODOS DE SELECTOR DE AMBIENTES */
  const selectRoom = async (data: any) => {
    dispatch(setRoomSelect({ room: data }));
  }
  const deselectRoom = async () => {
    dispatch(setClearSelect());
  }
  return {
    //* Propiedades
    rooms,
    RoomSelection,
    //* Métodos
    postRoom,
    patchEditRoom,
    //* Métodos de selector de ambientes
    selectRoom,
    deselectRoom,
  }
}
