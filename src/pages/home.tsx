import MenuItem from "@/components/menuItem";
import useOrdersState from "@/state/orders";
import { type Meal } from "@/types/menuItem";
import { useNavigate } from "react-router";
import useMealsQuery from "../queres/getAllMeals";
import { useState } from "react";

export default function Home() {
  const { totalOrders, guests, setGuests, date, setDate, time, setTime, email, setEmail, orders } =
    useOrdersState((state) => state);
  const to = useNavigate();
  const { data } = useMealsQuery();
  const meals = data.data;
  const today = new Date().toISOString().split("T")[0];
  const getTimeString = (date: Date) => date.toTimeString().slice(0, 5);

  //  state للـ email error
  const [emailError, setEmailError] = useState("");

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setGuests(value < 0 ? 0 : value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTime(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    //  regex to validate the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  if (!meals.length) {
    return <div>No data found</div>;
  }

  // now the email is validated
  const isNextDisabled =
    !guests || !date || !time || !email || orders.length === 0 || !!emailError;

  return (
    <div className="my-8">
      <div className="flex flex-col items-start my-12 divide-y divide-gray-700 dark:divide-gray-200 *:odd:bg-white dark:*:odd:bg-gray-800 *:even:bg-grr dark:*:even:bg-gray-700">
        {meals.map((item: Meal) => (
          <MenuItem key={item.id} menuItem={item} />
        ))}
      </div>


      <div className="flex flex-col gap-2   rounded-xl">
        {/* Guests */}
        <div className="flex items-center //gap-6">
          <label className="w-40 text-lg font-semibold">Guests Count:</label>
          <input
            type="number"
            className="w-72 h-11 border border-gray-900 dark:border-gray-100 rounded-md px-3 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            value={guests}
            onChange={handleGuestsChange}
          />
        </div>

        {/* Date */}
        <div className="flex items-center //gap-6">
          <label className="w-40 text-lg font-semibold">Arrival Date:</label>
          <input
            type="date"
            min={today}
            className="w-72 h-11 border border-gray-900 dark:border-gray-100 rounded-md px-3 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        {/* Time */}
        <div className="flex items-center //gap-6">
          <label className="w-40 text-lg font-semibold">Arrival Time:</label>
          <input
            type="time"
            min={date === today ? getTimeString(new Date()) : undefined}
            className="w-72 h-11 border border-gray-900 dark:border-gray-100 rounded-md px-3 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            value={time}
            onChange={handleTimeChange}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center //gap-6">
            <label className="w-40 text-lg font-semibold">Your E-mail:</label>
            <input
              type="email"
              className={`w-72 h-11 rounded-md px-3 text-base focus:ring-2 focus:ring-blue-500 outline-none ${emailError
                ? "border border-red-500"
                : "border border-gray-900 dark:border-gray-100"
                }`}
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          {emailError && <p className="text-red-500 text-sm pl-40">{emailError}</p>}
        </div>


        <div className=" mt-8 text-2xl   ">
           <span className="font-serif text-heder dark:text-white">
            Total charge: 
          </span>
          <span>
            {totalOrders() <= 0 ? "" : totalOrders().toFixed(2)}
            {/* {totalOrders().toFixed(2)} */}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between gap-8 my-12 //px-12">
        <button
          type="button"
          onClick={() => to("/terms")}
          disabled={isNextDisabled}
          className={`py-1.5 px-4 rounded-md text-lg font-medium text-slate-100 transition-all ml-auto ${isNextDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-700 hover:bg-blue-800 "
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
