import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { setRequirements, refreshCustomer } from '@/store';
import Swal from 'sweetalert2';

export const useRequirementStore = () => {
    const { requirements, flag } = useSelector((state: any) => state.requirements);
    const dispatch = useDispatch();

    const getRequirements = async ({ page, limit }: { page: number, limit: number }) => {
        console.log('OBTENIENDO TODOS LOS REQUISITOS')
        const { data } = await coffeApiKevin.get(`/plans/requirements/?page=${page}&limit=${limit}`);
        console.log(data)
        dispatch(setRequirements({ requirements: data.requirements }));
        return data.total
    }

    const postCreateRequirement = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO REQUISITO');
            console.log(body)
            const { data } = await coffeApiKevin.post(`/plans/requirements/`, body);
            console.log(data)
            dispatch(refreshCustomer());
            Swal.fire('Cliente creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const patchEditRequirement = async (id: number, body: object) => {
        try {
            console.log('EDITANDO REQUISITO');
            const { data } = await coffeApiKevin.patch(`/customers/${id}`, body);
            console.log(data)
            dispatch(refreshCustomer());
            Swal.fire('Tipo de cliente editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    return {
        //* Propiedades
        requirements,
        flag,
        //* Métodos
        getRequirements,
        postCreateRequirement,
        patchEditRequirement
    }
}