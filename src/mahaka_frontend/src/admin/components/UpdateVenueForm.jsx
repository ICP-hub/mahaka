import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import flatpickr from "flatpickr";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
import { Principal } from "@dfinity/principal";
import TextHint from "../../customer/Components/TextHint";


const UpdateVenueForm = ({ venue, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { createVenueLoader } = useSelector((state) => state.venues);
  const [bannerPreview, setBannerPreview] = useState(venue.banner.data);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(venue.logo.data);
  console.log(venue);
  const [venueData, setVenueData] = useState({
    collection_args: {
      maxLimit: 500,
      sTicket_limit: 100,
      gTicket_price: 50,
      logo: {
        data: "",
        logo_type: "image",
      },
      name: venue.Title || "",
      vTicket_price: 30,
      banner: {
        data: "",
        logo_type: "image",
      },
      description: venue.Description || "",
      created_at: BigInt(Date.now()),
      collection_type: { Venue: null },
      sTicket_price: 25,
      gTicket_limit: 200,
      symbol: "VENUE",
      vTicket_limit: 150,
    },

    Title: venue.Title || "",
    Description: venue.Description || "",
    capacity: parseInt(venue.capacity) || "",
    Details: {
      StartDate: venue.Details?.StartDate || "",
      EndDate: venue.Details?.EndDate || "",
      StartTime: venue.Details?.StartTime || "",
      EndTime: venue.Details?.EndTime || "",
      Location: venue.Details?.Location || "",
    },
    logo: {
      data: venue.logo.data,
      logo_type: "image",
    },
    banner: {
      data: venue.banner.data,
      logo_type: "image",
    },
    custodian: Principal.fromText("2vxsx-fae"),
  });

  // Refs for Flatpickr
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    // Helper to format date in "YYYY-MM-DD"
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Initialize Flatpickr for start date
    flatpickr(startDateRef.current, {
      dateFormat: "Y-m-d",
      defaultDate: venueData.Details.StartDate,
      onChange: (selectedDates) => {
        const newStartDate = selectedDates[0]
          ? formatDate(selectedDates[0])
          : "";
        setVenueData((prev) => ({
          ...prev,
          Details: { ...prev.Details, StartDate: newStartDate },
        }));
      },
      required: true,
    });

    // Initialize Flatpickr for end date
    flatpickr(endDateRef.current, {
      dateFormat: "Y-m-d",
      defaultDate: venueData.Details.EndDate,
      onChange: (selectedDates) => {
        const newEndDate = selectedDates[0] ? formatDate(selectedDates[0]) : "";
        setVenueData((prev) => ({
          ...prev,
          Details: { ...prev.Details, EndDate: newEndDate },
        }));
      },
      required: true,
    });

    // Initialize Flatpickr for start time with seconds
    flatpickr(startTimeRef.current, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i:S",
      defaultDate: venueData.Details.StartTime,
      onChange: (selectedDates) => {
        const newStartTime = selectedDates[0]
          ? selectedDates[0].toTimeString().slice(0, 8) // format as "HH:mm:ss"
          : "09:00:00"; // fallback time with seconds
        setVenueData((prev) => ({
          ...prev,
          Details: { ...prev.Details, StartTime: newStartTime },
        }));
      },
      required: true,
    });

    // Initialize Flatpickr for end time with seconds
    flatpickr(endTimeRef.current, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i:S",
      defaultDate: venueData.Details.EndTime,
      onChange: (selectedDates) => {
        const newEndTime = selectedDates[0]
          ? selectedDates[0].toTimeString().slice(0, 8) // format as "HH:mm:ss"
          : "17:00:00"; // fallback time with seconds
        setVenueData((prev) => ({
          ...prev,
          Details: { ...prev.Details, EndTime: newEndTime },
        }));
      },
      required: true,
    });
  }, [
    venueData.Details.StartDate,
    venueData.Details.EndDate,
    venueData.Details.StartTime,
    venueData.Details.EndTime,
  ]);

  const validateForm = () => {
    const errors = {};

    // Validate title
    if (!venueData.Title.trim()) {
      errors.title = "Venue title is required";
    }

    // Validate description
    if (!venueData.Description.trim()) {
      errors.description = "Venue description is required";
    }

    // Validate dates and times
    if (!venueData.Details.StartDate) {
      errors.StartDate = "Start date is required";
    }
    if (!venueData.Details.EndDate) {
      errors.EndDate = "End date is required";
    }
    if (!venueData.Details.StartTime) {
      errors.StartTime = "Start time is required";
    }
    if (!venueData.Details.EndTime) {
      errors.EndTime = "End time is required";
    }

    // Validate location
    if (!venueData.Details.Location.trim()) {
      errors.Location = "Location is required";
    }

    if (!venueData.capacity) {
      errors.Capacity = "Maximun no. of people is required";
    }

    // Validate banner image
    if (!venueData.banner.data.trim()) {
      errors.banner = "Venue banner is required";
    }
    if (!venueData.logo.data.trim()) {
      errors.logo = "Venue logo is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prev) => ({
      ...prev,
      [name]: value,
      collection_args: {
        ...prev.collection_args,
        name: name === "Title" ? value : prev.collection_args.name,
        description:
          name === "Description" ? value : prev.collection_args.description,
      },
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prev) => ({
      ...prev,
      Details: {
        ...prev.Details,
        [name]: value,
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
        console.log(blob, "logo");

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
          logo: {
            data: blob,
            logo_type: file.type,
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
        // Convert the file into a Blob
        const blob = await imageToFileBlob(processedFile);

        // Update state with the Blob directly in banner
        setVenueData((prevState) => ({
          ...prevState,
          collection_args: {
            ...prevState.collection_args,
            banner: {
              data: blob,
              logo_type: file.type,
            },
          },
          banner: {
            data: blob,
            logo_type: file.type,
          },
        }));

        // Set the banner preview (optional, for displaying image)
        setBannerPreview(URL.createObjectURL(processedFile));
      } catch (error) {
        setError("Error processing image. Please try again.");
        console.error("Error processing image:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const venueId = venue.id;
    console.log(venueId);
    setError("");
    const eventDetails = {
      StartDate: venueData.Details.StartDate,
      StartTime: venueData.Details.StartTime,
      EndDate: venueData.Details.EndDate,
      EndTime: venueData.Details.EndTime,
      Location: venueData.Details.Location,
    };
    console.log(venueData.logo, "logo");

    dispatch(
      updateVenue({
        backend,
        collectionDetails: {
          collection_args: venueData.collection_args,
          custodian: venueData.custodian,
        },
        venueId,
        updatedTitle: venueData.Title,
        updatedDescription: venueData.Description,
        eventDetails,
        capacity: parseInt(venueData.capacity),
        logo: venueData.logo,
        banner: venueData.banner,
        action: setIsModalOpen,
      })
    );

    // setIsModalOpen(false);
  };

  return (
    <form className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">
            Venue Name
          </label>
          <TextHint text="Update the name of the venue." />
        </div>
        <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border ">
          <input
            type="text"
            name="Title"
            value={venueData.Title}
            onChange={handleInputChange}
            className="my-3 outline-none w-full bg-transparent"
            required
          />
        </div>
      </div>
      {formErrors.title && (
        <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
      )}

      <div className="flex flex-col flex-auto gap-1">
        <div className="flex items-center gap-2">
          <label className="font-semibold">
            Description
          </label>
          <TextHint text="Update the description of the venue." />
        </div>
        <div className="border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
          <textarea
            name="Description"
            value={venueData.Description}
            onChange={handleInputChange}
            className="mt-3 outline-none w-full bg-transparent"
            rows={5}
            required
          ></textarea>
        </div>
      </div>
      {formErrors.description && (
        <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
      )}

      <div className="flex space-x-4">
        <div className="w-1/2 flex flex-col flex-auto gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">
              Start Date
            </label>
            <TextHint text="Update the start date of the venue." />
          </div>
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
          <div className="flex items-center gap-2">
            <label className="font-semibold">
              End Date
            </label>
            <TextHint text="Update the end date of the venue." />
          </div>
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

      <div className="flex space-x-4">
        <div className="w-1/2 flex flex-col flex-auto gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">
              Start Time
            </label>
            <TextHint text="Update the start time of the venue." />
          </div>
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
          <div className="flex items-center gap-2">
            <label className="font-semibold">
              End Time
            </label>
            <TextHint text="Update the end time of the venue." />
          </div>
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

      <div className="flex flex-col flex-auto gap-1">
        <div className="flex items-center gap-2">
          <label className="font-semibold">Location
          </label>
          <TextHint text="Update the location of the venue." />
        </div>
        <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
          <input
            type="text"
            name="Location"
            value={venueData.Details.Location}
            onChange={handleDetailsChange}
            className="my-3 outline-none w-full bg-transparent"
            required
          />
        </div>
      </div>
      {formErrors.Location && (
        <p className="text-red-500 text-sm mt-1">{formErrors.Location}</p>
      )}
      <div className="flex flex-col flex-auto gap-1">
        <div className="flex items-center gap-2">
          <label className="font-semibold">
            Maximum number of people
          </label>
          <TextHint text="Update the maximum number of people of the venue." />
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
      {formErrors.Capacity && (
        <p className="text-red-500 text-sm mt-1">{formErrors.Capacity}</p>
      )}

      <div className="flex space-x-4">
        <div className="w-1/2">
          <div className="flex items-center gap-2">
            <label className="font-semibold">
              Banner
            </label>
            <TextHint text="Update the banner image of the venue." />
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
              Update Banner
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
            <label className="font-semibold">
              Logo
            </label>
            <TextHint text="Update the logo image of the venue." />
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
              Update logo
            </label>
            {logoPreview && (
              <img
                src={logoPreview}
                alt="logo Preview"
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
      <div className="flex justify-end space-x-2">
        {/* <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button> */}
        <button
          //   type="submit"
          onClick={(e) => (createVenueLoader ? null : handleSubmit(e))}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${createVenueLoader
              ? "bg-gray-600"
              : "bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            }`}
        >
          {createVenueLoader ? "Updating..." : "Update Venue"}
        </button>
      </div>
    </form>
  );
};

export default UpdateVenueForm;
