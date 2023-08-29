import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApiLeandro } from "@/services";
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
            dispatch(onLogin(data));
        } catch (error: any) {
            dispatch(onLogout());
            console.log(error.response.data)
            Swal.fire('Oops ocurrio algo', JSON.stringify(error.response.data.detail), 'error');
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            const data = JSON.parse(localStorage.getItem('user')!)
            console.log(data)
            return dispatch(onLogin(data));
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
