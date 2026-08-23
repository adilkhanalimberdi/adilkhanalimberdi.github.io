import {type ReactNode, useContext, useEffect, useState} from "react";
import {api, getAccessToken, setAccessToken as setApiToken, subscribeToToken} from "../services/api.ts";
import { AuthContext } from "../context/auth.context.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setTokenState] = useState<string | null>(getAccessToken());
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = subscribeToToken(setTokenState);
        return unsubscribe;
    }, []);

    useEffect(() => {
        api.post("/auth/refresh")
            .then((res) => setApiToken(res.data.data.accessToken))
            .catch(() => setApiToken(null))
            .finally(() => setIsLoading(false));
    }, []);

    const logout = () => setApiToken(null);

    return (
        <AuthContext.Provider value={{ accessToken, isAuthenticated: !!accessToken, isLoading, setAccessToken: setApiToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}