import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Principal } from "@dfinity/principal";
import notificationManager from "../../common/utils/notificationManager";

import { FaPlus, FaMinus } from "react-icons/fa";

export default function Ticket({
  type,
  gradientClass,
  name,
  description,
  price,
  availability,
  highlightClass,
  tickets,
  selectedVenue,
}) {
  const { backend, principal } = useSelector((state) => state.authentication);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const convertDateToNanoseconds = (dateString) => {
    const date = new Date(dateString);
    return date.getTime() * 1_000_000; // Convert milliseconds to nanoseconds
  };

  const buyVenueTicketHandler = async () => {
    try {
      const ticketTypeVariant = { ["SinglePass"]: null };
      const dateInNanoseconds = convertDateToNanoseconds(selectedDate);

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

      console.log(record);
      console.log(selectedVenue);

      const response = await backend.buyOfflineVenueTicket(
        selectedVenue,
        { ticket_type: ticketTypeVariant, price: price },
        record,
        Principal.fromText(principal),
        dateInNanoseconds,
        { Cash: null },
        ticketQuantity
      );

      console.log("venue ticket purchased successfully:", response);
      notificationManager.success("Ticket purchase successfully");

      toggleModal();
    } catch (err) {
      console.error("Error in buying venue tickets:", err);
      toggleModal();
    }
  };

  return (
    <div className="flex justify-center w-1/2 p-2 py-5">
      <div
        onClick={toggleModal}
        className={`relative ${gradientClass} rounded-xl w-full h-[196px] overflow-hidden cursor-pointer`}
      >
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 h-16 w-16 bg-background rounded-full z-20"></div>
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-16 w-16 bg-background rounded-full"></div>
        <div className="flex relative z-10">
          <div
            className={`h-[196px] w-[103px] ${highlightClass} flex items-center justify-center`}
          >
            <span className="transform -rotate-90 whitespace-nowrap text-[26px] font-black pt-15 tracking-widest text-white">
              {type}
            </span>
          </div>
          <div className="w-3/4 p-4">
            <h3 className="text-2xl font-black">{name}</h3>
            <p className="text-base font-normal">{description}</p>
            <div className="flex justify-between mt-[5rem]">
              <span className="text-lg font-black">Rp.{price}</span>
              <span className="text-lg font-normal">
                {availability} TICKETS LEFT
              </span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl text-secondary mb-4">{name}</h2>
            <div className="mb-4">
              <label className="block text-secondary text-lg mb-2">
                Select Date:
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <label className="block text-secondary text-lg mb-2">
                Quantity:
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setTicketQuantity(Math.max(1, ticketQuantity - 1))
                  }
                  className="px-2 py-1 bg-gray-200 rounded-md"
                >
                  <FaMinus size={8} />
                </button>
                <span className="text-lg">{ticketQuantity}</span>
                <button
                  onClick={() =>
                    setTicketQuantity(
                      Math.min(ticketQuantity + 1, availability)
                    )
                  }
                  className="px-2 py-1 bg-gray-200 rounded-md"
                >
                  <FaPlus size={8} />
                </button>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg text-secondary">Price:</span>
              <span className="text-lg font-semibold">${parseInt(price)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg text-secondary">Tickets Left:</span>
              <span className="text-lg font-semibold">
                {parseInt(availability)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg text-secondary">Type:</span>
              <span className="text-lg font-semibold">{type}</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-secondary text-white rounded-lg"
                onClick={buyVenueTicketHandler}
              >
                Buy Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
