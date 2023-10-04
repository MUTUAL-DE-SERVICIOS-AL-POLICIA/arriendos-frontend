import { useDispatch, useSelector } from 'react-redux';
import { coffeApiLeandro } from '@/services';
import { setRequirements, refreshRequirement } from '@/store';
import Swal from 'sweetalert2';
import { RequirementModel } from '@/models';

export const useRequirementStore = () => {
    const { requirements, flag } = useSelector((state: any) => state.requirements);
    const dispatch = useDispatch();

    const getRequirements = async ({ page, limit }: { page: number, limit: number }) => {
        console.log('OBTENIENDO TODOS LOS REQUISITOS')
        const { data } = await coffeApiLeandro.get(`/plans/requirements/?page=${page}&limit=${limit}`);
        console.log(data)
        dispatch(setRequirements({ requirements: data.requirements }));
        return data.total
    }

    const postCreateRequirement = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO REQUISITO');
            console.log(body)
            const { data } = await coffeApiLeandro.post(`/plans/requirements/`, body);
            console.log(data)
            dispatch(refreshRequirement());
            Swal.fire('Requisito creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const patchEditRequirement = async (id: number, body: object) => {
        try {
            console.log('EDITANDO REQUISITO');
            const { data } = await coffeApiLeandro.patch(`/plans/requirements/${id}`, body);
            console.log(data)
            dispatch(refreshRequirement());
            Swal.fire('Requisito editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const deleteRemoveRequirement = async (requirement: RequirementModel) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: `Estas eliminando el requisito: ${requirement.requirement_name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, estoy seguro!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log('ELIMINANDO UN REQUISITO')
                    const { data } = await coffeApiLeandro.delete(`/plans/requirements/${requirement.id}`)
                    console.log(data)
                    dispatch(refreshRequirement());
                    Swal.fire(
                        `¡Listo!`,
                        `${requirement.requirement_name} fue eliminado`,
                        'success'
                    )
                } catch (error: any) {
                    throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
                }
            }
        })
    }

    return {
        //* Propiedades
        requirements,
        flag,
        //* Métodos
        getRequirements,
        postCreateRequirement,
        patchEditRequirement,
        deleteRemoveRequirement,
    }
}