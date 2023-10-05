import { createSlice } from '@reduxjs/toolkit';

export const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState: {
        selectedProducts: <Array<any>>[],
        selectedProduct: {}
    },
    reducers: {
        productsSelectedAdd: (state,action) => {
            state.selectedProducts = [...state.selectedProducts,action.payload.selectedProduct];
        },
        productsSelectedRemove: (state,action) => {
            state.selectedProducts = [...state.selectedProducts.filter((e:any)=>e.start.getTime() != action.payload.selectedProduct.start.getTime())];
        },
        removeSelectedProducts: ( state ) => {
            state.selectedProducts = []
        },
        productSelected: ( state, action ) => {
            state.selectedProduct = action.payload.selected;
        },
        productDeselected: ( state ) => {
            state.selectedProduct = {};
        }
    }
});

export
    const {
        productsSelectedAdd,
        productsSelectedRemove,
        productSelected,
        productDeselected,
        removeSelectedProducts,
    } = selectedProductSlice.actions;