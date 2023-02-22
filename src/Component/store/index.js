import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";

const store = configureStore({
    reducer : {
        auth:authSlice
    }
})
export const authAction= authSlice.actions
export default store;