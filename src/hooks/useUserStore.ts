import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { setUsers, refreshUsers, setUsersLdap } from '@/store';
import Swal from 'sweetalert2';

export const useUserStore = () => {
    const { usersLDAP, users, flag } = useSelector((state: any) => state.users);
    const dispatch = useDispatch();

    const getUsers = async ({ page, limit }: { page: number, limit: number }) => {
        try {
            console.log('OBTENIENDO TODOS LOS USUARIOS')
            const { data } = await coffeApiKevin.get(`/users/?page=${page}&limit=${limit}`)
            console.log(data)
            dispatch(setUsers({ users: data.users }));
            return data.total
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
        }
    }

    const getUsersLdap = async () => {
        try {
            console.log('OBTENIENDO TODOS LOS USUARIOS EN LDAP');
            const { data } = await coffeApiKevin.get('/login/users_ldap/');
            console.log(data)
            dispatch(setUsersLdap({ usersLDAP: data.users }));
            return data;
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
        }
    }

    const postCreateUser = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO USUARIO');
            const { data } = await coffeApiKevin.post(`/users/`, body);
            console.log(data)
            dispatch(refreshUsers());
            Swal.fire('Usuario creado correctamente', '', 'success');
        } catch (error: any) {
            throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
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
            Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
        }
    }

    return {
        //* Propiedades
        usersLDAP,
        users,
        flag,
        //* Métodos
        getUsers,
        getUsersLdap,
        postCreateUser,
        editUser
    }

}