import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin, coffeApiLeandro } from '@/services';
import { refreshProduct, setProducts } from '@/store';
import Swal from 'sweetalert2';

export const useProductStore = () => {
    const { products, flag } = useSelector((state: any) => state.products);
    const dispatch = useDispatch();

    const getProducts = async ({ page, limit }: { page: number, limit: number }) => {
        console.log('OBTENIENDO TODOS LOS PRODUCTOS')
        const { data } = await coffeApiKevin.get(`/product/?page=${page}&limit=${limit}`);
        console.log(data)
        dispatch(setProducts({ products: data.products }));
        return data.total
    }

    const postCreateProduct = async (body: object) => {
        try {
            console.log('CREANDO UN NUEVO PRODUCTO');
            console.log(body)
            const { data } = await coffeApiKevin.post(`/product/`, body);
            console.log(data)
            dispatch(refreshProduct());
            Swal.fire('Producto creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }

    const patchUpdateProduct = async (id: number, body: object) => {
        try {
            console.log('EDITANDO PRODUCTO');
            const { data } = await coffeApiKevin.patch(`/product/${id}`, body);
            console.log(data)
            dispatch(refreshProduct());
            Swal.fire('Producto editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response, 'error');
        }
    }



    return {
        //* Propiedades
        products,
        flag,
        //* Métodos
        getProducts,
        postCreateProduct,
        patchUpdateProduct
    }
}