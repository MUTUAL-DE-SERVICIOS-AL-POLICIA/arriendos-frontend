import { productDeselected, productSelected, productsSelectedAdd, productsSelectedRemove, removeSelectedProducts } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export const useSelectedProductStore = () => {
    const { selectedProducts, selectedProduct } = useSelector((state: any) => state.selectedProducts);
    const dispatch = useDispatch();

    const setSelectedProduct = (body: object) => {
        // console.log('SELECCIONANDO UN PRODUCTO');
        dispatch(productsSelectedAdd({ selectedProduct: body }));
    }

    const unsetSElectedProduct = (body: object) => {
        console.log('DESELECCIONANDO UN PRODUCTO');
        dispatch(productsSelectedRemove({ selectedProduct: body }));
    }

    const addSelected = (body: object) => {
			dispatch(productSelected({ selected: body }))
    }

    const removeSelected = ( ) => {
        dispatch(productDeselected())
    }
    const removeProducts = () => {
        dispatch(removeSelectedProducts())
    }

    return {
        //* Propiedades
        selectedProducts,
        //* Métodos
        setSelectedProduct,
        unsetSElectedProduct,
        addSelected,
        removeSelected,
        selectedProduct,
        removeProducts
    }
}
