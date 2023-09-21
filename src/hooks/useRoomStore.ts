// roomSlice
import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { setRoom, clearRooms, setRoomSelect, setClearSelect } from '@/store';

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
    return {
        //* Propiedades
        rooms,
        RoomSelection,
        //* Métodos
        getRooms,

        //* Métodos de selector de ambientes
        selectRoom,
        deselectRoom,
    }
}
