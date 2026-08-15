import { type ReactNode, useEffect, useState } from "react";
import ThemeRepository, { type Theme } from "./theme.repository.ts";
import { ThemeContext } from "./theme.context.ts";

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        return ThemeRepository.getTheme() || "system";
    });

    useEffect(() => {
        const root = document.documentElement;

        const applyTheme = (currentTheme: Theme) => {
            const isDark = currentTheme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                : currentTheme === "dark";

            root.classList.toggle("dark", isDark);
            root.style.backgroundColor = isDark ? "#09090b" : "#ffffff";
        };

        applyTheme(theme);
        ThemeRepository.setTheme(theme);

        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

            const handleChange = () => {
                applyTheme("system");
            };

            mediaQuery.addEventListener("change", handleChange);

            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, [theme]);

    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev === "dark") return "light";
            if (prev === "light") return "system";
            return "dark";
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
