import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setUsers, refreshUsers, setUsersLdap } from '@/store';
import Swal from 'sweetalert2';
import { UserModel } from '@/models';
import { DialogComponent } from '@/components';

const api = coffeApi;

export const useUserStore = () => {
  const { usersLDAP, users, flag } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const getUsers = async (page: number, limit: number) => {
    try {
      let filter: any = { params: { page: page } };
      if (limit != -1) filter.params.limit = limit;
      const { data } = await api.get(`/users/`, filter)
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

  const toggleActivation = async (user: UserModel) => {
    const { dialogDelete } = DialogComponent();
    const state = await dialogDelete(
      `Se ${user.is_active ? 'inactivará' : 'activará'} a ${user.username}`,
      `${user.is_active ? 'Inactivar' : 'activar'}`
    )
    if (state) {
      try {
        await api.delete(`/users/state/${user.id}`)
        dispatch(refreshUsers());
        Swal.fire(
          `${user.is_active ? '¡Desactivado!' : '¡Activado!'}`,
          `${user.username} fue ${user.is_active ? 'inactivado' : 'activado'}`,
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