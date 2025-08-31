import { Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa"; 

export default function Failed() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <FaTimesCircle className="text-red-500 w-20 h-20 mb-6 animate-pulse" />
      <h1 className="text-3xl font-bold mb-4 text-red-700">Order Failed!</h1>
      <p className="text-lg mb-8 ">
        Something went wrong with your order. Please try again.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="py-2 px-6 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Go to Home
        </Link>
        <Link
          to="/review"
          className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
