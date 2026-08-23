import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "./providers/ThemeProvider.tsx";
import {AuthProvider} from "./providers/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);