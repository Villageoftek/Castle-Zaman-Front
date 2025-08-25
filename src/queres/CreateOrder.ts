import { apiBase } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

 interface Order {
  id: number;
  quantity: number;
}
  export interface Reservation {
  persons: number;
  email: string;
  arrival_date: string; // ISO date string, e.g., "YYYY-MM-DD"
  dinner_time: string; // Time string, e.g., "HH:MM:SS"
  meals: Order[];
}
export default function usePostOrder() {
  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: async (formValues: Reservation) => {
      const res = await apiBase.post("orders", formValues);
      // console.log("create-order-response", res.data);
      return res.data;
    },
  });
};
