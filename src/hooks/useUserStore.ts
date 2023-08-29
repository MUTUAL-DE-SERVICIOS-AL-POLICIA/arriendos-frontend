import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { setUsers, refreshUsers } from '@/store';
import Swal from 'sweetalert2';

export const useUserStore = () => {
    const { users, flag } = useSelector((state: any) => state.users);
    const dispatch = useDispatch();

    const getUsers = async ({ page, limit }: { page: number, limit: number }) => {
        try {
            console.log('OBTENIENDO TODOS LOS USUARIOS')
            const { data } = await coffeApiKevin.get(`/users/?page=${page}&limit=${limit}`)
            console.log(data)
            dispatch(setUsers({ users: data.users }));
            return data.total
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const searchUserLdap = async (body: object) => {
        try {
            console.log('BUSCANDO AL USUARIO EN LDAP');
            const { data } = await coffeApiKevin.post('users/get_user/', body);
            console.log(data)
            return data;
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }
    const createUser = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO USUARIO');
            const { data } = await coffeApiKevin.post(`/users/`, body);
            console.log(data)
            dispatch(refreshUsers());
            Swal.fire('Usuario creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const editUser = async (id: number, body: object) => {
        try {
            console.log('EDITANDO UN USUARIO');
            const { data } = await coffeApiKevin.patch(`/users/${id}`, body);
            console.log(data)
            dispatch(refreshUsers());
            Swal.fire('Usuario editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    return {
        //* Propiedades
        users,
        flag,
        //* Métodos
        getUsers,
        searchUserLdap,
        createUser,
        editUser
    }

}