import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { authenticate, register } from "./userActions";

const initialState = {
    name: "",
    email: "",
    token: null,
    isLogged: false,
};

if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.token = localStorage.getItem("token");
        initialState.name = decodedToken.name;
        initialState.email = decodedToken.email;
        initialState.isLogged = true;
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.name = payload.name;
            state.email = payload.email;
            state.token = payload.token;
            state.isLogged = true;
            localStorage.setItem("token", payload.token);
        },
        logout: (state) => {
            state.name = "";
            state.email = "";
            state.token = "";
            state.isLogged = false;
            localStorage.removeItem("token");
        }
    },
    extraReducers: {
        [authenticate.fulfilled]: (state, { payload }) => {
            state.name = payload.name;
            state.email = payload.email;
            state.token = payload.token;
            state.isLogged = true;
            localStorage.setItem("token", payload.token);
        },
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;