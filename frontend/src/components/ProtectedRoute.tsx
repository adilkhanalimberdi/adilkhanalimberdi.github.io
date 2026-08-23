import {useAuth} from "../providers/AuthProvider.tsx";
import {Navigate, Outlet} from "react-router-dom";

export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate to="/admin/login" replace />
        );
    }

    return <Outlet />;
}