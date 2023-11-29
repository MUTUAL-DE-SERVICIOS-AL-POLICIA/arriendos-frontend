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
    console.log('OBTENIENDO TODOS LOS CLIENTES')
    const params: Record<string, number | string> = {
      page: page,
      limit: limit,
    };
    if (search !== '') params.search = search;
    const { data } = await api.get(`/customers/`, {
      params: params,
    });
    console.log(data)
    dispatch(setCustomers({ customers: data.customers }));
    return data.total
  }

  const postCreateCustomer = async (body: object) => {
    try {
      console.log('CREANDO UN NUEVO CLIENTE');
      console.log(body)
      const { data } = await api.post(`/customers/`, body);
      console.log(data)
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
      console.log('EDITANDO UN CLIENTE');
      const { data } = await api.patch(`/customers/${id}`, body);
      console.log(data)
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
      text: `Estas eliminando a ${customer.institution_name ?? customer.contacts[0].name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('ELIMINANDO A UN CLIENTE')
          const { data } = await api.delete(`/customers/${customer.id}`)
          console.log(data)
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
      console.log('BUSCANDO AFILIADO');
      const { data } = await api.get(`/customers/identify_police/${ciAffiliate}/`);
      console.log(data)
      return data.data[0]
      // dispatch(refreshCustomer());
      // Swal.fire('Cliente editado correctamente', '', 'success');
    } catch (error: any) {
      return;
      // if (error.response && error.response.status == 400) {
      //   const message = error.response.data.error
      //   Swal.fire('Error', message, 'error')
      // } else if (error.response && error.response.status == 403) {
      //   const message = error.response.data.detail
      //   Swal.fire('Acceso denegado', message, 'warning')
      // } else throw new Error('Ocurrió algun error en el backend')
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