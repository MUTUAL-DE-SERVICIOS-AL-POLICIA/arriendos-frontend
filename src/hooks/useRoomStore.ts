import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { setRoomSelect, setClearSelect, updateRoom, addRoom } from '@/store';
import Swal from 'sweetalert2';

const api = coffeApiKevin;

export const useRoomStore = () => {
    const { rooms, RoomSelection } = useSelector((state: any) => state.rooms);
    const dispatch = useDispatch();

    const postRoom = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO AMBIENTE');
            const { data } = await api.post(`/rooms/`, body);
            console.log(data)
            dispatch(addRoom({ room: data }));
            Swal.fire('Ambiente creado correctamente', '', 'success');
        } catch (error: any) {
            throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
        }
    }

    const patchEditRoom = async (id: number, body: object) => {
        try {
            console.log('EDITANDO AMBIENTE');
            const { data } = await api.patch(`/rooms/${id}/`, body);
            console.log(data)
            dispatch(updateRoom({ room: data }));
            Swal.fire('Requisito editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
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
