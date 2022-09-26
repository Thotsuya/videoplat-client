import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ component: Component, ...rest }) {
    const {token} = useSelector((state) => state.user);

    return !token ? <Navigate to="/login" /> : <Component {...rest} />;
}