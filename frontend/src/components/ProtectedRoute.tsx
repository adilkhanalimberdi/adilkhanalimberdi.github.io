import {useAuth} from "../providers/AuthProvider.tsx";
import {Navigate, Outlet} from "react-router-dom";
import {Loader2} from "lucide-react";

export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="w-full h-dvh flex items-center justify-center">
                <Loader2 size={18} className="animate-spin" />
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