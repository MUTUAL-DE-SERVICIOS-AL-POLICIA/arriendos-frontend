import { useDispatch, useSelector } from 'react-redux';
import { coffeApiLeandro } from '@/services';
import { addHourRanges, setHourRanges, updateHourRanges } from '@/store';

export const useHourRangeStore = () => {
    const { hourRanges } = useSelector((state: any) => state.hourRanges);
    const dispatch = useDispatch();

    const getHourRanges = async () => {
        console.log('OBTENIENDO TODOS LOS RANGOS DE HORAS')
        const { data } = await coffeApiLeandro.get('/product/hour-range/');
        console.log(data);
        dispatch(setHourRanges({ hourRanges: data }))
    }

    const postCreateHourRange = async (body: object) => {
        console.log('CREANDO UN NUEVO RANGO DE HORAS');
        const { data } = await coffeApiLeandro.post(`/product/hour-range/`, body)
        console.log(data);
        dispatch(addHourRanges({ hourRange: data }));
    }

    const patchUpdateHourRange = async (id: number, body: object) => {
        console.log('EDITANDO UN RANGO DE HORAS');
        const { data } = await coffeApiLeandro.patch(`/product/hour-range/${id}`, body)
        console.log(data);
        dispatch(updateHourRanges({ hourRange: data }));
    }


    return {
        //* Propiedades
        hourRanges,
        //* hourRanges
        getHourRanges,
        postCreateHourRange,
        patchUpdateHourRange,
    }
}