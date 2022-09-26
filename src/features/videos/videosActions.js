import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../../config/axios";

export const fetchVideos = createAsyncThunk(
    "videos/fetchVideos",
    async(payload, {rejectWithValue}) => {
        try {
            const {data} = await client.get("/videos");
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);