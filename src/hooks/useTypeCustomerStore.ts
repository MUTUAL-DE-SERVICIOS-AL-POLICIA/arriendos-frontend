import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { refreshTypesCustomers, setTypesCustomers } from '@/store';
import Swal from 'sweetalert2';
import { TypeCustomerModel } from '@/models';

const api = coffeApi;

export const useTypeCustomerStore = () => {
  const { typesCustomers, flag } = useSelector((state: any) => state.typesCustomers);
  const dispatch = useDispatch();

  const getTypesCustomers = async ({ page, limit }: { page: number, limit: number }) => {
    try {
      console.log('OBTENIENDO TODOS LOS TIPOS DE CLIENTES')
      const { data } = await api.get(`/customers/type/?page=${page}&limit=${limit}`)
      console.log(data)
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
      console.log('CREANDO UN NUEVO TIPO DE CLIENTE');
      const { data } = await api.post(`/customers/type/`, body);
      console.log(data)
      dispatch(refreshTypesCustomers());
      Swal.fire('Tipo de cliente creado correctamente', '', 'success');
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

  const patchEditTypeCustomer = async (id: number, body: object) => {
    try {
      console.log('EDITANDO TIPO DE CLIENTE');
      const { data } = await api.patch(`/customers/type/${id}`, body);
      console.log(data)
      dispatch(refreshTypesCustomers());
      Swal.fire('Tipo de cliente editado correctamente', '', 'success');
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

  const deleteRemoveTypeCustomer = async (typeCustomer: TypeCustomerModel) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas eliminando el tipo de cliente: ${typeCustomer.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('ELIMINANDO UN TIPO DE CLIENTE')
          const { data } = await api.delete(`/customers/type/${typeCustomer.id}`)
          console.log(data)
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
    })
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