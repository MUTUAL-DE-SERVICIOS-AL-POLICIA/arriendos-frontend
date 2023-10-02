import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        flag: false
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;
        },
        refreshProduct: (state, /* action */) => {
            state.flag = !state.flag
        },
    }
});


// Action creators are generated for each case reducer function
export const { setProducts, refreshProduct } = productSlice.actions;