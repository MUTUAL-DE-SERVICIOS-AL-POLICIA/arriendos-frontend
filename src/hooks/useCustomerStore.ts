import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { setCustomers, refreshCustomer } from '@/store';
import Swal from 'sweetalert2';

export const useCustomerStore = () => {
    const { customers, flag } = useSelector((state: any) => state.customers);
    const dispatch = useDispatch();

    const getCustomers = async ({ page, limit }: { page: number, limit: number }) => {
        console.log('OBTENIENDO TODOS LOS CLIENTES')
        const { data } = await coffeApiKevin.get(`/customers/?page=${page}&limit=${limit}`);
        console.log(data)
        dispatch(setCustomers({ customers: data.customers }));
        return data.total
    }

    const postCreateCustomer = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO CLIENTE');
            console.log(body)
            const { data } = await coffeApiKevin.post(`/customers/`, body);
            console.log(data)
            dispatch(refreshCustomer());
            Swal.fire('Cliente creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const patchEditCustomer = async (id: number, body: object) => {
        try {
            console.log('EDITANDO TIPO DE CLIENTE');
            const { data } = await coffeApiKevin.patch(`/customers/${id}`, body);
            console.log(data)
            dispatch(refreshCustomer());
            Swal.fire('Tipo de cliente editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    return {
        //* Propiedades
        customers,
        flag,
        //* Métodos
        getCustomers,
        postCreateCustomer,
        patchEditCustomer
    }
}