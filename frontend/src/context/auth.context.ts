import {createContext} from "react";

export interface AuthContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAccessToken: (accessToken: string | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);