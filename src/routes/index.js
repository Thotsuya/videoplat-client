import {createBrowserRouter} from "react-router-dom";
import BaseLayout from "../Layouts/BaseLayout";
import Home from "../Pages/Home";
import AuthRoute from "../utils/AuthRoutes";
import ProtectedRoute from "../utils/ProtectedRoute";

import Login from "../Pages/Login";
import Register from "../Pages/Register";

import CreateVideo from "../Pages/Videos/Create";
import EditVideo from '../Pages/Videos/Edit';

import CreatorsIndex from "../Pages/Creators";
import CreatorProfile from "../Pages/Creators/profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "login", element: <AuthRoute component={Login}/>},
            {path: "register", element: <AuthRoute component={Register}/>},
            {path: "videos/create", element: <ProtectedRoute component={CreateVideo}/>},
            {path: "videos/:id/edit", element: <ProtectedRoute component={EditVideo}/>},
            {path: "creators", element: <ProtectedRoute component={CreatorsIndex} />},
            {path: "profile", element: <ProtectedRoute component={CreatorProfile}/>},
        ]
    },
])

export default router