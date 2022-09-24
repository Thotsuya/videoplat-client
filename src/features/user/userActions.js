import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../config/axios";


export const authenticate = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await client.post("/auth/login", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (data, { rejectWithValue }) => {
        try {
            const response = await client.post("/auth/register", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



