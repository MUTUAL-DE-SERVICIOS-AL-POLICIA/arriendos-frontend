import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        leakedProducts: [],
        flag: false,
        leases: []
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;
        },
        refreshProduct: (state, /* action */) => {
            state.flag = !state.flag;
        },
        setLeakedProducts: (state, action) => {
            state.leakedProducts = action.payload.products;
        },
        setClearLakedProducts: (state) => {
            state.leakedProducts = [];
        },
        setLeases: (state, action) => {
            state.leases = action.payload.leases;
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    setProducts,
    refreshProduct,
    setLeakedProducts,
    setClearLakedProducts,
    setLeases,
} = productSlice.actions;