import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {products: [], product:{}},
    reducers: {
        getProducts(state, action){
            state.products = action.payload
        },
        getProduct(state, action){
            state.product = action.payload
        }
    }
})

export default productSlice;
export const productActions = productSlice.actions;