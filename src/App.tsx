import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "@pages/layout";
import Home from "@pages/home";
import Terms from "./pages/terms";
import ReviewPage from "./pages/review";
import Checkout from "./pages/checkout";
import Success from "./pages/success";

export default function App() {
  return (
    <BrowserRouter basename="/castle-zaman-menu">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="terms" element={<Terms />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="*" element={<div className="text-center my-20">404 | Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


