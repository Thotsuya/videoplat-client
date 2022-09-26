import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    return (
        <>
            <Topbar>
                <ToastContainer/>
                <Outlet/>
            </Topbar>
        </>
    );
}