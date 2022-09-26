import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

client.defaults.headers.common["Authorization"] = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";

export default client;