import { useDispatch, useSelector } from 'react-redux';
import { coffeApiLeandro } from '@/services';
import { setProperties } from '@/store';

export const usePropertieStore = () => {
    const { properties } = useSelector((state: any) => state.properties);
    const dispatch = useDispatch();

    const getProperties = async () => {
        console.log('OBTENIENDO TODOS LOS INMUEBLES')
        const { data } = await coffeApiLeandro.get(`/rooms/properties/`);
        console.log(data)
        dispatch(setProperties({ properties: data }))
    }


    return {
        //* Propiedades
        properties,
        //* Métodos
        getProperties,
    }
}