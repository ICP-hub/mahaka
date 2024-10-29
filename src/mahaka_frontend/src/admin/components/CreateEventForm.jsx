import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/reducers/apiReducers/eventApiReducer";
import flatpickr from "flatpickr";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";

const CreateEventForm = ({ setIsModalOpen, venueId, venueTitle }) => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { loading, createEventLoader } = useSelector(
    (state) => state.events
  );
  const [error, setError] = useState("");
  useEffect(() => {
    console.log("venueId:", venueId);
  }, [venueId]);

  const [eventData, setEventData] = useState({
    title: "",
    collection_args: {
      maxLimit: 0,
      logo: {
        data: "",
        logo_type: "",
      },
      name: "",
      banner: {
        data: "",
        logo_type: "",
      },
      description: "",
      created_at: Date.now(),
      collection_type: "Event",
      symbol: "",
      sTicket_price: 25,
      gTicket_price: 50,
      vTicket_price: 30,
      sTicket_limit: 100,
      gTicket_limit: 200,
      vTicket_limit: 150,
    },
    eventDetails: {
      StartDate: "",
      StartTime: 0,
      Location: "",
      EndDate: "",
      EndTime: 0,
    },
  });

  const [bannerPreview, setBannerPreview] = useState(null);


  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    flatpickr(startDateRef.current, {
      dateFormat: "Y-m-d",
      onChange: (selectedDates) => {
        const newStartDate = selectedDates[0]
          ? formatDate(selectedDates[0])
          : "";
        setEventData((prev) => ({
          ...prev,
          eventDetails: { ...prev.eventDetails, StartDate: newStartDate },
        }));
      },
      required: true,
    });

    flatpickr(endDateRef.current, {
      dateFormat: "Y-m-d",
      onChange: (selectedDates) => {
        const newEndDate = selectedDates[0] ? formatDate(selectedDates[0]) : "";
        setEventData((prev) => ({
          ...prev,
          eventDetails: { ...prev.eventDetails, EndDate: newEndDate },
        }));
      },
      required: true,
    });

    flatpickr(startTimeRef.current, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      onChange: (selectedDates) => {
        const newStartTime = selectedDates[0]
          ? selectedDates[0].getHours() * 60 + selectedDates[0].getMinutes()
          : 0;
        setEventData((prev) => ({
          ...prev,
          eventDetails: {
            ...prev.eventDetails,
            StartTime: newStartTime.toString(),
          },
        }));
      },
      required: true,
    });

    flatpickr(endTimeRef.current, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      onChange: (selectedDates) => {
        const newEndTime = selectedDates[0]
          ? selectedDates[0].getHours() * 60 + selectedDates[0].getMinutes()
          : 0;
        setEventData((prev) => ({
          ...prev,
          eventDetails: {
            ...prev.eventDetails,
            EndTime: newEndTime.toString(),
          },
        }));
      },
      required: true,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "description" ||
      name === "maxLimit" ||
      name === "symbol" ||
      name === "name"
    ) {
      setEventData((prevState) => ({
        ...prevState,
        collection_args: { ...prevState.collection_args, [name]: value },
      }));
    } else {
      setEventData((prevState) => ({
        ...prevState,
        [name]: name.includes("Ticket_limit") ? parseInt(value) : value,
      }));
    }
  };

  const imageToFileBlob = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(imageFile);
    });
  };
  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const maxSize = 200 * 1024; // 200KB

      // Create image element to load the file
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        const aspectRatio = width / height;

        // Start with original dimensions
        let quality = 0.7;
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Function to convert canvas to file
        const getCanvasBlob = (quality) => {
          return new Promise((resolve) => {
            canvas.toBlob(
              (blob) => {
                resolve(blob);
              },
              file.type,
              quality
            );
          });
        };

        // Recursively reduce quality until file size is under maxSize
        const reduceSize = async (currentQuality) => {
          const blob = await getCanvasBlob(currentQuality);

          if (blob.size <= maxSize || currentQuality <= 0.1) {
            // Convert blob to file
            const resizedFile = new File([blob], file.name, {
              type: file.type,
            });
            resolve(resizedFile);
          } else {
            // Reduce quality and try again
            await reduceSize(currentQuality - 0.1);
          }
        };

        reduceSize(quality);
      };
    });
  };


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        let processedFile = file;
        const maxSize = 200 * 1024; // 200KB

        // Check if file needs resizing
        if (file.size > maxSize) {
          processedFile = await resizeImage(file);
        }

        // Convert the processed file to blob
        const blob = await imageToFileBlob(processedFile);

        // Update state with the blob
        setEventData((prevState) => ({
          ...prevState,
          collection_args: {
            ...prevState.collection_args,
            banner: {
              data: blob,
              logo_type: file.type,
            },
          },
        }));
        // Set the banner preview
        setBannerPreview(URL.createObjectURL(processedFile));

      } catch (error) {
        setError("Error processing image. Please try again.");
        console.error("Error processing image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!venueId) {
      console.error("Venue ID is missing");
      return;
    }
    const fullVenueId = venueId;

    try {
      await dispatch(
        createEvent({
          backend,
          text: fullVenueId,
          record: {
            id: fullVenueId,
            title: eventData.title,
            sTicket_limit: eventData.collection_args.sTicket_limit,
            description: eventData.collection_args.description,
            logo: {
              data: eventData.collection_args.logo.data,
              logo_type: eventData.collection_args.logo.logo_type,
            },
            banner: {
              data: eventData.collection_args.banner.data,
              logo_type: eventData.collection_args.banner.logo_type,
            },
            details: {
              StartDate: eventData.eventDetails.StartDate,
              StartTime: parseInt(eventData.eventDetails.StartTime, 10),
              Location: eventData.eventDetails.Location,
              EndDate: eventData.eventDetails.EndDate,
              EndTime: parseInt(eventData.eventDetails.EndTime, 10),
            },
            gTicket_limit: eventData.collection_args.gTicket_limit,
            vTicket_limit: eventData.collection_args.vTicket_limit,
          },
          collection_args: {
            collection_args: {
              maxLimit: eventData.collection_args.maxLimit,
              logo: {
                data: eventData.collection_args.logo.data,
                logo_type: eventData.collection_args.logo.logo_type,
              },
              name: eventData.collection_args.name,
              banner: {
                data: eventData.collection_args.banner.data,
                logo_type: eventData.collection_args.banner.logo_type,
              },
              description: eventData.collection_args.description,
              created_at: eventData.collection_args.created_at,
              collection_type: { Event: null },
              symbol: eventData.collection_args.symbol,
              sTicket_price: eventData.collection_args.sTicket_price,
              gTicket_price: eventData.collection_args.gTicket_price,
              vTicket_price: eventData.collection_args.vTicket_price,
              sTicket_limit: eventData.collection_args.sTicket_limit,
              gTicket_limit: eventData.collection_args.gTicket_limit,
              vTicket_limit: eventData.collection_args.vTicket_limit,
            },
          },
        })
      );

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="space-y-4 tracking-wider">
      {/* Event Title */}
      <div>
        <label className="font-semibold">Event Title <span className="text-red-500">*</span></label>
        <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            className="my-3 outline-none w-full bg-transparent"
            placeholder="Event title"
            required
          />
        </div>
      </div>

      {/* Event Description */}
      <div>
        <label className="font-semibold">Event Description <span className="text-red-500">*</span></label>
        <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
          <textarea
            name="description"
            rows={5}
            value={eventData.collection_args.description}
            onChange={handleInputChange}
            className="my-3 outline-none w-full bg-transparent"
            placeholder="Event description"
            required
          />
        </div>
      </div>

      {/* Event Dates */}
      <div className="flex space-x-4">
        <div className="w-1/2 flex flex-col flex-auto gap-1">
          <label className="font-semibold">Start Date <span className="text-red-500">*</span></label>
          <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              ref={startDateRef}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
            <FcCalendar size={24} />
          </div>
        </div>

        <div className="w-1/2 flex flex-col flex-auto gap-1">
          <label className="font-semibold">End Date <span className="text-red-500">*</span></label>
          <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              ref={endDateRef}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
            <FcCalendar size={24} />
          </div>
        </div>
      </div>

      {/* Event Times */}
      <div className="flex space-x-4">
        <div className="w-1/2 flex flex-col flex-auto gap-1">
          <label className="font-semibold">Start Time <span className="text-red-500">*</span></label>
          <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              ref={startTimeRef}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
            <FcAlarmClock size={24} />
          </div>
        </div>
        <div className="w-1/2 flex flex-col flex-auto gap-1">
          <label className="font-semibold">End Time <span className="text-red-500">*</span></label>
          <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              ref={endTimeRef}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
            <FcAlarmClock size={24} />
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="font-semibold">Location <span className="text-red-500">*</span></label>
        <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
          <input
            type="text"
            name="Location"
            value={eventData.eventDetails.Location}
            onChange={(e) =>
              setEventData((prev) => ({
                ...prev,
                eventDetails: {
                  ...prev.eventDetails,
                  Location: e.target.value,
                },
              }))
            }
            className="my-3 outline-none w-full bg-transparent"
            placeholder="Event location"
            required
          />
        </div>
      </div>

      {/* Ticket Limits */}
      <div className="flex space-x-4">
        <div className="w-1/3">
          <label className="font-semibold">General Ticket Limit <span className="text-red-500">*</span></label>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              type="number"
              name="gTicket_limit"
              value={eventData.collection_args.gTicket_limit}
              onChange={handleInputChange}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
        <div className="w-1/3">
          <label className="font-semibold">Student Ticket Limit <span className="text-red-500">*</span></label>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              type="number"
              name="sTicket_limit"
              value={eventData.collection_args.sTicket_limit}
              onChange={handleInputChange}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
        <div className="w-1/3">
          <label className="font-semibold">VIP Ticket Limit <span className="text-red-500">*</span></label>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              type="number"
              name="vTicket_limit"
              value={eventData.collection_args.vTicket_limit}
              onChange={handleInputChange}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
      </div>

      {/* Event Image */}
      <div>
        <label className="font-semibold">Event Image <span className="text-red-500">*</span></label>
        <div className="mt-1 flex flex-col items-center justify-center border-dashed border-2 border-border p-4 rounded-lg">
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
            id="upload-image"
            required
          />
          <label
            htmlFor="upload-image"
            className="cursor-pointer bg-card text-text py-2 px-4 rounded-md border border-border"
          >
            Upload Image
          </label>
          {bannerPreview && (
            <img
              src={bannerPreview}
              alt="Banner Preview"
              className="mt-2 w-full h-auto rounded"
              style={{
                maxWidth: "96px",
                maxHeight: "96px",
                minWidth: "96px",
                minHeight: "96px",
              }}
            />
          )}
          {/* <p className="text-sm text-gray-500 mt-2">JPEG, PNG less than 5MB</p> */}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-2">
        {/* <button
          type="button"
          onClick={() => (loading ? null : setIsModalOpen(false))}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button> */}
        <button
          className={`text-white py-2 px-4 rounded ${createEventLoader ? "bg-gray-600" : "bg-secondary"
            }`}
          disabled={createEventLoader}
          onClick={(e) => (createEventLoader ? null : handleSubmit(e))}
        >
          {createEventLoader ? "Creating Event..." : "Create Event"}
        </button>
      </div>

      {/* Error Message */}
      {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
    </form>
  );
};

export default CreateEventForm;
