export type Theme = "light" | "dark" | "system";

const ThemeRepository = {
    getTheme(): Theme {
        return localStorage.getItem("theme") as Theme;
    },

    setTheme(theme: Theme): void {
        localStorage.setItem("theme", theme);
    }
}

export default ThemeRepository;