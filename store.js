import { configureStore } from "@reduxjs/toolkit";
import kordinatReducer from "./kordinatReducer";

export const store = configureStore({
    reducer:{
        loc: kordinatReducer
    }
})