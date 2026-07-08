import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setCustomers, refreshCustomer } from '@/store';
import Swal from 'sweetalert2';
import { CustomerModel } from '@/models';
import { toast } from 'react-toastify';
import { DialogComponent } from '@/components';

const api = coffeApi;

export const useCustomerStore = () => {
  const { customers, flag } = useSelector((state: any) => state.customers);
  const dispatch = useDispatch();

  const getCustomers = async (page: number, limit: number, search: string, filters?: { customer_type_id?: string, contact_search?: string, search_nit?: string, search_name?: string }) => {
    let filter: any = { params: { page: page } };
    filter.params.limit = limit;
    if (search !== '') filter.params.search = search;
    if (filters?.search_nit) filter.params.search_nit = filters.search_nit;
    if (filters?.search_name) filter.params.search_name = filters.search_name;
    if (filters?.customer_type_id) filter.params.customer_type_id = filters.customer_type_id;
    if (filters?.contact_search) filter.params.contact_search = filters.contact_search;
    const { data } = await api.get(`/customers/`, filter);
    dispatch(setCustomers({ customers: data.customers }));
    return data.total
  }

  const getCustomerFilterOptions = async () => {
    try {
      const { data } = await api.get(`/customers/filter_options/`);
      return {
        customer_types: data.customer_types || [],
      };
    } catch (error: any) {
      return { customer_types: [] };
    }
  }

  const postCreateCustomer = async (body: object) => {
    try {
      await api.post(`/customers/`, body);
      dispatch(refreshCustomer());
      Swal.fire('Cliente creado correctamente', '', 'success');
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

  const patchUpdateCustomer = async (id: number, body: object) => {
    try {
      await api.patch(`/customers/${id}`, body);
      dispatch(refreshCustomer());
      Swal.fire('Cliente editado correctamente', '', 'success');
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

  const deleteRemoveCustomer = async (customer: CustomerModel) => {
    const { dialogDelete } = DialogComponent();
    const state = await dialogDelete(`Se eliminará el cliente ${customer.institution_name ?? customer.contacts[0].name}`)
    if (state) {
      try {
        await api.delete(`/customers/${customer.id}`)
        dispatch(refreshCustomer());
        Swal.fire(
          `¡Listo!`,
          `${customer.institution_name ?? customer.contacts[0].name} fue eliminado`,
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

  const searchAffiliate = async (ciAffiliate: String) => {

    try {
      if (ciAffiliate != '') {
        const { data } = await api.get(`/customers/identify_police/${ciAffiliate}/`);
        if (data.length > 0) {
          toast.success(`Afiliado encontrado`);
          return data[0]
        } else {
          toast.error(`${data.message}`);
        }
      }
      return;
    } catch (error: any) {
      toast("No se encontró al afiliado");
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
    getCustomerFilterOptions,
    postCreateCustomer,
    patchUpdateCustomer,
    deleteRemoveCustomer,
    searchAffiliate
  }
}