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

  const getPriceHistory = async (productId: number) => {
    try {
      const { data } = await api.get(`/product/price_history/`, { params: { product: productId } });
      return data.prices;
    } catch (error: any) {
      if (error.response && error.response.status == 403) {
        const message = error.response.data.detail
        Swal.fire('Acceso denegado', message, 'warning')
      } else {
        Swal.fire('Error', 'No se pudo obtener el historial de precios', 'error');
      }
      return [];
    }
  }

  const getProducts = async (page: number, limit: number, search: string, filters?: { rate_id?: string, property_id?: string, room_id?: string, hour_range_id?: string, day?: string }) => {
    try {
      let filter: any = { params: { page: page } };
      filter.params.limit = limit;
      if (search !== '') filter.params.search = search;
      if (filters?.rate_id) filter.params.rate_id = filters.rate_id;
      if (filters?.property_id) filter.params.property_id = filters.property_id;
      if (filters?.room_id) filter.params.room_id = filters.room_id;
      if (filters?.hour_range_id) filter.params.hour_range_id = filters.hour_range_id;
      if (filters?.day) filter.params.day = filters.day;
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

  const getFilterOptions = async () => {
    try {
      const { data } = await api.get(`/product/product_filter_options/`);
      return {
        rates: data.rates || [],
        properties: data.properties || [],
        rooms: data.rooms || [],
        hour_ranges: data.hour_ranges || [],
        days: data.days || [],
      };
    } catch (error: any) {
      return { rates: [], properties: [], hour_ranges: [], days: [] };
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
    getPriceHistory,
    getFilterOptions,
    //* Métodos filtro de productos
    postLeakedProduct,
    clearLakedProduct,
  }
}