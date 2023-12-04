import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setUsers, refreshUsers, setUsersLdap } from '@/store';
import Swal from 'sweetalert2';
import { UserModel } from '@/models';

const api = coffeApi;

export const useUserStore = () => {
  const { usersLDAP, users, flag } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const getUsers = async ({ page, limit }: { page: number, limit: number }) => {
    try {
      const { data } = await api.get(`/users/?page=${page}&limit=${limit}`)
      dispatch(setUsers({ users: data.users }));
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

  const getUsersLdap = async () => {
    try {
      const { data } = await api.get('/login/users_ldap/');
      dispatch(setUsersLdap({ usersLDAP: data.users }));
      return data;
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

  const postCreateUser = async (body: object) => {
    try {
      await api.post(`/users/`, body);
      dispatch(refreshUsers());
      Swal.fire('Usuario creado correctamente', '', 'success');
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

  const toggleActivation = async (user: UserModel) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas ${user.is_active ? 'desactivando' : 'activando'} a ${user.username}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/users/state/${user.id}`)
          dispatch(refreshUsers());
          Swal.fire(
            `${user.is_active ? '¡Desactivado!' : '¡Activado!'}`,
            `${user.username} fue ${user.is_active ? 'desactivado' : 'activado'}`,
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
    usersLDAP,
    users,
    flag,
    //* Métodos
    getUsers,
    getUsersLdap,
    postCreateUser,
    toggleActivation,
  }

}