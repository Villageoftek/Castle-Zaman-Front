import type {Meal} from "@/types/menuItem";
import { create } from "zustand";

interface IMenuState {
  menu: Meal[];
  // addMenuItem: (item: Meal) => void;
  // removeMenuItem: (itemId: string | number) => void;
  // clearMenu: () => void;
  setMenu: (items: Meal[]) => void;
  getSingleMenuItem: (itemId: string | number) => Meal | undefined;
};

const useMenuState = create<IMenuState>()((set, get) => ({
  menu: [], // Initialize with an empty array for menu items
  // addMenuItem: (item) => set((state) => ({ menu: [...state.menu, item] })),
  // removeMenuItem: (itemId) => set((state) => ({
  //   menu: state.menu.filter((item) => item.id !== itemId),
  // })),
  // clearMenu: () => set({ menu: [] }),
  setMenu: (items) => set({ menu: items }),
  getSingleMenuItem: (itemId) => get().menu.find((item) => item.id === itemId) || undefined,
}));

export default useMenuState;
