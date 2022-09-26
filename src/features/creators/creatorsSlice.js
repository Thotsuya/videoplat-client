import { createSlice } from "@reduxjs/toolkit";
import { fetchCreators } from "./creatorsActions";

export const creatorsSlice = createSlice({
    name: "creators",
    initialState: {
        creators: [],
    },
    reducers: {
        setCreators: (state, { payload }) => {
            state.creators = payload;
        }
    },
    extraReducers:{
        [fetchCreators.fulfilled]: (state, { payload }) => {
            state.creators = payload;
        }
    }
});

export const { setCreators } = creatorsSlice.actions;
export default creatorsSlice.reducer;