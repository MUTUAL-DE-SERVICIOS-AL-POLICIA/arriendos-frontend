import { setClearAll, setClearRoomAll, setDeselectAll, setDeselectOne, setDeselectRoomOne, setSelectAll, setSelectOne, setSelectRoomAdd } from '@/store';
import { useDispatch, useSelector } from 'react-redux';


export const useSelectorStore = () => {
    const { selections=[],selectionsRooms=[] } = useSelector((state: any) => state.selections);
    const dispatch = useDispatch();

    const selectAll = (data: any) => {
        dispatch(setSelectAll({ selection: data }));
    }
    const selectOne = async (data: any) => {
        dispatch(setSelectOne({ select: data }));
    }
    const deselectAll = async (data: any) => {
        dispatch(setDeselectAll({ selection: data }));
    }
    const deselectOne = async (data: any) => {
        dispatch(setDeselectOne({ select: data }));
    }
    const clearSelect = async () => {
        dispatch(setClearAll());
    }
/*MÉTODOS DE SELECTOR DE AMBIENTES */
    const selectRoomOne = async (data: any) => {
        dispatch(setSelectRoomAdd({ selectRoom: data }));
    }
    const deselectRoomOne = async (data: any) => {
        dispatch(setDeselectRoomOne({ selectRoom: data }));
    }
    const clearRoomsSelect = async () => {
        dispatch(setClearRoomAll());
    }
    return {
        //* Propiedades
        selections,
        selectionsRooms,
        //* Métodos de selector
        selectAll,
        selectOne,
        deselectAll,
        deselectOne,
        clearSelect,
        //* Métodos de selector de ambientes
        selectRoomOne,
        deselectRoomOne,
        clearRoomsSelect,
    }

}