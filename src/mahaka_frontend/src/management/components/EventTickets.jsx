import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Principal } from "@dfinity/principal";
import notificationManager from "../../common/utils/notificationManager";

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
}) {
  const { backend, principal } = useSelector((state) => state.authentication);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const buyVenueTicketHandler = async () => {
    try {
      const ticketTypeVariant = { ["SinglePass"]: null };
      const record = [
        {
          data: new Uint8Array([1, 2, 3]),
          description: "Ticket metadata",
          key_val_data: [
            { key: "venueName", val: { TextContent: "Amazing Concert" } },
            { key: "date", val: { TextContent: "2024-12-31" } },
          ],
          purpose: { Rendered: null },
        },
      ];

      console.log(record);
      console.log(selectedVenue);

      const response = await backend.buyOfflineEventTicket(
        id,
        selectedVenue.id,
        { ticket_type: ticketTypeVariant, price: 1, priceFiat: 1 },
        record,

        Principal.fromText(principal),
        12345,

        1,
        { Cash: null }
      );

      console.log("event ticket purchased successfully:", response);
      notificationManager.success("Ticket purchase successfully");
      const ticket = await backend.getVenueTickets(
        "h7yxq-n6yb2-6js2j-af5hk-h4inj-edrce-oevyj-kbs7a-76kft-vrqrw-nqe"
      );
      console.log(ticket);
      toggleModal();
    } catch (err) {
      console.error("Error in buying event tickets:", err);
      toggleModal();
    }
  };

  return (
    <div className="flex justify-center py-5">
      {/* Ticket Card */}
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
            <h3 className="text-2xl font-black">Single Tickets</h3>
            {/* <p className="text-base font-normal">{tickets.description}</p> */}
            <div className="flex justify-between mt-[5rem]">
              <span className="text-lg font-black">
                ${parseInt(tickets.sTicket_price)}
              </span>
              <span className="text-lg font-normal">
                {parseInt(tickets.sTicket_limit)} tickets left
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl text-secondary   mb-4">{name}</h2>
            {/* <p className="text-base text-gray-600 mb-4">
              {tickets.description}
            </p> */}
            <div className="flex justify-between mb-4">
              <span className="text-lg text-secondary  ">Price:</span>
              <span className="text-lg font-semibold">
                ${parseInt(tickets.sTicket_price)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg  text-secondary ">Tickets Left:</span>
              <span className="text-lg font-semibold">
                {parseInt(tickets.sTicket_limit)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg text-secondary  ">Type:</span>
              <span className="text-lg font-semibold">{type}</span>
            </div>
            <div className="mb-4">
              <label className="block text-secondary text-lg   mb-2">
                Payment Mode:
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2">
                <option value="credit">Cash</option>
                <option value="debit">Card</option>
                <option value="paypal">ICP</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
              >
                Close
              </button>
              <button
                className="px-4 py-2  bg-secondary text-white rounded-lg"
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
