import useOrdersState from "@/state/orders";
import type { Meal } from "@/types/menuItem";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function MenuItem({ menuItem: item }: { menuItem: Meal }) {
  const addOrIncrement = useOrdersState((s) => s.addOrIncrement);
  const decQty = useOrdersState((s) => s.decrementOrderQuantity);
  const qty = useOrdersState((s) => s.getSingleOrderQuantity(item.id));
  const handleInc = () => {
    // add all meal details
    addOrIncrement(item);
  };
  const handleDec = () => {
    decQty(item.id);
  };
  return (
    <div className="flex itms-center gap-6 p-4 my-2 w-full">
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleInc}
          disabled={item.maximum_quantity !== null && qty >= item.maximum_quantity}
          className="size-8 rounded-full flex-center bg-emerald-700 text-slate-100"
        >
          <FaPlus />
        </button>

        <span className="border border-emerald-900 min-w-full text-center py-1 px-2">
          {qty}
        </span>

        <button
          type="button"
          onClick={handleDec}
          disabled={qty <= 0}
          className="size-8 rounded-full flex-center bg-emerald-700 text-slate-100"
        >
          <FaMinus />
        </button>
      </div>

      <div>
        <h2 className="uppercase text-2xl font-semibold underline">{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: <span className="font-medium">${item.price.toFixed(2)}</span></p>
        {item.minimum_quantity !== null && (
          <p>Minimum orders: <span className="font-medium">{item.minimum_quantity}</span></p>
        )}
        {(item.maximum_quantity !== null && item.maximum_quantity > 0) && (
          <p>Maximum orders: <span className="font-medium">{item.maximum_quantity}</span></p>
        )}
      </div>
    </div>
  );
}
