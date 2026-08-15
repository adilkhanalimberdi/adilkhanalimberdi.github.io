import {Route, Routes} from "react-router-dom";
import PortfolioPage from "../../pages/portfolio/PortfolioPage.tsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<PortfolioPage />} />
        </Routes>
    );
}

export default AppRouter;