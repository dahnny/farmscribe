import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {products: null, product:null},
    reducers: {
        getProducts(state, action){
            state.products = action.payload
        },
        getProduct(state, action){
            state.product = action.product
        }
    }
})

export default productSlice;
export const productActions = productSlice.actions;