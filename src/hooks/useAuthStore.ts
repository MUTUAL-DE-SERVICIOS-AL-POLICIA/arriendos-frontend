import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApiKevin, coffeApiLeandro } from "@/services";
import { onLogin, onLogout } from "@/store";

export const useAuthStore = () => {
    const { status, user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ username, password }: { username: string, password: string }) => {
        try {
            const { data } = await coffeApiLeandro.post('/login/auth/', { username, password });
            console.log(data)
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);
            const user = `${data.first_name} ${data.last_name}`;
            localStorage.setItem('user', user);
            dispatch(onLogin(user));
        } catch (error: any) {
            dispatch(onLogout());
            if (error.response && error.response.status == 400) {
                const message = error.response.data.error
                Swal.fire('Error', message, 'error')
            } else throw new Error('Ocurrió algun error en el backend')
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = localStorage.getItem('user')
            console.log(user)
            return dispatch(onLogin(user));
        } else {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    return {
        //* Propiedades
        status,
        user,

        //* Métodos
        startLogin,
        checkAuthToken,
        startLogout,
    }

}
