import React, { useState } from "react";
import profile from "../../assets/images/profile.png";
import Avvvatars from "avvvatars-react";
import { useSelector } from "react-redux";

const TicketPurchase = () => {
  const [visitorCounts, setVisitorCounts] = useState({
    vip: 0,
    group: 0,
    student: 0,
  });
  const [selectedDate, setSelectedDate] = useState("");
  const { principal } = useSelector((state) => state.authentication);

  const handleIncrement = (ticketType) => {
    setVisitorCounts((prevCounts) => ({
      ...prevCounts,
      [ticketType]: prevCounts[ticketType] + 1,
    }));
  };

  const handleDecrement = (ticketType) => {
    setVisitorCounts((prevCounts) => ({
      ...prevCounts,
      [ticketType]: prevCounts[ticketType] > 0 ? prevCounts[ticketType] - 1 : 0,
    }));
  };

  const totalPrice =
    visitorCounts.vip * 150 +
    visitorCounts.group * 100 +
    visitorCounts.student * 50;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="flex items-center space-x-4 mb-8 self-start mx-4">
        {/* <img
          src={profile}
          alt=""
          className="w-12 h-12 rounded-full"
        /> */}
        <Avvvatars value={principal} size={48} shadow={true} />
        <div>
          <h1 className="text-3xl font-semibold ">Welcome Back, Admin</h1>
          <div className="flex items-center  mt-1">
            <span>Book tickets here!</span>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-md w-4/5 mx-auto">
        <div className="flex justify-center mb-6">
          <div className="h-1 w-16 bg-orange-400 rounded-full"></div>
        </div>
        <h2 className="text-2xl font-semibold  text-center mb-8">
          MAIN GATE TICKET
        </h2>

        {/* Date Picker */}
        <div className="mb-8">
          <label htmlFor="datePicker" className="block  font-semibold mb-2">
            Select a date
          </label>
          <input
            id="datePicker"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-card focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>

        {/* Ticket Counters */}
        {[
          { label: "VIP Tickets", type: "vip", price: 150 },
          { label: "Group Tickets", type: "group", price: 100 },
          { label: "Student Tickets", type: "student", price: 50 },
        ].map((ticket) => (
          <div
            key={ticket.type}
            className="flex items-center justify-between mb-6"
          >
            <span className=" font-semibold">{ticket.label}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleDecrement(ticket.type)}
                className="px-4 py-1 border border-orange-400 text-orange-400 font-semibold rounded focus:outline-none hover:bg-orange-100"
              >
                -
              </button>
              <span className=" font-semibold w-8 text-center">
                {visitorCounts[ticket.type]}
              </span>
              <button
                onClick={() => handleIncrement(ticket.type)}
                className="px-4 py-1 border border-orange-400 text-orange-400 font-semibold rounded focus:outline-none hover:bg-orange-100"
              >
                +
              </button>
            </div>
          </div>
        ))}

        {/* Price Display */}
        <div className="text-lg font-bold  mb-8">
          Total Price: Rs. {totalPrice.toLocaleString()}
        </div>

        <button className="w-full bg-orange-400 text-white py-3 mx-2 rounded-lg font-semibold hover:bg-orange-500 transition duration-300">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default TicketPurchase;
