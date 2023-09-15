import { coffeApiKevin, coffeApiLeandro } from "@/services";
import { refreshRate, setRates } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export const useRateStore = () => {
    const { rates, flag } = useSelector((state: any) => state.rates);
    const dispatch = useDispatch();

    const getRates = async ({ page, limit }: { page: number, limit: number }) => {
        try {
            console.log('OBTENIENDO TODAS LAS TARIFAS')
            const { data } = await coffeApiKevin.get(`/product/rates/?page=${page}&limit=${limit}`);
            console.log(data)
            dispatch(setRates({ rates: data.rates }));
            return data.total;
        } catch (error: any) {
            throw Swal.fire('Oops ocurrio algo', 'error.response.data.detail', 'error');
        }
    }

    const postCreateRate = async (body: object) => {
        try {
            console.log('CREANDO UNA NUEVA TARIFA');
            console.log(body)
            const { data } = await coffeApiKevin.post(`/product/rates/`, body);
            console.log(data)
            dispatch(refreshRate());
            Swal.fire('Tarifa creado correctamente', '', 'success');
        } catch (error: any) {
            throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
        }
    }

    const patchEditRate = async (id: number, body: object) => {
        try {
            console.log('EDITANDO UNA TARIFA');
            console.log(body)
            const { data } = await coffeApiKevin.patch(`/product/rates/${id}`, body);
            console.log(data)
            dispatch(refreshRate());
            Swal.fire('Tarifa editado correctamente', '', 'success');
        } catch (error: any) {
            throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
        }
    }


    return {
        //* Propiedades
        rates,
        flag,
        //* Métodos
        getRates,
        postCreateRate,
        patchEditRate
    }
}
