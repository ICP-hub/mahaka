import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/reducers/apiReducers/eventApiReducer";
import flatpickr from "flatpickr";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
import TextHint from "../../customer/Components/TextHint";
import { Principal } from "@dfinity/principal";
import notificationManager from "../../common/utils/notificationManager";
import {
  FormFieldDate,
  FormFieldImageUpload,
  FormFieldInput,
  FormFieldOptions,
  FormFieldTextArea,
  FormFieldTime,
} from "../../common/components/InputComponents";

// Image to blob function
function imageToFileBlob(imageFile) {
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
}

// Convert to timestamp date and time
const convertToTimestamp = (date, time) => {
  const dateTime = new Date(`${date}T${time}`);
  return Math.floor(dateTime.getTime() / 1000);
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main component
/* ----------------------------------------------------------------------------------------------------- */
const CreateEventForm = ({ setIsModalOpen }) => {
  const { venues } = useSelector((state) => state.venues);
  const { backend, principal } = useSelector((state) => state.authentication);
  const { createEventLoader } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  // Select venue, event title, event description, start date,start time, end date, end time, location, general ticket limit, student ticket limit, vip ticket limit, event banner, event logo
  const [formValues, setFormValues] = useState({
    venueId: "",
    title: "",
    description: "",
    location: "",
    generalTicketLimit: "",
    studentTicketLimit: "",
    vipTicketLimit: "",
    generalTicketPrice: "",
    studentTicketPrice: "",
    vipTicketPrice: "",
    banner: null,
    logo: null,
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  // Handle value changes
  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = async (name, file) => {
    const imageBlob = await imageToFileBlob(file);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: imageBlob,
    }));
  };

  const handleEventSubmit = () => {
    // no principal return
    if (!principal) {
      notificationManager.error("Please login first");
      return;
    }
    const isFormValid = Object.values(formValues).every(
      (value) => value !== "" && value !== null
    );
    if (!isFormValid) {
      notificationManager.error(
        "Please check all the fields before proceeding"
      );
      return;
    }
    // time stamps
    const startTimestamp = convertToTimestamp(
      formValues.startDate,
      formValues.startTime
    );
    const endTimestamp = convertToTimestamp(
      formValues.endDate,
      formValues.endTime
    );

    dispatch(
      createEvent({
        closeModal: () => setIsModalOpen(false),
        backend,
        id: formValues.venueId,
        record: {
          id: "",
          venueId: formValues.venueId,
          title: formValues.title,
          creator: Principal.fromText(principal),
          sTicket_limit: parseInt(formValues.studentTicketLimit),
          description: formValues.description,
          logo: {
            data: formValues.logo,
            logo_type: "png",
          },
          banner: {
            data: formValues.banner,
            logo_type: "png",
          },
          details: {
            StartDate: startTimestamp,
            StartTime: startTimestamp,
            Location: formValues.location,
            EndDate: endTimestamp,
            EndTime: endTimestamp,
          },
          gTicket_limit: parseInt(formValues.generalTicketLimit),
          vTicket_limit: parseInt(formValues.studentTicketLimit),
        },
        collection_args: {
          collection_args: {
            maxLimit: 100,
            logo: {
              data: formValues.logo,
              logo_type: "png",
            },
            name: formValues.title,
            banner: {
              data: formValues.banner,
              logo_type: "png",
            },
            description: formValues.description,
            created_at: Date.now(),
            collection_type: { Event: null },
            symbol: formValues.title,
            sTicket_price: parseInt(formValues.studentTicketPrice),
            gTicket_price: parseInt(formValues.generalTicketPrice),
            vTicket_price: parseInt(formValues.vipTicketPrice),
            sTicket_limit: parseInt(formValues.studentTicketLimit),
            gTicket_limit: parseInt(formValues.generalTicketLimit),
            vTicket_limit: parseInt(formValues.vipTicketLimit),
          },
        },
      })
    );
  };

  return (
    <div className="flex flex-col space-y-8 py-4">
      <FormFieldOptions
        label="Choose a venue"
        value={formValues.venueId}
        onChange={(value) => handleInputChange("venueId", value)}
        optionInit="Select a venue"
        options={venues}
      />
      <FormFieldInput
        type="text"
        label="Event title"
        value={formValues.title}
        onChange={(value) => handleInputChange("title", value)}
      />
      <FormFieldTextArea
        label="Event Description"
        value={formValues.description}
        onChange={(value) => handleInputChange("description", value)}
      />
      <FormFieldInput
        type="text"
        label="Location"
        value={formValues.location}
        onChange={(value) => handleInputChange("location", value)}
      />

      <div className="grid grid-cols-2 gap-4">
        {" "}
        <FormFieldDate
          label="Start Date"
          value={formValues.startDate}
          onChange={(value) => handleInputChange("startDate", value)}
        />
        <FormFieldTime
          label="Start Time"
          value={formValues.startTime}
          onChange={(value) => handleInputChange("startTime", value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormFieldDate
          label="End Date"
          value={formValues.endDate}
          onChange={(value) => handleInputChange("endDate", value)}
          minDate={formValues.startDate}
        />
        <FormFieldTime
          label="End Time"
          value={formValues.endTime}
          onChange={(value) => handleInputChange("endTime", value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4">
        <FormFieldInput
          type="number"
          label="General ticket limit"
          value={formValues.generalTicketLimit}
          onChange={(value) => handleInputChange("generalTicketLimit", value)}
        />
        <FormFieldInput
          type="number"
          label="Student ticket limit"
          value={formValues.studentTicketLimit}
          onChange={(value) => handleInputChange("studentTicketLimit", value)}
        />
        <FormFieldInput
          type="number"
          label="VIP ticket limit"
          value={formValues.vipTicketLimit}
          onChange={(value) => handleInputChange("vipTicketLimit", value)}
        />
      </div>
      {/* price */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4">
        <FormFieldInput
          type="number"
          label="General ticket price"
          value={formValues.generalTicketPrice}
          onChange={(value) => handleInputChange("generalTicketPrice", value)}
        />
        <FormFieldInput
          type="number"
          label="Student ticket price"
          value={formValues.studentTicketPrice}
          onChange={(value) => handleInputChange("studentTicketPrice", value)}
        />
        <FormFieldInput
          type="number"
          label="VIP ticket price"
          value={formValues.vipTicketPrice}
          onChange={(value) => handleInputChange("vipTicketPrice", value)}
        />
      </div>
      <FormFieldImageUpload
        label="Banner"
        image={formValues.banner}
        onChange={(file) => handleImageChange("banner", file)}
      />
      <FormFieldImageUpload
        label="Logo"
        image={formValues.logo}
        onChange={(file) => handleImageChange("logo", file)}
      />

      <div className="flex justify-end w-full">
        <button
          className="bg-indigo-600 px-4 py-2 rounded-md"
          disabled={createEventLoader}
          onClick={handleEventSubmit}
        >
          {createEventLoader ? "Creating event..." : "Create event"}
        </button>
      </div>
    </div>
  );
};

export default CreateEventForm;

// const CreateEventForm = ({
//   setIsModalOpen,
//   venueId,
//   venueTitle,
//   venueStartDate,
//   venueEndDate,
// }) => {
//   const dispatch = useDispatch();
//   const { backend } = useSelector((state) => state.authentication);
//   const { loading, createEventLoader } = useSelector((state) => state.events);
//   const { principal } = useSelector((state) => state.authentication);

//   const [error, setError] = useState("");
//   const [formErrors, setFormErrors] = useState({});
//   useEffect(() => {
//     console.log("venueId:", venueId);
//   }, [venueId]);
//   const [logoPreview, setLogoPreview] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [eventData, setEventData] = useState({
//     title: "",
//     collection_args: {
//       maxLimit: 0,
//       logo: {
//         data: "",
//         logo_type: "",
//       },
//       name: "",
//       banner: {
//         data: "",
//         logo_type: "",
//       },
//       description: "",
//       created_at: Date.now(),
//       collection_type: "Event",
//       symbol: "",
//       sTicket_price: 25,
//       gTicket_price: 50,
//       vTicket_price: 30,
//       sTicket_limit: "",
//       gTicket_limit: "",
//       vTicket_limit: "",
//     },
//     eventDetails: {
//       StartDate: "",
//       StartTime: 0,
//       Location: "",
//       EndDate: "",
//       EndTime: 0,
//     },
//   });

//   const validateForm = () => {
//     const errors = {};

//     // Validate title
//     if (!eventData.title.trim()) {
//       errors.title = "Event title is required";
//     }

//     // Validate description
//     if (!eventData.collection_args.description.trim()) {
//       errors.description = "Event description is required";
//     }

//     // Validate dates and times
//     if (!eventData.eventDetails.StartDate) {
//       errors.StartDate = "Start date is required";
//     }
//     if (!eventData.eventDetails.EndDate) {
//       errors.EndDate = "End date is required";
//     }
//     if (!eventData.eventDetails.StartTime) {
//       errors.StartTime = "Start time is required";
//     }
//     if (!eventData.eventDetails.EndTime) {
//       errors.EndTime = "End time is required";
//     }

//     // Validate location
//     if (!eventData.eventDetails.Location.trim()) {
//       errors.Location = "Location is required";
//     }

//     // Validate ticket limits
//     if (!eventData.collection_args.gTicket_limit) {
//       errors.gTicket_limit = "General ticket limit is required";
//     }
//     if (!eventData.collection_args.sTicket_limit) {
//       errors.sTicket_limit = "Student ticket limit is required";
//     }
//     if (!eventData.collection_args.vTicket_limit) {
//       errors.vTicket_limit = "VIP ticket limit is required";
//     }

//     // Validate banner image
//     if (!eventData.collection_args.banner.data) {
//       errors.banner = "Event banner is required";
//     }
//     if (!eventData.collection_args.logo.data) {
//       errors.logo = "Event logo is required";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const [bannerPreview, setBannerPreview] = useState(null);

//   const startDateRef = useRef(null);
//   const endDateRef = useRef(null);
//   const startTimeRef = useRef(null);
//   const endTimeRef = useRef(null);

//   useEffect(() => {
//     const formatDate = (date) => {
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       return `${year}-${month}-${day}`;
//     };
//     const convertBigIntToDate = (dateValue) => {
//       if (typeof dateValue === "bigint") {
//         return new Date(Number(dateValue));
//       } else if (dateValue) {
//         return new Date(dateValue);
//       }
//       return "";
//     };

//     const minDate = convertBigIntToDate(venueStartDate);
//     const maxDate = convertBigIntToDate(venueEndDate);

//     if (minDate) {
//       minDate.setHours(0, 0, 0, 0);
//     }
//     if (maxDate) {
//       maxDate.setHours(23, 59, 59, 999);
//     }

//     const startDatePicker = flatpickr(startDateRef.current, {
//       dateFormat: "Y-m-d",
//       minDate: minDate,
//       maxDate: maxDate,
//       onChange: (selectedDates) => {
//         const newStartDate = selectedDates[0]
//           ? formatDate(selectedDates[0])
//           : "";
//         setStartDate(newStartDate);
//         setEventData((prev) => ({
//           ...prev,
//           eventDetails: { ...prev.eventDetails, StartDate: newStartDate },
//         }));
//         if (newStartDate) {
//           setFormErrors((prev) => ({ ...prev, StartDate: "" }));
//         }
//         if (endDateRef.current._flatpickr) {
//           endDateRef.current._flatpickr.set("minDate", newStartDate);
//         }
//       },
//       required: true,
//       disable: [
//         function (date) {
//           const normalizedDate = new Date(date);
//           normalizedDate.setHours(0, 0, 0, 0);

//           const normalizedMin = minDate && new Date(minDate);
//           if (normalizedMin) normalizedMin.setHours(0, 0, 0, 0);

//           const normalizedMax = maxDate && new Date(maxDate);
//           if (normalizedMax) normalizedMax.setHours(0, 0, 0, 0);
//           return (
//             (normalizedMin && normalizedDate < normalizedMin) ||
//             (normalizedMax && normalizedDate > normalizedMax)
//           );
//         },
//       ],
//     });
//     const endDatePicker = flatpickr(endDateRef.current, {
//       dateFormat: "Y-m-d",
//       minDate: startDate || minDate,
//       maxDate: maxDate,
//       onChange: (selectedDates) => {
//         const newEndDate = selectedDates[0] ? formatDate(selectedDates[0]) : "";
//         setEventData((prev) => ({
//           ...prev,
//           eventDetails: { ...prev.eventDetails, EndDate: newEndDate },
//         }));
//         if (newEndDate) {
//           setFormErrors((prev) => ({ ...prev, EndDate: "" }));
//         }
//       },
//       required: true,
//       disable: [
//         function (date) {
//           const normalizedDate = new Date(date);
//           normalizedDate.setHours(0, 0, 0, 0);

//           const normalizedMin = minDate && new Date(minDate);
//           if (normalizedMin) normalizedMin.setHours(0, 0, 0, 0);

//           const normalizedMax = maxDate && new Date(maxDate);
//           if (normalizedMax) normalizedMax.setHours(0, 0, 0, 0);

//           const normalizedStart = startDate ? new Date(startDate) : "";
//           if (normalizedStart) normalizedStart.setHours(0, 0, 0, 0);

//           return (
//             (normalizedMin && normalizedDate < normalizedMin) ||
//             (normalizedMax && normalizedDate > normalizedMax) ||
//             (normalizedStart && normalizedDate < normalizedStart)
//           );
//         },
//       ],
//     });

//     flatpickr(startTimeRef.current, {
//       enableTime: true,
//       noCalendar: true,
//       dateFormat: "H:i",
//       onChange: (selectedDates) => {
//         const newStartTime = selectedDates[0]
//           ? selectedDates[0].getHours() * 60 + selectedDates[0].getMinutes()
//           : 0;
//         setEventData((prev) => ({
//           ...prev,
//           eventDetails: {
//             ...prev.eventDetails,
//             StartTime: newStartTime.toString(),
//           },
//         }));
//         if (newStartTime) {
//           setFormErrors((prev) => ({ ...prev, StartTime: "" }));
//         }
//       },
//       required: true,
//     });

//     flatpickr(endTimeRef.current, {
//       enableTime: true,
//       noCalendar: true,
//       dateFormat: "H:i",
//       onChange: (selectedDates) => {
//         const newEndTime = selectedDates[0]
//           ? selectedDates[0].getHours() * 60 + selectedDates[0].getMinutes()
//           : 0;
//         setEventData((prev) => ({
//           ...prev,
//           eventDetails: {
//             ...prev.eventDetails,
//             EndTime: newEndTime.toString(),
//           },
//         }));
//         if (newEndTime) {
//           setFormErrors((prev) => ({ ...prev, EndTime: "" }));
//         }
//       },
//       required: true,
//     });

//     // Cleanup
//     return () => {
//       startDatePicker.destroy();
//       endDatePicker.destroy();
//     };
//   }, [venueStartDate, venueEndDate, startDate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Handle ticket limit fields
//     if (name.includes("Ticket_limit")) {
//       const updatedValue = parseInt(value);

//       // Validate input (optional but recommended)
//       if (updatedValue < 0) {
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: "Ticket limit cannot be negative",
//         }));
//         return;
//       }

//       setEventData((prevState) => ({
//         ...prevState,
//         collection_args: {
//           ...prevState.collection_args,
//           [name]: updatedValue,
//         },
//       }));

//       // Clear errors for ticket limit fields if value is valid
//       if (formErrors[name]) {
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: undefined,
//         }));
//       }
//       return;
//     }

//     // Rest of the handleInputChange function remains the same...
//     // Handle nested collection_args fields
//     if (
//       name === "description" ||
//       name === "maxLimit" ||
//       name === "symbol" ||
//       name === "name" ||
//       name.includes("Ticket_price")
//     ) {
//       let updatedValue = value;

//       // Handle maxLimit as number
//       if (name === "maxLimit") {
//         updatedValue = parseInt(value) || 0;
//       }

//       // Handle ticket prices as number
//       if (name.includes("Ticket_price")) {
//         updatedValue = parseFloat(value) || 0;
//       }

//       setEventData((prevState) => ({
//         ...prevState,
//         collection_args: {
//           ...prevState.collection_args,
//           [name]: updatedValue,
//         },
//       }));

//       // Clear errors for nested fields
//       if (formErrors[name]) {
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: undefined,
//         }));
//       }
//     } else if (name.includes("Location") || name === "title") {
//       // Handle top-level fields and eventDetails fields
//       if (name === "Location") {
//         setEventData((prevState) => ({
//           ...prevState,
//           eventDetails: {
//             ...prevState.eventDetails,
//             Location: value,
//           },
//         }));
//       } else {
//         setEventData((prevState) => ({
//           ...prevState,
//           [name]: value,
//         }));
//       }

//       // Clear errors for these fields
//       if (formErrors[name]) {
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: undefined,
//         }));
//       }
//     }
//   };

//   const imageToFileBlob = (imageFile) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         resolve(reader.result);
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//       reader.readAsDataURL(imageFile);
//     });
//   };
//   const resizeImage = (file) => {
//     return new Promise((resolve) => {
//       const maxSize = 200 * 1024; // 200KB

//       // Create image element to load the file
//       const img = new Image();
//       img.src = URL.createObjectURL(file);

//       img.onload = () => {
//         // Create canvas
//         const canvas = document.createElement("canvas");
//         let width = img.width;
//         let height = img.height;

//         // Calculate new dimensions while maintaining aspect ratio
//         const aspectRatio = width / height;

//         // Start with original dimensions
//         let quality = 0.7;
//         canvas.width = width;
//         canvas.height = height;

//         // Draw image on canvas
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, width, height);

//         // Function to convert canvas to file
//         const getCanvasBlob = (quality) => {
//           return new Promise((resolve) => {
//             canvas.toBlob(
//               (blob) => {
//                 resolve(blob);
//               },
//               file.type,
//               quality
//             );
//           });
//         };

//         // Recursively reduce quality until file size is under maxSize
//         const reduceSize = async (currentQuality) => {
//           const blob = await getCanvasBlob(currentQuality);

//           if (blob.size <= maxSize || currentQuality <= 0.1) {
//             // Convert blob to file
//             const resizedFile = new File([blob], file.name, {
//               type: file.type,
//             });
//             resolve(resizedFile);
//           } else {
//             // Reduce quality and try again
//             await reduceSize(currentQuality - 0.1);
//           }
//         };

//         reduceSize(quality);
//       };
//     });
//   };

//   const handleFileChange2 = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         let processedFile = file;
//         const maxSize = 200 * 1024; // 200KB

//         // Check if file needs resizing
//         if (file.size > maxSize) {
//           processedFile = await resizeImage(file);
//         }

//         // Convert the processed file to blob
//         const blob = await imageToFileBlob(processedFile);

//         // Update state with the blob
//         setEventData((prevState) => ({
//           ...prevState,
//           collection_args: {
//             ...prevState.collection_args,
//             logo: {
//               data: blob,
//               logo_type: file.type,
//             },
//           },
//         }));
//         // Set the banner preview
//         setLogoPreview(URL.createObjectURL(processedFile));
//       } catch (error) {
//         setError("Error processing image. Please try again.");
//         console.error("Error processing image:", error);
//       }
//     }
//   };
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         let processedFile = file;
//         const maxSize = 200 * 1024; // 200KB

//         // Check if file needs resizing
//         if (file.size > maxSize) {
//           processedFile = await resizeImage(file);
//         }

//         // Convert the processed file to blob
//         const blob = await imageToFileBlob(processedFile);

//         // Update state with the blob
//         setEventData((prevState) => ({
//           ...prevState,
//           collection_args: {
//             ...prevState.collection_args,
//             banner: {
//               data: blob,
//               logo_type: file.type,
//             },
//           },
//         }));
//         // Set the banner preview
//         setBannerPreview(URL.createObjectURL(processedFile));
//       } catch (error) {
//         setError("Error processing image. Please try again.");
//         console.error("Error processing image:", error);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return;
//     }
//     if (!venueId) {
//       console.error("Venue ID is missing");
//       return;
//     }
//     const fullVenueId = venueId;
//     const Id = Principal.fromText(
//       "h7yxq-n6yb2-6js2j-af5hk-h4inj-edrce-oevyj-kbs7a-76kft-vrqrw-nqe"
//     );
//     console.log(fullVenueId, "venue id");
//     const startDateTimestamp = new Date(
//       eventData.eventDetails.StartDate
//     ).getTime();
//     const endDateTimestamp = new Date(eventData.eventDetails.EndDate).getTime();

//     const startTimeInMinutes = parseInt(eventData.eventDetails.StartTime, 10);
//     const endTimeInMinutes = parseInt(eventData.eventDetails.EndTime, 10);

//     const startTimeInNanoseconds = startTimeInMinutes * 60 * 1000000000;
//     const endTimeInNanoseconds = endTimeInMinutes * 60 * 1000000000;
//     try {
//       await dispatch(
//         createEvent({
//           backend,
//           id: fullVenueId,
//           record: {
//             id: "",
//             venueId: fullVenueId,
//             title: eventData.title,
//             creator: Id,
//             sTicket_limit: eventData.collection_args.sTicket_limit,
//             description: eventData.collection_args.description,
//             logo: {
//               data: eventData.collection_args.logo.data,
//               logo_type: eventData.collection_args.logo.logo_type,
//             },
//             banner: {
//               data: eventData.collection_args.banner.data,
//               logo_type: eventData.collection_args.banner.logo_type,
//             },
//             details: {
//               StartDate: startDateTimestamp,
//               StartTime: startTimeInNanoseconds,
//               Location: eventData.eventDetails.Location,
//               EndDate: endDateTimestamp,
//               EndTime: endTimeInNanoseconds,
//             },
//             gTicket_limit: eventData.collection_args.gTicket_limit,
//             vTicket_limit: eventData.collection_args.vTicket_limit,
//           },
//           collection_args: {
//             collection_args: {
//               maxLimit: eventData.collection_args.maxLimit,
//               logo: {
//                 data: eventData.collection_args.logo.data,
//                 logo_type: eventData.collection_args.logo.logo_type,
//               },
//               name: eventData.collection_args.name,
//               banner: {
//                 data: eventData.collection_args.banner.data,
//                 logo_type: eventData.collection_args.banner.logo_type,
//               },
//               description: eventData.collection_args.description,
//               created_at: eventData.collection_args.created_at,
//               collection_type: { Event: null },
//               symbol: eventData.collection_args.symbol,
//               sTicket_price: eventData.collection_args.sTicket_price,
//               gTicket_price: eventData.collection_args.gTicket_price,
//               vTicket_price: eventData.collection_args.vTicket_price,
//               sTicket_limit: eventData.collection_args.sTicket_limit,
//               gTicket_limit: eventData.collection_args.gTicket_limit,
//               vTicket_limit: eventData.collection_args.vTicket_limit,
//             },
//           },
//         })
//       );

//       setIsModalOpen(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getInputClassName = (fieldName) => {
//     return `my-3 outline-none w-full bg-transparent ${
//       formErrors[fieldName] ? "border-red-500" : ""
//     }`;
//   };

//   return (
//     <form className="space-y-4 tracking-wider">
//       {/* Event Title */}
//       <div>
//         <div className="flex items-center gap-2">
//           <label className="font-semibold">Event Title</label>
//           <TextHint text="Enter the title of the event." />
//         </div>
//         <div
//           className={`border ${
//             formErrors.title ? "border-red-500" : "border-border"
//           } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//         >
//           <input
//             type="text"
//             name="title"
//             value={eventData.title}
//             onChange={handleInputChange}
//             className={getInputClassName("title")}
//             placeholder="Event title"
//             required
//           />
//         </div>
//         {formErrors.title && (
//           <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
//         )}
//       </div>

//       {/* Event Description */}
//       <div>
//         <div className="flex items-center gap-2">
//           <label className="font-semibold">Event Description</label>
//           <TextHint text="Enter the description of the event." />
//         </div>
//         <div
//           className={`border ${
//             formErrors.description ? "border-red-500" : "border-border"
//           } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//         >
//           <textarea
//             name="description"
//             rows={5}
//             value={eventData.collection_args.description}
//             onChange={handleInputChange}
//             className={getInputClassName("description")}
//             placeholder="Event description"
//             required
//           />
//         </div>
//         {formErrors.description && (
//           <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
//         )}
//       </div>

//       {/* Event Dates */}
//       <div className="flex space-x-4">
//         <div className="w-1/2 flex flex-col flex-auto gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Start Date</label>
//             <TextHint text="Enter the start date of the event." />
//           </div>
//           <div
//             className={`flex items-center border ${
//               formErrors.StartDate ? "border-red-500" : "border-border"
//             } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//           >
//             <input
//               ref={startDateRef}
//               className={getInputClassName("StartDate")}
//               required
//             />
//             <FcCalendar size={24} />
//           </div>
//           {formErrors.StartDate && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.StartDate}</p>
//           )}
//         </div>

//         <div className="w-1/2 flex flex-col flex-auto gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">End Date</label>
//             <TextHint text="Enter the end date of the event." />
//           </div>
//           <div
//             className={`flex items-center border ${
//               formErrors.EndDate ? "border-red-500" : "border-border"
//             } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//           >
//             <input
//               ref={endDateRef}
//               className={getInputClassName("EndDate")}
//               required
//             />
//             <FcCalendar size={24} />
//           </div>
//           {formErrors.EndDate && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.EndDate}</p>
//           )}
//         </div>
//       </div>

//       {/* Event Times */}
//       <div className="flex space-x-4">
//         <div className="w-1/2 flex flex-col flex-auto gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Start Time</label>
//             <TextHint text="Enter the start time of the event." />
//           </div>
//           <div
//             className={`flex items-center border ${
//               formErrors.StartTime ? "border-red-500" : "border-border"
//             } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//           >
//             <input
//               ref={startTimeRef}
//               className={getInputClassName("StartTime")}
//               required
//             />
//             <FcAlarmClock size={24} />
//           </div>
//           {formErrors.StartTime && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.StartTime}</p>
//           )}
//         </div>
//         <div className="w-1/2 flex flex-col flex-auto gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">End Time</label>
//             <TextHint text="Enter the end time of the event." />
//           </div>
//           <div
//             className={`flex items-center border ${
//               formErrors.EndTime ? "border-red-500" : "border-border"
//             } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//           >
//             <input
//               ref={endTimeRef}
//               className={getInputClassName("EndTime")}
//               required
//             />
//             <FcAlarmClock size={24} />
//           </div>
//           {formErrors.EndTime && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.EndTime}</p>
//           )}
//         </div>
//       </div>

//       {/* Location */}
//       <div>
//         <div className="flex items-center gap-2">
//           <label className="font-semibold">Location</label>
//           <TextHint text="Enter the location of the event." />
//         </div>
//         <div
//           className={`border ${
//             formErrors.Location ? "border-red-500" : "border-border"
//           } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//         >
//           <input
//             type="text"
//             name="Location"
//             value={eventData.eventDetails.Location}
//             onChange={(e) =>
//               setEventData((prev) => ({
//                 ...prev,
//                 eventDetails: {
//                   ...prev.eventDetails,
//                   Location: e.target.value,
//                 },
//               }))
//             }
//             className={getInputClassName("Location")}
//             placeholder="Event location"
//             required
//           />
//         </div>
//         {formErrors.Location && (
//           <p className="text-red-500 text-sm mt-1">{formErrors.Location}</p>
//         )}
//       </div>

//       {/* Ticket Limits */}
//       <div className="flex space-x-4">
//         <div className="w-1/3">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold text-sm">
//               General Ticket Limit
//             </label>
//             <TextHint text="Enter the General Ticket Limit of the event." />
//           </div>
//           <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
//             <input
//               type="number"
//               name="gTicket_limit"
//               value={eventData.collection_args.gTicket_limit}
//               onChange={handleInputChange}
//               className="my-3 outline-none w-full bg-transparent"
//               required
//             />
//           </div>
//           {formErrors.gTicket_limit && (
//             <p className="text-red-500 text-sm mt-1">
//               {formErrors.gTicket_limit}
//             </p>
//           )}
//         </div>
//         <div className="w-1/3">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold text-sm">
//               Student Ticket Limit
//             </label>
//             <TextHint text="Enter the Student Ticket Limit of the event." />
//           </div>
//           <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
//             <input
//               type="number"
//               name="sTicket_limit"
//               value={eventData.collection_args.sTicket_limit}
//               onChange={handleInputChange}
//               className="my-3 outline-none w-full bg-transparent"
//               required
//             />
//           </div>
//           {formErrors.sTicket_limit && (
//             <p className="text-red-500 text-sm mt-1">
//               {formErrors.sTicket_limit}
//             </p>
//           )}
//         </div>
//         <div className="w-1/3">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold text-sm">VIP Ticket Limit</label>
//             <TextHint text="Enter the VIP Ticket Limit of the event." />
//           </div>
//           <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
//             <input
//               type="number"
//               name="vTicket_limit"
//               value={eventData.collection_args.vTicket_limit}
//               onChange={handleInputChange}
//               className="my-3 outline-none w-full bg-transparent"
//               required
//             />
//           </div>
//           {formErrors.vTicket_limit && (
//             <p className="text-red-500 text-sm mt-1">
//               {formErrors.vTicket_limit}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Event Image */}
//       <div className="flex space-x-4">
//         <div className="w-1/2">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Event Banner</label>
//             <TextHint text="Upload the Banner of the event." />
//           </div>
//           <div className="mt-1 flex flex-col items-center justify-center border-dashed border-2 border-border p-4 rounded-lg">
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png"
//               onChange={handleFileChange}
//               className="hidden"
//               id="upload-image1"
//               required
//             />
//             <label
//               htmlFor="upload-image1"
//               className="cursor-pointer bg-card text-text py-2 px-4 rounded-md border border-border"
//             >
//               Upload Image
//             </label>
//             {bannerPreview && (
//               <img
//                 src={bannerPreview}
//                 alt="Banner Preview"
//                 className="mt-2 w-full h-auto rounded"
//                 style={{
//                   maxWidth: "96px",
//                   maxHeight: "96px",
//                   minWidth: "96px",
//                   minHeight: "96px",
//                 }}
//               />
//             )}
//             {/* <p className="text-sm text-gray-500 mt-2">JPEG, PNG less than 5MB</p> */}
//           </div>
//           {formErrors.banner && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.banner}</p>
//           )}
//         </div>
//         <div className="w-1/2">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Event Logo</label>
//             <TextHint text="Upload the logo of the event." />
//           </div>
//           <div className="mt-1 flex flex-col items-center justify-center border-dashed border-2 border-border p-4 rounded-lg">
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png"
//               onChange={handleFileChange2}
//               className="hidden"
//               id="upload-image"
//               required
//             />
//             <label
//               htmlFor="upload-image"
//               className="cursor-pointer bg-card text-text py-2 px-4 rounded-md border border-border"
//             >
//               Upload Image
//             </label>
//             {logoPreview && (
//               <img
//                 src={logoPreview}
//                 alt="Banner Preview"
//                 className="mt-2 w-full h-auto rounded"
//                 style={{
//                   maxWidth: "96px",
//                   maxHeight: "96px",
//                   minWidth: "96px",
//                   minHeight: "96px",
//                 }}
//               />
//             )}
//             {/* <p className="text-sm text-gray-500 mt-2">JPEG, PNG less than 5MB</p> */}
//           </div>
//           {formErrors.logo && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.logo}</p>
//           )}
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end space-x-2">
//         {/* <button
//           type="button"
//           onClick={() => (loading ? null : setIsModalOpen(false))}
//           className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Cancel
//         </button> */}
//         <button
//           className={`text-white py-2 px-4 rounded ${
//             createEventLoader ? "bg-gray-600" : "bg-secondary"
//           }`}
//           disabled={createEventLoader}
//           onClick={(e) => (createEventLoader ? null : handleSubmit(e))}
//         >
//           {createEventLoader ? "Creating Event..." : "Create Event"}
//         </button>
//       </div>

//       {/* Error Message */}
//       {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
//     </form>
//   );
// };

// export default CreateEventForm;
