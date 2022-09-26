import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ component: Component, ...rest }) {
    const user = useSelector((state) => state.user);

    return user.token ? <Navigate to="/" /> : <Component {...rest} />;
}
