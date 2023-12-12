import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { refreshProduct, setProducts, setLeakedProducts, setClearLakedProducts } from '@/store';
import Swal from 'sweetalert2';
import { ProductModel } from '@/models';
import days from '@/models/days.json';
import { DialogComponent } from '@/components';

const api = coffeApi;

export const useProductStore = () => {
  const { products, flag, leakedProducts } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  const getProducts = async (page: number, limit: number, search: string) => {
    try {
      let filter: any = { params: { page: page } };
      if (limit != -1) filter.params.limit = limit;
      if (search !== '') filter.params.search = search;
      const { data } = await api.get(`/product/product_filter/`, filter);
      dispatch(setProducts({ products: data.products }));
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
    const { dialogDelete } = DialogComponent();
    const state = await dialogDelete(`Se eliminará el producto: ${product.room.name} - ${product.rate.name}`)
    if (state) {
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