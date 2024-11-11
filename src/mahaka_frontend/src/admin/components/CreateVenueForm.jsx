import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import flatpickr from "flatpickr";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
import { Principal } from "@dfinity/principal";
import TextHint from "../../customer/Components/TextHint";

const CreateVenueForm = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { createVenueLoader } = useSelector((state) => state.venues);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [venueData, setVenueData] = useState({
    collection_args: {
      maxLimit: 500,
      sTicket_limit: 100,
      gTicket_price: 50,
      logo: {
        data: "",
        logo_type: "image",
      },
      name: "",
      vTicket_price: 30,
      banner: {
        data: "",
        logo_type: "image",
      },
      description: "",
      created_at: BigInt(Date.now()),
      collection_type: { Venue: null },
      sTicket_price: 25,
      gTicket_limit: 200,
      symbol: "VENUE",
      vTicket_limit: 150,
    },
    title: "",
    capacity: 1000,
    eventDetails: {
      StartDate: "",
      StartTime: "",
      Location: "",
      EndDate: "",
      EndTime: "",
    },
    custodian: Principal.fromText("2vxsx-fae"),
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
        if (newStartDate) {
          setFormErrors((prev) => ({ ...prev, StartDate: "" }));
        }
        // Update end date picker to disable dates before the new start date
        if (endDateRef.current) {
          endDatePicker.set("minDate", newStartDate);
        }
      },
      required: true,
    });

    // Initialize Flatpickr for end date
    const endDatePicker = flatpickr(endDateRef.current, {
      dateFormat: "Y-m-d",
      minDate: startDate,
      onChange: (selectedDates) => {
        const newEndDate = selectedDates[0] ? formatDate(selectedDates[0]) : "";
        setVenueData((prevState) => ({
          ...prevState,
          eventDetails: {
            ...prevState.eventDetails,
            EndDate: newEndDate,
          },
        }));
        if (newEndDate) {
          setFormErrors((prev) => ({ ...prev, EndDate: "" }));
        }
      },
      required: true,
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
      required: true,
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
      required: true,
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
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        const aspectRatio = width / height;

        // Start with original dimensions
        let quality = 0.7;
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        const ctx = canvas.getContext("2d");
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
    setError("");

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
        setVenueData((prevState) => ({
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
  const [logoPreview, setLogoPreview] = useState(null);
  const handleFileChange2 = async (e) => {
    const file = e.target.files[0];
    setError("");

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
        setVenueData((prevState) => ({
          ...prevState,
          collection_args: {
            ...prevState.collection_args,
            logo: {
              data: blob,
              logo_type: file.type,
            },
          },
        }));

        // Set the banner preview
        setLogoPreview(URL.createObjectURL(processedFile));
      } catch (error) {
        setError("Error processing image. Please try again.");
        console.error("Error processing image:", error);
      }
    }
  };

  const validateForm = () => {
    // Check if all required fields are filled
    const errors = {};
    if (
      !venueData.collection_args.description ||
      !venueData.eventDetails.Location ||
      !venueData.title ||
      !venueData.capacity
    ) {
      setError("Please fill in all required fields");
      return false;
    }
    if (!venueData.eventDetails.StartDate) {
      errors.StartDate = "Start date is required";
    }
    if (!venueData.eventDetails.EndDate) {
      errors.EndDate = "End date is required";
    }
    if (!venueData.eventDetails.StartTime) {
      errors.StartTime = "Start time is required";
    }
    if (!venueData.eventDetails.EndTime) {
      errors.EndTime = "End time is required";
    }

    if (!venueData.collection_args.banner.data.trim()) {
      errors.banner = "Venue banner is required";
    }
    if (!venueData.collection_args.logo.data.trim()) {
      errors.logo = "Venue logo is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handler form submit
  const handleVenueSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (createVenueLoader) return;

    if (!validateForm()) {
      return;
    }

    dispatch(
      createVenue({
        backend,
        collectionDetails: {
          collection_args: venueData.collection_args,
          custodian: venueData.custodian,
        },
        title: venueData.title,
        capacity: parseInt(venueData.capacity),
        details: venueData.eventDetails,
        description: venueData.collection_args.description,
        action: setIsModalOpen,
      })
    );
  };

  const getInputClassName = (fieldName) => {
    return `my-3 outline-none w-full bg-transparent ${
      formErrors[fieldName] ? "border-red-500" : ""
    }`;
  };

  return (
    <>
      <form
        className="space-y-2"
        onSubmit={createVenueLoader ? null : handleVenueSubmit}
      >
        <div className="flex flex-col flex-auto gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Venue Name</label>
            <TextHint text="Enter the name of the venue." />
          </div>
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
          <div className="flex items-center gap-2">
            <label className="font-semibold">Description</label>
            <TextHint text="Enter the description of the venue." />
          </div>
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
            <div className="flex items-center gap-2">
              <label className="font-semibold">Start Date</label>
              <TextHint text="Enter the start date of the venue." />
            </div>
            <div
              className={`flex items-center border ${
                formErrors.StartDate ? "border-red-500" : "border-border"
              } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
            >
              <input
                ref={startDateRef}
                className={getInputClassName("StartDate")}
                required
              />
              <FcCalendar size={24} />
            </div>
            {formErrors.StartDate && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.StartDate}
              </p>
            )}
          </div>
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">End Date</label>
              <TextHint text="Enter the end date of the venue." />
            </div>
            <div
              className={`flex items-center border ${
                formErrors.EndDate ? "border-red-500" : "border-border"
              } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
            >
              <input
                ref={endDateRef}
                className={getInputClassName("EndDate")}
                required
              />
              <FcCalendar size={24} />
            </div>
            {formErrors.EndDate && (
              <p className="text-red-500 text-sm mt-1">{formErrors.EndDate}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Start Time</label>
              <TextHint text="Enter the starting time of the venue." />
            </div>
            <div
              className={`flex items-center border ${
                formErrors.StartTime ? "border-red-500" : "border-border"
              } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
            >
              <input
                ref={startTimeRef}
                className={getInputClassName("StartTime")}
                required
              />
              <FcAlarmClock size={24} />
            </div>
            {formErrors.StartTime && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.StartTime}
              </p>
            )}
          </div>
          <div className="w-1/2 flex flex-col flex-auto gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">End Time</label>
              <TextHint text="Enter the ending time of the venue." />
            </div>
            <div
              className={`flex items-center border ${
                formErrors.EndTime ? "border-red-500" : "border-border"
              } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
            >
              <input
                ref={endTimeRef}
                className={getInputClassName("EndTime")}
                required
              />
              <FcAlarmClock size={24} />
            </div>
            {formErrors.EndTime && (
              <p className="text-red-500 text-sm mt-1">{formErrors.EndTime}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-auto gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Location</label>
            <TextHint text="Enter the location of the venue." />
          </div>
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
          <div className="flex items-center gap-2">
            <label className="font-semibold">Maximum number of people</label>
            <TextHint text="Enter the maximum number of people in the venue." />
          </div>
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
            <div className="flex items-center gap-2">
              <label className="font-semibold">General Ticket Limit</label>
              <TextHint text="Enter general ticket limit of the venue." />
            </div>
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
            <div className="flex items-center gap-2">
              <label className="font-semibold">Student Ticket Limit</label>
              <TextHint text="Enter student ticket limit of the venue." />
            </div>
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
            <div className="flex items-center gap-2">
              <label className="font-semibold">VIP Ticket Limit</label>
              <TextHint text="Enter VIP ticket limit of the venue." />
            </div>
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

        <div className="flex space-x-4">
          <div className="w-1/2">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Banner</label>
              <TextHint text="Upload the image of the venue." />
            </div>
            <div className="flex flex-col items-center justify-center border-dashed border-2 border-border p-4 rounded">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                id="upload-image"
                onChange={handleFileChange}
                required
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
                  style={{
                    maxWidth: "96px",
                    maxHeight: "96px",
                    minWidth: "96px",
                    minHeight: "96px",
                  }}
                />
              )}
            </div>
          </div>
          {formErrors.banner && (
            <p className="text-red-500 text-sm mt-1">{formErrors.banner}</p>
          )}
          <div className="w-1/2">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Logo</label>
              <TextHint text="Upload the image of the venue." />
            </div>
            <div className="flex flex-col items-center justify-center border-dashed border-2 border-border p-4 rounded">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                id="upload-image1"
                onChange={handleFileChange2}
                required
              />
              <label
                htmlFor="upload-image1"
                className="cursor-pointer bg-card text-text py-2 px-4 rounded-md border border-border"
              >
                Upload logo
              </label>
              {logoPreview && (
                <img
                  src={logoPreview}
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
            </div>
          </div>
          {formErrors.logo && (
            <p className="text-red-500 text-sm mt-1">{formErrors.logo}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`text-white py-2 px-4 rounded ${
              createVenueLoader ? "bg-gray-400" : "bg-secondary"
            }`}
            disabled={createVenueLoader}
          >
            {createVenueLoader ? "Creating..." : "Create Venue"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateVenueForm;
