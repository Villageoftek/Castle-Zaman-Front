import useOrdersState from "@/state/orders";
import { CiCreditCard1 } from "react-icons/ci";
import { useNavigate } from "react-router";

export default function Checkout() {
  const total = useOrdersState((state) => state.totalOrders());
  const to = useNavigate();
  const clearOrders = useOrdersState((state) => state.clearOrders);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle payment processing here
    clearOrders(); // Clear orders after successful payment
    // Redirect to success page
    to("/success");
  };

  return (
    <div className="flex-center flex-col gap-4 my-8">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <p className="">All transactions are secure and encrypted.</p>
      <div className="w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md shadow-md divide-y divide-gray-300 dark:divide-gray-700">
        <div className="flex items-center justify-between py-2 px-4">
          <p className="">Credit card</p>
          <CiCreditCard1 />
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Card Number
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="1234 5678 9012 3456"
                pattern="\d{4} \d{4} \d{4} \d{4}"
                maxLength={19} // 16 digits + 3 spaces
                defaultValue="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Expiration Date
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="MM/YY"
                  defaultValue="12/25"
                  required
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  CVV
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="123"
                  defaultValue="123"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Cardholder Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="John Doe"
                defaultValue="John Doe"
                required
              />
            </div>

            <div className="my-4">
              <p className="space-x-2 text-md"><span className="uppercase">total:</span><span className="font-semibold">${total}</span></p>
            </div>

            <button
              type="submit"
              // onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              Pay Now
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};
