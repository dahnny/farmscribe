import { createSlice } from "@reduxjs/toolkit";

const contractSlice = createSlice({
    name: 'contract',
    initialState: {
        contract: null,
        address: null,
        balance: null
    },
    reducers:{
      setContract (state, action){
        state.contract = action.payload.contract;
        state.address = action.payload.address;
        state.balance = action.payload.balance;
      }  
    }
});

export const contractActions = contractSlice.actions;
export default contractSlice