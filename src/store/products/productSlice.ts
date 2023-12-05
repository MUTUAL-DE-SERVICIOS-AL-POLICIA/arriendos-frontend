import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: null,
    leakedProducts: [],
    flag: false,
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
    clearProducts: (state,/* action*/) => {
      state.products = null
      state.leakedProducts = []
    }
  }
});


// Action creators are generated for each case reducer function
export const {
  //products
  setProducts,
  refreshProduct,
  //lakedProducts
  setLeakedProducts,
  setClearLakedProducts,
  clearProducts,
} = productSlice.actions;