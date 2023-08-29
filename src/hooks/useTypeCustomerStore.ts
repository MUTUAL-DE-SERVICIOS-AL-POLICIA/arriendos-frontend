import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { refreshTypesCustomers, setTypesCustomers } from '@/store';
import Swal from 'sweetalert2';

export const useTypeCustomerStore = () => {
    const { typesCustomers, flag } = useSelector((state: any) => state.typesCustomers);
    const dispatch = useDispatch();

    const getTypesCustomers = async ({ page, limit }: { page: number, limit: number }) => {
        try {
            console.log('OBTENIENDO TODOS LOS TIPOS DE CLIENTES')
            const { data } = await coffeApiKevin.get(`/customers/type/?page=${page}&limit=${limit}`)
            console.log(data)
            dispatch(setTypesCustomers({ typesCustomers: data.customer_type }));
            return data.total
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const createTypeCustomer = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO TIPO DE CLIENTE');
            const { data } = await coffeApiKevin.post(`/customers/type/`, body);
            console.log(data)
            dispatch(refreshTypesCustomers());
            Swal.fire('Tipo de cliente creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const editTypeCustomer = async (id: number, body: object) => {
        try {
            console.log('EDITANDO TIPO DE CLIENTE');
            const { data } = await coffeApiKevin.patch(`/customers/type/${id}`, body);
            console.log(data)
            dispatch(refreshTypesCustomers());
            Swal.fire('Tipo de cliente editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    return {
        //* Propiedades
        typesCustomers,
        flag,
        //* Métodos
        getTypesCustomers,
        createTypeCustomer,
        editTypeCustomer,
    }
}