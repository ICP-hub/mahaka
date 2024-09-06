import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVenue } from "../../redux/reducers/apiReducers/venueApiReducer";

const CreateVenueForm = () => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.venues);
  const [venueData, setVenueData] = useState({
    collection_args: {
      maxLimit: 100,
      logo: {
        data: "logodata_static",
        logo_type: "logotype_static",
      },
      name: "",
      banner: {
        data: "",
        logo_type: "",
      },
      description: "",
      created_at: Date.now(),
      collection_type: { Venue: null },
      symbol: "Venue_symbol_static",
    },
    custodian: "2vxsx-fae",
    title: "",
    capacity: 0,
    eventDetails: {
      StartDate: "",
      StartTime: "",
      Location: "",
      EndDate: "",
      EndTime: "",
    },
  });

  const [bannerPreview, setBannerPreview] = useState("");

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const reader = new FileReader();

      reader.onloadend = () => {
        setVenueData((prevState) => ({
          ...prevState,
          collection_args: {
            ...prevState.collection_args,
            banner: {
              data: reader.result,
              logo_type: fileType,
            },
          },
        }));
        setBannerPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Handler form submit
  const handleVenueSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createVenue({
        backend,
        collectionArgs: venueData.collection_args,
        custodian: "2vxsx-fae",
        title: venueData.title,
        capacity: parseInt(venueData.capacity),
        details: { ...venueData.eventDetails, StartTime: 4, EndTime: 6 },
        description: "description of the venue",
      })
    );
  };

  return (
    <>
      <form className="space-y-2">
        <div className="flex flex-col flex-auto gap-1">
          <label className="font-semibold">Venue Name</label>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border ">
            <input
              type="text"
              name="name"
              value={venueData.collection_args.name}
              onChange={(e) =>
                handleNestedInputChange(e, "collection_args", "name")
              }
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
        <div className="flex flex-col flex-auto gap-1">
          <label className="font-semibold">Description</label>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <textarea
              name="description"
              value={venueData.collection_args.description}
              onChange={(e) =>
                handleNestedInputChange(e, "collection_args", "description")
              }
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <label className="font-semibold">Start Date</label>
            <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
              <input
                type="date"
                name="StartDate"
                value={venueData.eventDetails.StartDate}
                onChange={(e) =>
                  handleNestedInputChange(e, "eventDetails", "StartDate")
                }
                className="my-3 outline-none w-full bg-transparent"
                required
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <label className="font-semibold">End Date</label>
            <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
              <input
                type="date"
                name="EndDate"
                value={venueData.eventDetails.EndDate}
                onChange={(e) =>
                  handleNestedInputChange(e, "eventDetails", "EndDate")
                }
                className="my-3 outline-none w-full bg-transparent"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <label className="font-semibold">Start Time</label>
            <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
              <input
                type="time"
                name="StartTime"
                value={venueData.eventDetails.StartTime}
                onChange={(e) =>
                  handleNestedInputChange(e, "eventDetails", "StartTime")
                }
                className="my-3 outline-none w-full bg-transparent"
                required
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <label className="font-semibold">End Time</label>
            <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
              <input
                type="time"
                name="EndTime"
                value={venueData.eventDetails.EndTime}
                onChange={(e) =>
                  handleNestedInputChange(e, "eventDetails", "EndTime")
                }
                className="my-3 outline-none w-full bg-transparent"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto gap-1">
          <label className="font-semibold">Location</label>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              type="text"
              name="Location"
              value={venueData.eventDetails.Location}
              onChange={(e) =>
                handleNestedInputChange(e, "eventDetails", "Location")
              }
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
        <div className="flex flex-col flex-auto gap-1">
          <label className="font-semibold">Title</label>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              type="text"
              name="title"
              value={venueData.title}
              onChange={handleInputChange}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
        <div className="flex flex-col flex-auto gap-1">
          <label className="font-semibold">Maximum number of people</label>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              type="number"
              name="capacity"
              value={venueData.capacity}
              onChange={handleInputChange}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
        <div className="flex flex-col flex-auto gap-1">
          <label className="font-semibold">Banner</label>
          <div className="flex flex-col items-center justify-center border-dashed border-2 border-border p-4 rounded">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              id="upload-image"
              onChange={handleFileChange}
            />
            <label
              htmlFor="upload-image"
              className="cursor-pointer bg-card text-text py-2 px-4 rounded-md border border-border"
            >
              Upload Banner
            </label>
            <p className="text-sm text-gray-500 mt-2">
              JPEG, PNG less than 5MB
            </p>
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-2 w-full h-auto rounded"
              />
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`text-white py-2 px-4 rounded ${
              loading ? "bg-gray-400" : "bg-secondary"
            }`}
            onClick={loading ? null : handleVenueSubmit}
          >
            {loading ? "Creating..." : "Create Venue"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateVenueForm;
