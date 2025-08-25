import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IThemeState {
  theme: boolean; // true for dark mode, false for light mode
  // setTheme: (theme: boolean) => void;
  toggleTheme: () => void;
};

const useThemeState = create<IThemeState>()(
  persist(
    (set) => ({
      theme: false, // default to light mode
      // setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: !state.theme })),
    }),
    {
      name: "theme-storage", // unique name for the storage
    }
  )
);

export default useThemeState;
