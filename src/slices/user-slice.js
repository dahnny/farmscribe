import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        email: "",
        isAdmin: false,
        isAuthenticated: false
    }, reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.email = action.payload.email;
        },

        setAuthentication(state, action){
            state.isAuthenticated = action.payload;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice;