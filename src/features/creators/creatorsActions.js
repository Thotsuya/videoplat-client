import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../../config/axios";

export const fetchCreators = createAsyncThunk(
    "creators/fetchCreators",
    async(payload, {rejectWithValue}) => {
        try {
            const {data} = await client.get("/creators");
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const fetchCreator = createAsyncThunk(
    "creators/fetchCreator",
    async(id, {rejectWithValue}) => {
        try {
            const {data} = await client.get(`/creators/${id}`);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)