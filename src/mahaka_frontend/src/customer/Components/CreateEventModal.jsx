import React, { useState } from "react";
import ModalOverlay from "./Modal-overlay";
const CustomDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 p-2 w-full border border-gray-300 rounded text-left flex justify-between items-center"
      >
        {value || "Select"}
        <i className={`ml-2 fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
      </button>

      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => handleSelect("Free Souvenirs for All Tickets")}
          >
            <i className="fa-solid fa-gift mr-2"></i>
            Free Souvenirs for All Tickets
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => handleSelect("VIP Area Access for VIP Pass Holders")}
          >
            <i className="fa-solid fa-crown mr-2"></i>
            VIP Area Access for VIP Pass Holders
          </li>
        </ul>
      )}
    </div>
  );
};
const CreateEventModal = ({ isOpen, setIsOpen }) => {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    promotion: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventData);
    setEventData({
      eventName: "",
      eventDate: "",
      startTime: "",
      endTime: "",
      promotion: "",
      image: null,
    });
    setIsOpen(false);
  };

  return (
    <ModalOverlay isOpen={isOpen} setIsOpen={setIsOpen} title="Create Event">
      <form onSubmit={handleSubmit} className="space-y-4 tracking-wider">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded border-gray-300"
            placeholder="Event name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={eventData.eventDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded border-gray-300"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Starting Time</label>
            <input
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded border-gray-300"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Ending Time</label>
            <input
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded border-gray-300"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Promotions (if any)
          </label>
          <CustomDropdown
            value={eventData.promotion}
            onChange={(value) => setEventData({ ...eventData, promotion: value })}
          />
        </div>
        {/* Event Image Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Image</label>
          <div className="mt-1 flex flex-col items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              id="upload-image"
            />
            <label
              htmlFor="upload-image"
              className="cursor-pointer bg-gray-100 py-2 px-4 rounded-md border border-gray-300"
            >
              Upload Image
            </label>
            <p className="text-sm text-gray-500 mt-2">JPEG, PNG less than 5MB</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-orange-500 text-white py-2 px-7 rounded">Create</button>
        </div>
      </form>
    </ModalOverlay>
  );
};

export default CreateEventModal;