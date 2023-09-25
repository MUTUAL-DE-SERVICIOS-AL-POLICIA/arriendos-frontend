// roomSlice
import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { setRoom, clearRooms, setRoomSelect, setClearSelect, updateRoom, addRoom } from '@/store';
import Swal from 'sweetalert2';

export const useRoomStore = () => {
    const { rooms, RoomSelection } = useSelector((state: any) => state.rooms);
    const dispatch = useDispatch();

    const getRooms = async (propertieId: number) => {
        console.log('OBTENIENDO TODOS LOS AMBIENTES SEGÚN EL ID INMUEBLE')
        dispatch(clearRooms());
        const { data } = await coffeApiKevin.get(`/rooms/properties/${propertieId}/rooms/`);
        console.log(data)
        dispatch(setRoom({ rooms: data.rooms }))
    }
    /*MÉTODOS DE SELECTOR DE AMBIENTES */
    const selectRoom = async (data: any) => {
        dispatch(setRoomSelect({ room: data }));
    }
    const deselectRoom = async () => {
        dispatch(setClearSelect());
    }

    const postRoom = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO ROOM');
            const { data } = await coffeApiKevin.post(`/rooms/`, body);
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
            const { data } = await coffeApiKevin.patch(`/rooms/${id}/`, body);
            console.log(data)
            dispatch(updateRoom({room: data}));
            Swal.fire('Requisito editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }
    return {
        //* Propiedades
        rooms,
        RoomSelection,
        //* Métodos
        getRooms,
        patchEditRoom,
        //* Métodos de selector de ambientes
        selectRoom,
        deselectRoom,
        postRoom
    }
}
