import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import flatpickr from "flatpickr";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
import { Principal } from "@dfinity/principal";

const CreateVenueForm = () => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.venues);
  const [venueData, setVenueData] = useState({
    collection_args: {
      maxLimit: 500,
      sTicket_limit: 100,
      gTicket_price: 50,
      logo: {
        data: "",
        logo_type: "image"
      },
      name: "",
      vTicket_price: 30,
      banner: {
        data: "",
        logo_type: "image"
      },
      description: "",
      created_at: BigInt(Date.now()),
      collection_type: { Venue: null },
      sTicket_price: 25,
      gTicket_limit: 200,
      symbol: "VENUE",
      vTicket_limit: 150
    },
    title: "",
    capacity: 1000,
    eventDetails: {
      StartDate: "",
      StartTime: "",
      Location: "",
      EndDate: "",
      EndTime: ""
    },
    custodian: Principal.fromText("2vxsx-fae")
  });

  const [bannerPreview, setBannerPreview] = useState("");
  const [startDate, setStartDate] = useState("");

  // Refs for Flatpickr
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    // Initialize Flatpickr for start date
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const startDatePicker = flatpickr(startDateRef.current, {
      dateFormat: "Y-m-d",
      onChange: (selectedDates) => {
        const newStartDate = selectedDates[0]
          ? formatDate(selectedDates[0], "yyyy-MM-dd")
          : "";
        setStartDate(newStartDate);
        setVenueData((prevState) => ({
          ...prevState,
          eventDetails: {
            ...prevState.eventDetails,
            StartDate: newStartDate,
          },
        }));
        // Update end date picker to disable dates before the new start date
        if (endDateRef.current) {
          endDatePicker.set("minDate", newStartDate);
        }
      },
    });

    // Initialize Flatpickr for end date
    const endDatePicker = flatpickr(endDateRef.current, {
      dateFormat: "Y-m-d",
      minDate: startDate, // Set minimum date for end date
      onChange: (selectedDates) => {
        const newEndDate = selectedDates[0] ? formatDate(selectedDates[0]) : "";
        setVenueData((prevState) => ({
          ...prevState,
          eventDetails: {
            ...prevState.eventDetails,
            EndDate: newEndDate,
          },
        }));
      },
    });

    // Initialize Flatpickr for times
    flatpickr(startTimeRef.current, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      onChange: (selectedDates) => {
        setVenueData((prevState) => ({
          ...prevState,
          eventDetails: {
            ...prevState.eventDetails,
            StartTime: selectedDates[0]
              ? selectedDates[0].toTimeString().split(" ")[0]
              : "",
          },
        }));
      },
    });

    flatpickr(endTimeRef.current, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      onChange: (selectedDates) => {
        setVenueData((prevState) => ({
          ...prevState,
          eventDetails: {
            ...prevState.eventDetails,
            EndTime: selectedDates[0]
              ? selectedDates[0].toTimeString().split(" ")[0]
              : "",
          },
        }));
      },
    });

    return () => {
      startDatePicker.destroy();
      endDatePicker.destroy();
    };
  }, [startDate]);

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
    if (loading) return;
    // console.log(venueData);
    dispatch(
      createVenue({
        backend,
      collectionDetails: {
        collection_args: venueData.collection_args,
        custodian: venueData.custodian
      },
      title: venueData.title,
      capacity: parseInt(venueData.capacity),
      details: venueData.eventDetails,
      description: venueData.collection_args.description
      })
    );
  };

  return (
    <>
      <form className="space-y-2" onSubmit={loading ? null : handleVenueSubmit}>
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
          <div className="border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <textarea
              name="description"
              rows={5}
              value={venueData.collection_args.description}
              onChange={(e) =>
                handleNestedInputChange(e, "collection_args", "description")
              }
              className="mt-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <label className="font-semibold">Start Date</label>
            <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
              <input
                ref={startDateRef}
                className="my-3 outline-none w-full bg-transparent"
              />
              <FcCalendar size={24} />
            </div>
          </div>
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <label className="font-semibold">End Date</label>
            <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
              <input
                ref={endDateRef}
                className="my-3 outline-none w-full bg-transparent"
              />
              <FcCalendar size={24} />
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <label className="font-semibold">Start Time</label>
            <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
              <input
                ref={startTimeRef}
                className="my-3 outline-none w-full bg-transparent"
              />
              <FcAlarmClock size={24} />
            </div>
          </div>
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <label className="font-semibold">End Time</label>
            <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
              <input
                ref={endTimeRef}
                className="my-3 outline-none w-full bg-transparent"
              />
              <FcAlarmClock size={24} />
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
        {/* Ticket Limits */}
        <div className="flex space-x-4">
                <div className="w-1/3">
                    <label className="font-semibold">General Ticket Limit</label>
                    <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            type="number"
                            name="gTicket_limit"
                            value={venueData.gTicket_limit}
                            onChange={handleInputChange}
                            className="my-3 outline-none w-full bg-transparent"
                            required
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <label className="font-semibold">Student Ticket Limit</label>
                    <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            type="number"
                            name="sTicket_limit"
                            value={venueData.sTicket_limit}
                            onChange={handleInputChange}
                            className="my-3 outline-none w-full bg-transparent"
                            required
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <label className="font-semibold">VIP Ticket Limit</label>
                    <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            type="number"
                            name="vTicket_limit"
                            value={venueData.vTicket_limit}
                            onChange={handleInputChange}
                            className="my-3 outline-none w-full bg-transparent"
                            required
                        />
                    </div>
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
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Venue"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateVenueForm;
