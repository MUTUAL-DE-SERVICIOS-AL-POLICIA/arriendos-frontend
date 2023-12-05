import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setCustomers, refreshCustomer } from '@/store';
import Swal from 'sweetalert2';
import { CustomerModel } from '@/models';

const api = coffeApi;

export const useCustomerStore = () => {
  const { customers, flag } = useSelector((state: any) => state.customers);
  const dispatch = useDispatch();

  const getCustomers = async (page: number, limit: number, search: string) => {
    const params: Record<string, number | string> = {
      page: page,
      limit: limit,
    };
    if (search !== '') params.search = search;
    const { data } = await api.get(`/customers/`, {
      params: params,
    });
    dispatch(setCustomers({ customers: data.customers }));
    return data.total
  }

  const postCreateCustomer = async (body: object) => {
    try {
      await api.post(`/customers/`, body);
      dispatch(refreshCustomer());
      Swal.fire('Cliente creado correctamente', '', 'success');
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

  const patchUpdateCustomer = async (id: number, body: object) => {
    try {
      await api.patch(`/customers/${id}`, body);
      dispatch(refreshCustomer());
      Swal.fire('Cliente editado correctamente', '', 'success');
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

  const deleteRemoveCustomer = async (customer: CustomerModel) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará a ${customer.institution_name ?? customer.contacts[0].name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/customers/${customer.id}`)
          dispatch(refreshCustomer());
          Swal.fire(
            `¡Listo!`,
            `${customer.institution_name ?? customer.contacts[0].name}fue eliminado`,
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

  const searchAffiliate = async (ciAffiliate: String) => {
    try {
      const { data } = await api.get(`/customers/identify_police/${ciAffiliate}/`);
      return data[0]
    } catch (error: any) {
      return;
    }
  }

  return {
    //* Propiedades
    customers,
    flag,
    //* Métodos
    //customers
    getCustomers,
    postCreateCustomer,
    patchUpdateCustomer,
    deleteRemoveCustomer,
    searchAffiliate
  }
}