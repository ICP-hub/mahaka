import React, { useState } from "react";
const CreateVenueForm = () => {
  const [venueData, setVenueData] = useState({
    collection_args: {
      maxLimit: 100, 
      logo: { 
        data: "", 
        logo_type: "" 
      },
      name: "",
      banner: { 
        data: "", 
        logo_type: "" 
      },
      description: "",
      created_at: Date.now(),
      collection_type: "Venue", 
      symbol: "",
    },
    custodian: "", 
    title: "",
    price: 0,
    eventDetails: {
      StartDate: "",
      StartTime: "",
      Location: "",
      EndDate: "",
      EndTime: "",
    },
  });

  const handleFileChange = (e) => {
    setVenueData({ ...venueData, logo_type: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (e, section, field) => {
    const { value } = e.target;
    setVenueData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  return (
  <>
  <form  className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Venue Name</label>
          <input
            type="text"
            name="name"
            value={venueData.collection_args.name}
            onChange={(e) => handleNestedInputChange(e, "collection_args", "name")}
            className="mt-1 p-2 w-full border rounded border-gray-300"
            placeholder="Venue name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={venueData.collection_args.description}
            onChange={(e) => handleNestedInputChange(e, "collection_args", "description")}
            className="mt-1 p-2 w-full border rounded border-gray-300"
            placeholder="Venue description"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="StartDate"
              value={venueData.eventDetails.StartDate}
              onChange={(e) => handleNestedInputChange(e, "eventDetails", "StartDate")}
              className="mt-1 p-2 w-full border rounded border-gray-300"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="EndDate"
              value={venueData.eventDetails.EndDate}
              onChange={(e) => handleNestedInputChange(e, "eventDetails", "EndDate")}
              className="mt-1 p-2 w-full border rounded border-gray-300"
              required
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              name="StartTime"
              value={venueData.eventDetails.StartTime}
              onChange={(e) => handleNestedInputChange(e, "eventDetails", "StartTime")}
              className="mt-1 p-2 w-full border rounded border-gray-300"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="time"
              name="EndTime"
              value={venueData.eventDetails.EndTime}
              onChange={(e) => handleNestedInputChange(e, "eventDetails", "EndTime")}
              className="mt-1 p-2 w-full border rounded border-gray-300"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="Location"
            value={venueData.eventDetails.Location}
            onChange={(e) => handleNestedInputChange(e, "eventDetails", "Location")}
            className="mt-1 p-2 w-full border rounded border-gray-300"
            placeholder="Venue location"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={venueData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded border-gray-300"
            placeholder="Event title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={venueData.price}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded border-gray-300"
            placeholder="Event price"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo</label>
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
              Upload Logo
            </label>
            <p className="text-sm text-gray-500 mt-2">JPEG, PNG less than 5MB</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded">Create</button>
        </div>
      </form>
      </>
  );
};

export default CreateVenueForm;
