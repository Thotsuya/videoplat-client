import {createBrowserRouter} from "react-router-dom";
import BaseLayout from "../Layouts/BaseLayout";
import Home from "../Pages/Home";
import AuthRoute from "../utils/AuthRoutes";

import Login from "../Pages/Login";
import Register from "../Pages/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "login", element: <AuthRoute component={Login}/>},
            {path: "register", element: <AuthRoute component={Register}/>},
        ]
    },
])

export default router