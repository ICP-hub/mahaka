import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Principal } from "@dfinity/principal";
import notificationManager from "../../common/utils/notificationManager";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function EventTickets({
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
  ticketType,
}) {
  const { backend, principal } = useSelector((state) => state.authentication);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError(""); // Reset error when modal is closed
  };

  const convertNanosecondsToDate = (nanoseconds) => {
    const milliseconds = Number(nanoseconds) / 1_000_000;
    return new Date(milliseconds).toISOString().split("T")[0];
  };

  const convertNanosecondsToTime = (nanoseconds) => {
    const milliseconds = Number(nanoseconds) / 1_000_000;
    return new Date(milliseconds).toISOString().split("T")[1];
  };

  const minDate = selectedVenue?.details?.StartDate
    ? convertNanosecondsToDate(selectedVenue.details.StartDate)
    : new Date().toISOString().split("T")[0];

  const maxDate = selectedVenue?.details?.EndDate
    ? convertNanosecondsToDate(selectedVenue.details.EndDate)
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

  const convertDateToNanoseconds = (dateString) => {
    const date = new Date(dateString);
    return date.getTime() * 1_000_000;
  };

  const buyVenueTicketHandler = async () => {
    if (!selectedDate) {
      notificationManager.error("Please select a date");
      return;
    }

    if (ticketQuantity > availability) {
      setError(`Only ${availability} tickets are available.`);
      return;
    }

    try {
      setLoading(true);
      const ticketTypeVariant = { [ticketType]: null };
      const record = [
        {
          data: new Uint8Array([1, 2, 3]),
          description: "Ticket metadata",
          key_val_data: [
            { key: "venueName", val: { TextContent: "Amazing Concert" } },
            { key: "date", val: { TextContent: selectedDate } },
          ],
          purpose: { Rendered: null },
        },
      ];

      const startTimeInMs = Number(selectedVenue.details.StartDate) / 1_000_000;
      let fullDate = `${selectedDate}T00:00:00`;

      if (
        selectedDate ===
        convertNanosecondsToDate(selectedVenue?.details?.StartDate)
      ) {
        const startDateTime = new Date(startTimeInMs);
        startDateTime.setMinutes(startDateTime.getMinutes() + 1); // Add 1 minute
        const updatedStartTime = startDateTime.toISOString().split("T")[1];
        fullDate = `${selectedDate}T${updatedStartTime}`;
      }

      const dateInNanoseconds = convertDateToNanoseconds(fullDate);

      const response = await backend.buyOfflineEventTicket(
        id,
        selectedVenue.id,
        { ticket_type: ticketTypeVariant, price: price },
        record,
        Principal.fromText(principal),
        dateInNanoseconds,
        ticketQuantity,
        { Cash: null }
      );

      console.log("Event ticket purchased successfully:", response);
      notificationManager.success("Ticket purchase successful");

      toggleModal();
    } catch (err) {
      console.error("Error in buying event tickets:", err);
      setError("An error occurred while purchasing the ticket.");
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
            <div className="flex justify-between mt-[5rem]">
              <span className="font-black">Rp.{price}</span>
              <span className="font-normal">{availability} TICKETS LEFT</span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-3xl  shadow-2xl p-8 w-full max-w-md relative">
            <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
              {name}
            </h2>
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Select Date:
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                value={selectedDate}
                min={minDate}
                max={maxDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="text-lg font-semibold text-gray-800">
                Quantity:
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    setTicketQuantity(Math.max(1, ticketQuantity - 1))
                  }
                  className="px-3 py-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 shadow-sm"
                >
                  <FaMinus />
                </button>
                <span className="text-xl font-semibold">{ticketQuantity}</span>
                <button
                  onClick={() =>
                    setTicketQuantity(
                      Math.min(ticketQuantity + 1, availability)
                    )
                  }
                  className="px-3 py-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 shadow-sm"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-700 mb-4">
              <span className="text-lg font-medium">Price:</span>
              <span className="text-lg font-semibold text-secondary">
                Rp.{parseInt(price) * ticketQuantity}
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-700 mb-4">
              <span className="text-lg font-medium">Tickets Left:</span>
              <span className="text-lg font-semibold text-secondary">
                {parseInt(availability) - ticketQuantity}
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-700 mb-4">
              <span className="text-lg font-medium">Type:</span>
              <span className="text-lg font-semibold text-secondary">
                {type}
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-700 mb-6">
              <span className="text-lg font-medium">Payment Mode:</span>
              <span className="text-lg font-semibold">Cash</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleModal}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-200 shadow-md"
              >
                Close
              </button>
              <button
                className={`px-6 py-3 rounded-full text-white transition duration-200 shadow-md ${
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
            <div
              className="absolute top-3 right-3 text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition duration-200"
              onClick={toggleModal}
            >
              &times;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
