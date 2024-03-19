import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { user } = useSelector((state) => state.user);

    if (user && user.isAdmin) {
        return <Outlet />;
    } else if (user) {
        return <Navigate to="/home" replace={true} />;
    } else {
        return <Navigate to="/" replace={true} />;
    }
}

export default AdminRoute;
