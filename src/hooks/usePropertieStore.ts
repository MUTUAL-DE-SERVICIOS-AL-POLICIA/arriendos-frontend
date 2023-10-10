import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { addPropertie, updatePropertie, setProperties } from '@/store';
import Swal from 'sweetalert2';

const api = coffeApiKevin;

export const usePropertieStore = () => {
    const { properties } = useSelector((state: any) => state.properties);
    const dispatch = useDispatch();

    const getPropertiesRooms = async () => {
        console.log('OBTENIENDO TODOS LOS INMUEBLES Y AMBIENTES')
        const { data } = await api.get('/rooms/properties/roomslist/');
        console.log(data.properties);
        dispatch(setProperties({ properties: data.properties }))
    }

    const postCreatePropertie = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO INMUEBLE');
            console.log(body)
            const { data } = await api.post(`/rooms/properties/`, body);
            console.log(data)
            dispatch(addPropertie({ propertie: data }));
            Swal.fire('Inmueble creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const patchUpdatePropertie = async (id: number, body: object) => {
        try {
            console.log('EDITANDO UN NUEVO INMUEBLE');
            console.log(body)
            const { data } = await api.patch(`/rooms/properties/${id}`, body);
            console.log(data)
            dispatch(updatePropertie({ propertie: data }));
            Swal.fire('Inmueble editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    return {
        //* Propiedades
        properties,
        //* Métodos
        getPropertiesRooms,
        postCreatePropertie,
        patchUpdatePropertie,
    }
}