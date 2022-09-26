import { createSlice } from "@reduxjs/toolkit";
import { fetchVideos } from "./videosActions";

const initialState = {
    videos: [],
}

const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload;
        }
    },
    extraReducers: {
        [fetchVideos.fulfilled]: (state, action) => {
            state.videos = action.payload;
        }
    }
})

export const { setVideos } = videosSlice.actions;
export default videosSlice.reducer;