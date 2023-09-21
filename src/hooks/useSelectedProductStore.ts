import { productsSelectedAdd, productsSelectedRemove } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export const useSelectedProductStore = () => {
    const { selectedProducts } = useSelector((state: any) => state.selectedProducts);
    const dispatch = useDispatch();

    const setSelectedProduct = (body: object) => {
        console.log('SELECCIONANDO UN PRODUCTO');
        dispatch(productsSelectedAdd({ selectedProduct: body }));
    }

    const unsetSElectedProduct = (body: object) => {
        console.log('DESELECCIONANDO UN PRODUCTO');
        dispatch(productsSelectedRemove({ selectedProduct: body }));
    }

    return {
        //* Propiedades
        selectedProducts,
        //* Métodos
        setSelectedProduct,
        unsetSElectedProduct,
    }
}
