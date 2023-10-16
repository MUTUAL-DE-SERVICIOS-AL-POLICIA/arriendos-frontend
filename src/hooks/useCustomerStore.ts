import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { setCustomers, refreshCustomer } from '@/store';
import Swal from 'sweetalert2';
import { CustomerModel } from '@/models';

// const api = coffeApiKevin;
const api = coffeApiKevin;

export const useCustomerStore = () => {
    const { customers, flag } = useSelector((state: any) => state.customers);
    const dispatch = useDispatch();

    const getCustomers = async ({ page, limit }: { page: number, limit: number }) => {
        console.log('OBTENIENDO TODOS LOS CLIENTES')
        const { data } = await api.get(`/customers/?page=${page}&limit=${limit}`);
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
            Swal.fire('Oops ocurrio algo', error.response, 'error');
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
            Swal.fire('Oops ocurrio algo', error.response, 'error');
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
                    throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
                }
            }
        })
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
    }
}