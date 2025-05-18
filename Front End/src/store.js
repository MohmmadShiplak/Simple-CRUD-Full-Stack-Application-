import { configureStore } from "@reduxjs/toolkit";
import { productAPISliceReducer } from "./features/productAPISlice";

export const store =configureStore({
reducer:{
    product:productAPISliceReducer.reducer,
   
}
})


