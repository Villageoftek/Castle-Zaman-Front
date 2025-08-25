import { Link } from "react-router";
export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
      <p className="text-lg mb-8">Thank you for your order. We will contact you soon.</p>
      <Link
        to="/"
        className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};
