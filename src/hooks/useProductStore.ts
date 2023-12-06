import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { refreshProduct, setProducts, setLeakedProducts, setClearLakedProducts } from '@/store';
import Swal from 'sweetalert2';
import { ProductModel } from '@/models';
import days from '@/models/days.json';

const api = coffeApi;

export const useProductStore = () => {
  const { products, flag, leakedProducts } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  const getProducts = async ({ page, limit, isFilter }: { page: number, limit: number, isFilter: boolean }) => {
    try {
      if (!isFilter) {
        const { data } = await api.get(`/product/?page=${page}&limit=${limit}`);
        dispatch(setProducts({ products: data.products }));
        return data.total
      } else {
        const { data } = await api.get(`/product/?page=${page}&limit=${limit}`);
        dispatch(setProducts({ products: data.products }));
        return data.total
      }
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

  const postCreateProduct = async (body: object) => {
    try {
      await api.post(`/product/`, body);
      dispatch(refreshProduct());
      Swal.fire('Producto creado correctamente', '', 'success');
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

  const patchUpdateProduct = async (id: number, body: object) => {
    try {
      await api.patch(`/product/${id}`, body);
      dispatch(refreshProduct());
      Swal.fire('Producto editado correctamente', '', 'success');
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

  const deleteRemoveProduct = async (product: ProductModel) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el producto: ${product.room.name} - ${product.rate.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/product/${product.id}`)
          dispatch(refreshProduct());
          Swal.fire(
            `¡Listo!`,
            `${product.room.name} - ${product.rate.name} fue eliminado`,
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

  const postLeakedProduct = async (day: Date, body: object) => {
    try {
      const { data } = await api.post('/product/posible_product/', body)
      dispatch(setLeakedProducts({ products: [...data.products.filter((e: ProductModel) => e.day.includes(days.days[day.getDay()]))] }));
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

  const clearLakedProduct = async () => {
    dispatch(setClearLakedProducts())
  }


  return {
    //* Propiedades
    products,
    flag,
    leakedProducts,
    //* Métodos productos
    getProducts,
    postCreateProduct,
    patchUpdateProduct,
    deleteRemoveProduct,
    //* Métodos filtro de productos
    postLeakedProduct,
    clearLakedProduct,
  }
}