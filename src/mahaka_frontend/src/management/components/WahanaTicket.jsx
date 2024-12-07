import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Principal } from "@dfinity/principal";
import notificationManager from "../../common/utils/notificationManager";

import { FaPlus, FaMinus } from "react-icons/fa";

export default function WahanaTicket({
  type,
  gradientClass,
  name,
  description,
  price,
  availability,
  highlightClass,
  tickets,
  selectedVenue,
  id,
}) {
  const { backend, principal } = useSelector((state) => state.authentication);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const convertDateToNanoseconds = (dateString) => {
    const date = new Date(dateString);
    return date.getTime() * 1_000_000; // Convert milliseconds to nanoseconds
  };

  const buyVenueTicketHandler = async () => {
    try {
      setLoading(true);

      const dateInNanoseconds = convertDateToNanoseconds(selectedDate);

      console.log(selectedVenue);

      const response = await backend.buyOfflineWahanaToken(
        selectedVenue,
        id,

        Principal.fromText(principal),
        ticketQuantity,
        dateInNanoseconds,
        { Cash: null }
      );

      console.log("wahana ticket purchased successfully:", response);
      notificationManager.success("Ticket purchase successfully");

      toggleModal();
    } catch (err) {
      console.error("Error in buying wahana tickets:", err);
      toggleModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-2 py-5">
      <div
        onClick={toggleModal}
        className={`relative ${gradientClass} rounded-xl w-full h-[160px] overflow-hidden cursor-pointer`}
      >
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 h-16 w-16 bg-background rounded-full z-20"></div>
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-16 w-16 bg-background rounded-full"></div>
        <div className="flex relative z-10">
          <div
            className={`h-[160px] w-[103px] ${highlightClass} flex items-center justify-center`}
          >
            <span className="transform -rotate-90 whitespace-nowrap text-[20px] font-black pt-15 tracking-widest text-white">
              {type}
            </span>
          </div>
          <div className="w-3/4 p-4">
            <h3 className="text-xl font-black">{name}</h3>
            {/* <p className="text-base font-normal">{description}</p> */}
            <div className="flex justify-between mt-[5rem]">
              <span className="  font-black">Rp.{price}</span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-3xl shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold text-secondary mb-4 text-center">
              {name}
            </h2>
            <div className="mb-6">
              <label className="block text-secondary text-lg font-semibold mb-2">
                Select Date:
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]} // Today's date
                max={
                  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                } // One week from now
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <label className="block text-secondary text-lg font-semibold">
                Quantity:
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    setTicketQuantity(Math.max(1, ticketQuantity - 1))
                  }
                  className="px-3 py-2 bg-gray-200 rounded-xl text-gray-600 hover:bg-gray-300 transition shadow-sm"
                >
                  <FaMinus size={12} />
                </button>
                <span className="text-lg font-semibold">{ticketQuantity}</span>
                <button
                  onClick={() =>
                    setTicketQuantity(
                      Math.min(ticketQuantity + 1, availability)
                    )
                  }
                  className="px-3 py-2 bg-gray-200 rounded-xl text-gray-600 hover:bg-gray-300 transition shadow-sm"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-secondary">Price:</span>
              <span className="text-lg font-semibold text-gray-800">
                Rp.{parseInt(price) * ticketQuantity}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-secondary">Type:</span>
              <span className="text-lg font-semibold text-gray-800">
                {type}
              </span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-secondary">
                Payment Mode:
              </span>
              <span className="text-lg font-semibold text-gray-800">Cash</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleModal}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition shadow-md"
              >
                Close
              </button>
              <button
                className={`px-6 py-3 rounded-full text-white transition shadow-md ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-secondary hover:bg-secondary-dark"
                }`}
                onClick={buyVenueTicketHandler}
                disabled={loading}
              >
                {loading ? "Buying..." : "Buy Ticket"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
