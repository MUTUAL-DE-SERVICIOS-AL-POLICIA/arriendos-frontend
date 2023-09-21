import { setClearAll, setDeselectAll, setDeselectOne, setSelectAll, setSelectOne } from '@/store';
import { useDispatch, useSelector } from 'react-redux';


export const useSelectorStore = () => {
    const { selections = [], selectionsRooms = [] } = useSelector((state: any) => state.selections);
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
    }

}