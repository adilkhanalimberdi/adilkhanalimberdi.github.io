import {Route, Routes} from "react-router-dom";
import PortfolioPage from "../../pages/portfolio/PortfolioPage.tsx";
import AdminPage from "../../pages/portfolio/AdminPage.tsx";
import AdminLoginPage from "../../pages/portfolio/AdminLoginPage.tsx";
import {ProtectedRoute} from "../../components/ProtectedRoute.tsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminPage />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;