import { Link } from "react-router";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Success() {
  useEffect(() => {
    sessionStorage.removeItem("orders-storage");
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <FaCheckCircle className="text-green-500 w-20 h-20 mb-6 animate-bounce" />
      <h1 className="text-3xl font-bold mb-4 text-green-700">Order Successful!</h1>
      <p className="text-lg mb-8 text-gray-600">
        Thank you for your order. We will contact you soon.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Go to Home
        </Link>
        {/* <Link
          to="/orders"
          className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          View Orders
        </Link> */}
      </div>
    </div>
  );
}
