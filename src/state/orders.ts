
// state/orders.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Meal } from "@/types/menuItem";

type OrderMeal = Meal & { quantity: number };

interface OrdersState {
  orders: OrderMeal[];
  guests: number;
  date: string;
  time: string;
  email: string;

  // actions
  addOrIncrement: (meal: Meal) => void;
  decrementOrderQuantity: (mealId: number) => void;

  getSingleOrder: (mealId: number) => OrderMeal | undefined;
  getSingleOrderQuantity: (mealId: number) => number;

  totalOrders: () => number;
  clearOrders: () => void;

  setGuests: (guests: number) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setEmail: (email: string) => void;
}

const useOrdersState = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      guests: 0,
      date: "",
      time: "",
      email: "",

      addOrIncrement: (meal) =>
        set((state) => {
          const existing = state.orders.find((o) => o.id === meal.id);
          if (existing) {
            // ✅ لو الماكس = 0 يبقى Infinity، غير كده يستعمل القيمة العادية
            const max =
              meal.maximum_quantity === 0
                ? Infinity
                : meal.maximum_quantity ?? Infinity;

            const newQty = Math.min(existing.quantity + 1, max);

            return {
              orders: state.orders.map((o) =>
                o.id === meal.id ? { ...o, quantity: newQty } : o
              ),
            };
          }

          // أول مرة يضيف → يبدأ بالـ minimum_quantity أو 1
          const startQty = meal.minimum_quantity ?? 1;
          return { orders: [...state.orders, { ...meal, quantity: startQty }] };
        }),

      decrementOrderQuantity: (mealId) =>
        set((state) => {
          const existing = state.orders.find((o) => o.id === mealId);
          if (!existing) return {};

          const min = existing.minimum_quantity ?? 1;
          const newQty = existing.quantity - 1;

          if (newQty < min || newQty <= 0) {
            // remove it if less than minimum or reached zero
            return { orders: state.orders.filter((o) => o.id !== mealId) };
          }

          return {
            orders: state.orders.map((o) =>
              o.id === mealId ? { ...o, quantity: newQty } : o
            ),
          };
        }),

      getSingleOrder: (mealId) =>
        get().orders.find((o) => o.id === mealId),

      getSingleOrderQuantity: (mealId) => {
        const found = get().orders.find((o) => o.id === mealId);
        return found ? found.quantity : 0;
      },

      totalOrders: () =>
        get().orders.reduce((sum, o) => sum + o.price * o.quantity, 0),

      clearOrders: () => set({ orders: [], guests: 0, date: "", time: "", email: "" }),

      setGuests: (guests) => set({ guests: guests < 0 ? 0 : guests }),
      setDate: (date) => set({ date }),
      setTime: (time) => set({ time }),
      setEmail: (email) => set({ email }),
    }),
    {
      name: "orders-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useOrdersState;
























// // state/orders.ts
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import type { Meal } from "@/types/menuItem";

// type OrderMeal = Meal & { quantity: number };

// interface OrdersState {
//   orders: OrderMeal[];
//   guests: number;
//   date: string;
//   time: string;
//   email: string;

//   // actions
//   addOrIncrement: (meal: Meal) => void;
//   decrementOrderQuantity: (mealId: number) => void;

//   getSingleOrder: (mealId: number) => OrderMeal | undefined;
//   getSingleOrderQuantity: (mealId: number) => number;

//   totalOrders: () => number;
//   clearOrders: () => void;

//   setGuests: (guests: number) => void;
//   setDate: (date: string) => void;
//   setTime: (time: string) => void;
//   setEmail: (email: string) => void;
// }

// const useOrdersState = create<OrdersState>()(
//   persist(
//     (set, get) => ({
//       orders: [],
//       guests: 0,
//       date: "",
//       time: "",
//       email: "",

//       addOrIncrement: (meal) =>
//         set((state) => {
//           const existing = state.orders.find((o) => o.id === meal.id);
//           if (existing) {
//             const max = meal.maximum_quantity ?? Infinity;
//             const newQty = Math.min(existing.quantity + 1, max);
//             return {
//               orders: state.orders.map((o) =>
//                 o.id === meal.id ? { ...o, quantity: newQty } : o
//               ),
//             };
//           }
//           const startQty = meal.minimum_quantity ?? 1;
//           return { orders: [...state.orders, { ...meal, quantity: startQty }] };
//         }),

//       decrementOrderQuantity: (mealId) =>
//         set((state) => {
//           const existing = state.orders.find((o) => o.id === mealId);
//           if (!existing) return {};
//           const min = existing.minimum_quantity ?? 1;
//           const newQty = existing.quantity - 1;
//           if (newQty < min || newQty <= 0) {
//             // remove it if less than minimum or reached zero
//             return { orders: state.orders.filter((o) => o.id !== mealId) };
//           }
//           return {
//             orders: state.orders.map((o) =>
//               o.id === mealId ? { ...o, quantity: newQty } : o
//             ),
//           };
//         }),

//       getSingleOrder: (mealId) =>
//         get().orders.find((o) => o.id === mealId),

//       getSingleOrderQuantity: (mealId) => {
//         const found = get().orders.find((o) => o.id === mealId);
//         return found ? found.quantity : 0;
//       },

//       totalOrders: () =>
//         get().orders.reduce((sum, o) => sum + o.price * o.quantity, 0),

//       clearOrders: () => set({ orders: [], guests: 0, date: "", time: "", email: "" }),

//       setGuests: (guests) => set({ guests: guests < 0 ? 0 : guests }),
//       setDate: (date) => set({ date }),
//       setTime: (time) => set({ time }),
//       setEmail: (email) => set({ email }),
//     }),
//     {
//       name: "orders-storage",
//       storage: createJSONStorage(() => sessionStorage),
//     }
//   )
// );

// export default useOrdersState;





