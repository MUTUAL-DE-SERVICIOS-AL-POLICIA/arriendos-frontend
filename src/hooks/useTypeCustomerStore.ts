import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { refreshTypesCustomers, setTypesCustomers } from '@/store';
import Swal from 'sweetalert2';
import { TypeCustomerModel } from '@/models';
import { DialogComponent } from '@/components';

const api = coffeApi;

export const useTypeCustomerStore = () => {
  const { typesCustomers, flag } = useSelector((state: any) => state.typesCustomers);
  const dispatch = useDispatch();

  const getTypesCustomers = async (page: number, limit: number) => {
    try {
      let filter: any = { params: { page: page } };
      if (limit != -1) filter.params.limit = limit;
      const { data } = await api.get(`/customers/type/`, filter)
      dispatch(setTypesCustomers({ typesCustomers: data.customer_type }));
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
  const postCreateTypeCustomer = async (body: object) => {
    try {
      await api.post(`/customers/type/`, body);
      dispatch(refreshTypesCustomers());
      Swal.fire('Tipo de cliente creado correctamente', '', 'success');
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

  const patchEditTypeCustomer = async (id: number, body: object) => {
    try {
      await api.patch(`/customers/type/${id}`, body);
      dispatch(refreshTypesCustomers());
      Swal.fire('Tipo de cliente editado correctamente', '', 'success');
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

  const deleteRemoveTypeCustomer = async (typeCustomer: TypeCustomerModel) => {

    const { dialogDelete } = DialogComponent();
    const state = await dialogDelete(`Se eliminará el tipo de cliente: ${typeCustomer.name}`)
    if (state) {
      try {
        await api.delete(`/customers/type/${typeCustomer.id}`)
        dispatch(refreshTypesCustomers());
        Swal.fire(
          `¡Listo!`,
          `${typeCustomer.name} fue eliminado`,
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
  }

  return {
    //* Propiedades
    typesCustomers,
    flag,
    //* Métodos
    getTypesCustomers,
    postCreateTypeCustomer,
    patchEditTypeCustomer,
    deleteRemoveTypeCustomer,
  }
}