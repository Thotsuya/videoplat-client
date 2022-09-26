import {createBrowserRouter} from "react-router-dom";
import BaseLayout from "../Layouts/BaseLayout";
import Home from "../Pages/Home";
import AuthRoute from "../utils/AuthRoutes";
import ProtectedRoute from "../utils/ProtectedRoute";

import Login from "../Pages/Login";
import Register from "../Pages/Register";

import CreateVideo from "../Pages/Videos/Create";
import CreatorsIndex from "../Pages/Creators";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "login", element: <AuthRoute component={Login}/>},
            {path: "register", element: <AuthRoute component={Register}/>},
            {path: "videos/create", element: <ProtectedRoute component={CreateVideo}/>},
            {path: "creators", element: <CreatorsIndex/>},
        ]
    },
])

export default router