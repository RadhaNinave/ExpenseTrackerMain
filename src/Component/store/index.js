import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import expenseSlice from "./Expense";
import themeSlice from "./themeSlice";

const store = configureStore({
    reducer : {
        auth:authSlice,
        expense:expenseSlice,
        theme:themeSlice
    }
})


export default store;