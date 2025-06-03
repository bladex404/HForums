import { create } from "zustand";
type Theme = "light" | "dark";
export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const getInitalTheme = (): Theme => {
  const t = localStorage.getItem("ui-theme");
  return t === "dark" ? "dark" : "light";
};
export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitalTheme(),
  setTheme: (theme: Theme) => {
    localStorage.setItem("ui-theme", theme);
    set({ theme });
  },
}));
