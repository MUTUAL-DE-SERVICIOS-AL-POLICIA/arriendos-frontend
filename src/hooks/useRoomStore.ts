// roomSlice
import { useDispatch, useSelector } from 'react-redux';
import { coffeApiLeandro } from '@/services';
import { setRoom, clearRooms } from '@/store';

export const useRoomStore = () => {
    const { rooms } = useSelector((state: any) => state.rooms);
    const dispatch = useDispatch();

    const getRooms = async (propertieId: number) => {
        console.log('OBTENIENDO TODOS LOS AMBIENTES SEGÚN EL ID INMUEBLE')
        dispatch(clearRooms());
        const { data } = await coffeApiLeandro.get(`/rooms/properties/${propertieId}/rooms/`);
        console.log(data)
        dispatch(setRoom({ rooms: data.rooms }))
    }

    return {
        //* Propiedades
        rooms,
        //* Métodos
        getRooms,
    }
}
