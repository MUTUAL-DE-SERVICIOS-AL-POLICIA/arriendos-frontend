import { useDispatch, useSelector } from 'react-redux';
import { coffeApiKevin } from '@/services';
import { refreshProduct, setProducts, setLeakedProducts, setClearLakedProducts } from '@/store';
import Swal from 'sweetalert2';
import { ProductModel } from '@/models';
import days from '@/models/days.json';

const api = coffeApiKevin;

export const useProductStore = () => {
  const { products, flag, leakedProducts } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  const getProducts = async ({ page, limit, isFilter }: { page: number, limit: number, isFilter: boolean }) => {
    try {
      if (!isFilter) {
        console.log('OBTENIENDO TODOS LOS PRODUCTOS')
        const { data } = await api.get(`/product/?page=${page}&limit=${limit}`);
        console.log(data)
        dispatch(setProducts({ products: data.products }));
        return data.total
      } else {
        console.log('OBTENIENDO PRODUCTOS FILTRADOS')
        const { data } = await api.get(`/product/?page=${page}&limit=${limit}`);
        console.log(data)
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
      console.log('CREANDO UN NUEVO PRODUCTO');
      console.log(body)
      const { data } = await api.post(`/product/`, body);
      console.log(data)
      dispatch(refreshProduct());
      Swal.fire('Producto creado correctamente', '', 'success');
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

  const patchUpdateProduct = async (id: number, body: object) => {
    try {
      console.log('EDITANDO PRODUCTO');
      const { data } = await api.patch(`/product/${id}`, body);
      console.log(data)
      dispatch(refreshProduct());
      Swal.fire('Producto editado correctamente', '', 'success');
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

  const deleteRemoveProduct = async (product: ProductModel) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas eliminando al producto: ${product.room.name} - ${product.rate.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('ELIMINANDO UN PRODUCTO')
          const { data } = await api.delete(`/product/${product.id}`)
          console.log(data)
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
      console.log('OBTENIENDO PRODUCTOS FILTRADOS')
      console.log(body)
      const { data } = await api.post('/product/posible_product/', body)
      console.log(data)
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