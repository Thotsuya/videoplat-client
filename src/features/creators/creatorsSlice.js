import { createSlice } from "@reduxjs/toolkit";
import { fetchCreators,fetchCreator } from "./creatorsActions";

export const creatorsSlice = createSlice({
    name: "creators",
    initialState: {
        creators: [],
        creator: {},
    },
    reducers: {
        setCreators: (state, { payload }) => {
            state.creators = payload;
        }
    },
    extraReducers:{
        [fetchCreators.fulfilled]: (state, { payload }) => {
            state.creators = payload;
        },
        [fetchCreator.fulfilled]: (state, { payload }) => {
            state.creator = payload;
        }
    }
});

export const { setCreators } = creatorsSlice.actions;
export default creatorsSlice.reducer;