import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setRequirements, refreshRequirement } from '@/store';
import Swal from 'sweetalert2';
import { RequirementModel } from '@/models';

const api = coffeApi;

export const useRequirementStore = () => {
  const { requirements, flag } = useSelector((state: any) => state.requirements);
  const dispatch = useDispatch();

  const getRequirements = async ({ page, limit }: { page: number, limit: number }) => {
    try {
      const { data } = await api.get(`/requirements/?page=${page}&limit=${limit}`);
      dispatch(setRequirements({ requirements: data.requirements }));
      return data.total
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const postCreateRequirement = async (body: object) => {
    try {
      await api.post(`/requirements/`, body);
      dispatch(refreshRequirement());
      Swal.fire('Requisito creado correctamente', '', 'success');
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const patchEditRequirement = async (id: number, body: object) => {
    try {
      await api.patch(`/requirements/${id}`, body);
      dispatch(refreshRequirement());
      Swal.fire('Requisito editado correctamente', '', 'success');
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error')
      } else if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else throw new Error('Ocurrió algun error en el backend')
    }
  }

  const deleteRemoveRequirement = async (requirement: RequirementModel) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el requisito: ${requirement.requirement_name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/requirements/${requirement.id}`)
          dispatch(refreshRequirement());
          Swal.fire(
            `¡Listo!`,
            `${requirement.requirement_name} fue eliminado`,
            'success'
          )
        } catch (error: any) {
          if (error.response && error.response.status == 400) {
            const message = error.response.data.error
            Swal.fire('Error', message, 'error')
          } else if (error.response && error.response.status == 403) {
            const message = error.response.data.detail
            Swal.fire('Acceso denegado', message, 'warning')
          } else throw new Error('Ocurrió algun error en el backend')
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