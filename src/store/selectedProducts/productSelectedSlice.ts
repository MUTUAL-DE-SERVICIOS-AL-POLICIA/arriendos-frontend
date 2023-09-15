import { createSlice } from '@reduxjs/toolkit';

export const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState: {
        selectedProducts: <Array<any>>[]
    },
    reducers: {
        productsSelectedAdd: (state,action) => {
            state.selectedProducts = [...state.selectedProducts,action.payload.selectedProduct];
        },
        productsSelectedRemove: (state,action) => {
            state.selectedProducts = [...state.selectedProducts.filter((e:any)=>e.start.getTime() != action.payload.selectedProduct.start.getTime())];
        },
    }
});


// Action creators are generated for each case reducer function
export const { productsSelectedAdd,productsSelectedRemove } = selectedProductSlice.actions;