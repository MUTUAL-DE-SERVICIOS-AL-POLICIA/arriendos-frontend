import { RateModel } from "@/models";
import { coffeApiKevin } from "@/services";
import { refreshRate, setRates } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const api = coffeApiKevin;

export const useRateStore = () => {
    const { rates, flag } = useSelector((state: any) => state.rates);
    const dispatch = useDispatch();

    const getRates = async ({ page, limit }: { page: number, limit: number }) => {
        try {
            console.log('OBTENIENDO TODAS LAS TARIFAS')
            const { data } = await api.get(`/requirements/allrates/?page=${page}&limit=${limit}`);
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
            const { data } = await api.post(`/requirements/rates/`, body);
            console.log(data)
            dispatch(refreshRate());
            Swal.fire('Tarifa creado correctamente', '', 'success');
        } catch (error: any) {
            throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
        }
    }

    const patchUpdateRate = async (id: number, body: object) => {
        try {
            console.log('EDITANDO UNA TARIFA CON SU ASIGNACIÓN');
            console.log(body)
            const { data } = await api.patch(`/requirements/rates/${id}`, body);
            console.log(data)
            dispatch(refreshRate());
            Swal.fire('Tarifa editado correctamente', '', 'success');
        } catch (error: any) {
            throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
        }
    }

    const deleteRemoveRate = async (rate: RateModel) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: `Estas eliminando a ${rate.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, estoy seguro!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log('ELIMINANDO UNA TARIFA')
                    const { data } = await api.delete(`/requirements/rates${rate.id}`)
                    console.log(data)
                    dispatch(refreshRate());
                    Swal.fire(
                        `¡Listo!`,
                        `${rate.name}fue eliminado`,
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
        rates,
        flag,
        //* Métodos
        getRates,
        postCreateRate,
        patchUpdateRate,
        deleteRemoveRate,
    }
}
