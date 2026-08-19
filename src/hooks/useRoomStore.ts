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

  const patchEditRoom = async (id: number, body: object) => {
    try {
      const { data } = await api.patch(`/rooms/${id}/`, body);
      dispatch(updateRoom({ room: data }));
      Swal.fire('Ambiente modificado correctamente', '', 'success');
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

  const postSubRoom = async (body: object) => {
    try {
      await api.post('/rooms/sub_rooms/', body);
      Swal.fire('Sub ambiente creado correctamente', '', 'success');
      return true;
    } catch (error: any) {
      if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else {
        const message = error.response?.data?.error || 'Error al crear sub ambiente'
        Swal.fire('Error', message, 'error');
      }
      return false;
    }
  }

  const patchEditSubRoom = async (id: number, body: object) => {
    try {
      await api.patch(`/rooms/sub_rooms/${id}`, body);
      Swal.fire('Sub ambiente modificado correctamente', '', 'success');
      return true;
    } catch (error: any) {
      if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else {
        const message = error.response?.data?.error || 'Error al modificar sub ambiente'
        Swal.fire('Error', message, 'error');
      }
      return false;
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
    postSubRoom,
    patchEditSubRoom,
    //* Métodos de selector de ambientes
    selectRoom,
    deselectRoom,
  }
}
