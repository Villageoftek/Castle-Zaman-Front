import useOrdersState from "@/state/orders";
import subtractTime from "@/helpers/subtractTime";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import translations from "../translations";
import usePostOrder from "../queres/CreateOrder";
import type{Reservation} from "../queres/CreateOrder";

export type Order = {
  id: number;
  price: number;
  minimum_quantity: number;
  maximum_quantity: number;
  quantity?: number; 
  name?: string;     
  created_at?: string;
};

export type AppState = {
  orders: Order[];
  guests: number;
  date: string;  // ISO date string
  time: string;  // HH:mm
  email: string;
};
export type StoredSession = {
  state: AppState;
  version: number;
};

export default function ReviewPage() {
  const mutation = usePostOrder();
  const t = translations["en"]; // Assuming 'en' is the default language
  const { orders, totalOrders, guests, date, time, email } = useOrdersState(
    (state) => state
  );

  const [orderData, setOrderData] = useState<StoredSession | null>(null);
  useEffect(() => {
    const data = sessionStorage.getItem("orders-storage");
    // console.log("data before parsing:", data);
    if (data) {
      setOrderData(JSON.parse(data));
    }
  }, []);
  // console.log("orderData after parsing:", orderData);
  const handleCheckout = () => {
    if (!orderData) {
      console.error("No orders found in sessionStorage");
      return;
    }
    // 1- prepare the payload like backend requires
    const payload: Reservation = {
      persons: orderData.state.guests || 1,
      email: orderData.state.email,
      arrival_date: orderData.state.date,
      dinner_time: orderData.state.time + ":00", // add "00" to be like --> 02:00:00
      meals: orderData.state.orders.map((order: Order) => ({
        id: order.id,
        quantity: order.quantity ?? order.minimum_quantity ?? 1,
      })),
    };
    // console.log("Payload for checkout:", payload);
    // 2- send the request
    mutation.mutate(payload, {
      onSuccess: (res) => {
        // console.log(" Success:", res);
        // 3- if the response is successful and contains a URL 
        if (res?.status === "success" && res?.data?.url) {
          // sessionStorage.removeItem("orders-storage"); // make sessionStorage empty
          window.location.href = res.data.url; // redirect to the success page
        }
      },
      onError: (err) => {
        console.error("Error:", err);
      },
    });
  };

  const CartCard = ({
    text,
    value,
  }: {
    text: string;
    value: string | number;
  }) => (
    <p className="text-md flex items-center justify-between gap-8 py-2 w-full">
      <span className="uppercase truncate">{text}:</span>
      <span className="font-semibold">{value}</span>
    </p>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">{t.revieworder}</h1>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="text-lg min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="py-2">
              <th className="text-left">ID</th>
              <th className="text-left">Dish Name</th>
              <th className="text-left">Price</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Total</th>
            </tr>
          </thead>
          <tbody className="*:py-4 divide-y divide-gray-200 dark:divide-gray-700 *:odd:bg-gray-100 dark:*:odd:bg-gray-800 *:even:bg-gray-300 dark:*:even:bg-gray-700">
            {orders.map((order, i) => (
              <tr key={order.id}>
                <td>{i + 1}</td>
                <td className="uppercase">{order.name}</td>
                <td>${order.price.toFixed(2)}</td>
                <td>{order.quantity}</td>
                <td>${(order.price * order.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex flex-col items-start my-8 *:px-4 ml-auto w-fit divide-y divide-gray-200 dark:divide-gray-700 *:odd:bg-gray-100 dark:*:odd:bg-gray-800 *:even:bg-gray-300 dark:*:even:bg-gray-700">
        <CartCard text="Total Orders" value={"$" + totalOrders().toFixed(2)} />
        <CartCard text="Guests Count" value={guests} />
        <CartCard text="Arrival Date" value={date} />
        <CartCard text="Arrival Time" value={subtractTime(time, 2)} />
        <CartCard text="Dinner Time" value={time} />
        <CartCard text="Your E-mail" value={email} />
      </div>
      {/* Buttons */}
      <div className="flex items-center justify-between gap-8 my-12 px-12">
        <Link
          to="/terms"
          className="py-1.5 px-4 rounded-md text-lg font-medium bg-blue-700 hover:bg-blue-800 text-slate-100 transition-all"
        >
          Go Back
        </Link>
        <button
          onClick={handleCheckout}
          disabled={mutation.isPending}
          className="py-1.5 px-4 rounded-md text-lg font-medium bg-blue-700 hover:bg-blue-800 text-slate-100 transition-all ml-auto"
        >
          {mutation.isPending ? "Processing..." : "Checkout Now"}
        </button>
      </div>
    </div>
  );
}
