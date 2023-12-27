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

  const getCustomers = async (page: number, limit: number, search: string) => {
    let filter: any = { params: { page: page } };
    if (limit != -1) filter.params.limit = limit;
    if (search !== '') filter.params.search = search;
    const { data } = await api.get(`/customers/`, filter);
    dispatch(setCustomers({ customers: data.customers }));
    return data.total
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
    postCreateCustomer,
    patchUpdateCustomer,
    deleteRemoveCustomer,
    searchAffiliate
  }
}