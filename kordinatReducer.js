import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userloc: null,
    cleanerloc: null,
}

export const kordinatSlice = createSlice({
    name: "loc",
    initialState,
    reducer:{
        setUserloc:(state,action) =>{
            state.userloc = action.payload

        },
        setCleanerloc:(state,action) =>{
            state.cleanerloc = action.payload
        },
    }
})

export const {setUserloc, setCleanerloc} = kordinatSlice.actions;

export const selectUserloc = (state) => state.loc.userloc;
export const selectCleanerloc = (state) => state.loc.cleanerloc;

export default kordinatSlice.reducer