import { create } from "zustand";

type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem("applicataionTheme") as Theme) || "system",
  setTheme: (theme: Theme) => {
    localStorage.setItem("applicataionTheme", theme);
    set({ theme });
  },
}));

export default useThemeStore;
