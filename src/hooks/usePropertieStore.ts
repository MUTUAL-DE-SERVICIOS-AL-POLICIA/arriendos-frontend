import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { addPropertie, updatePropertie, setProperties } from '@/store';
import Swal from 'sweetalert2';

const api = coffeApi;

export const usePropertieStore = () => {
  const { properties } = useSelector((state: any) => state.properties);
  const dispatch = useDispatch();

  const getPropertiesRooms = async () => {
    try {
      const { data } = await api.get('/rooms/properties/roomslist/');
      dispatch(setProperties({ properties: data.properties }))
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

  const postCreatePropertie = async (body: object) => {
    try {
      const { data } = await api.post(`/rooms/properties/`, body);
      dispatch(addPropertie({ propertie: data }));
      Swal.fire('Inmueble creado correctamente', '', 'success');
      return true;
    } catch (error: any) {
      if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error');
      }
      return false;
    }
  }

  const patchUpdatePropertie = async (id: number, body: object) => {
    try {
      const { data } = await api.patch(`/rooms/properties/${id}/`, body);
      dispatch(updatePropertie({ propertie: data }));
      Swal.fire('Inmueble editado correctamente', '', 'success');
      return true;
    } catch (error: any) {
      if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else {
        const message = error.response.data.error
        Swal.fire('Error', message, 'error');
      }
      return false;
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