import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/reducers/apiReducers/eventApiReducer";
import TextHint from "../../customer/Components/TextHint";
import { Principal } from "@dfinity/principal";
import notificationManager from "../../common/utils/notificationManager";
import { motion } from "framer-motion";

import {
  FormFieldDate,
  FormFieldImageUpload,
  FormFieldInput,
  FormFieldOptions,
  FormFieldTextArea,
  FormFieldTime,
} from "../../common/components/InputComponents";
import { createWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";

// Image to blob function
export function imageToFileBlob(imageFile) {
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
export const convertToTimestamp = (date, time) => {
  const dateTime = new Date(`${date}T${time}`);
  return Math.floor(dateTime.getTime() / 1000);
};

const FEATURED_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main component
/* ----------------------------------------------------------------------------------------------------- */
const CreateWahanaForm = ({ setIsModalOpen, venueIdentity }) => {
  const { venues } = useSelector((state) => state.venues);
  const { backend, principal } = useSelector((state) => state.authentication);
  const { createWahanaLoader } = useSelector((state) => state.wahana);
  const dispatch = useDispatch();
  // Select venue, event title, event description, start date,start time, end date, end time, location, general ticket limit, student ticket limit, vip ticket limit, event banner, event logo
  const [formValues, setFormValues] = useState({
    venueId: venueIdentity ? venueIdentity : "",
    title: "",
    description: "",
    // location: "",
    // priceICP: "",
    priceIDR: "",
    banner: null,
    // startDate: "",
    // startTime: "",
    // endDate: "",
    // endTime: "",
    totalSupply: "",
    isFeatured: false,
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

  const handleWahanSubmit = () => {
    // no principal return
    // if (!principal) {
    //   notificationManager.error("Please login first");
    //   return;
    // }
    const isFormValid = Object.values(formValues).every(
      (value) => value !== "" && value !== null
    );
    if (!isFormValid) {
      notificationManager.error(
        "Please check all the fields before proceeding"
      );
      return;
    }
    // // time stamps
    // const startTimestamp = convertToTimestamp(
    //   formValues.startDate,
    //   formValues.startTime
    // );
    // const endTimestamp = convertToTimestamp(
    //   formValues.endDate,
    //   formValues.endTime
    // );

    const wahanaData = {
      venueId: formValues.venueId,
      symbol: formValues.title,
      title: formValues.title,
      decimal: 8,
      totalSupply: parseInt(formValues.totalSupply),
      description: formValues.description,
      // priceICP: parseInt(formValues.priceICP),
      priceIDR: parseInt(formValues.priceIDR),
      isFeatured: formValues.isFeatured,
      banner: {
        data: formValues.banner,
        logo_type: "png",
      },
      // details: {
      // StartDate: startTimestamp,
      // StartTime: startTimestamp,
      // Location: formValues.location,
      // EndDate: endTimestamp,
      // EndTime: endTimestamp,
      // },
    };

    dispatch(createWahana({ backend: backend, wahanaData, setIsModalOpen }));
  };

  return (
    <div className="flex flex-col space-y-8 py-4">
      {!venueIdentity && (
        <FormFieldOptions
          label="Choose a venue"
          value={formValues.venueId}
          onChange={(value) => handleInputChange("venueId", value)}
          optionInit="Select a venue"
          options={venues}
        />
      )}
      <FormFieldInput
        type="text"
        label="Wahana title"
        value={formValues.title}
        onChange={(value) => handleInputChange("title", value)}
      />
      <FormFieldTextArea
        label="Wahana Description"
        value={formValues.description}
        onChange={(value) => handleInputChange("description", value)}
      />
      {/* <FormFieldInput
        type="text"
        label="Location"
        value={formValues.location}
        onChange={(value) => handleInputChange("location", value)}
      /> */}

      {/* <div className="grid grid-cols-2 gap-4">
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
      </div> */}

      <FormFieldInput
        type="number"
        label="Total Tickets"
        value={formValues.totalSupply}
        onChange={(value) => handleInputChange("totalSupply", value)}
      />

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormFieldInput
          type="number"
          label="Ticket Price(ICP)"
          value={formValues.priceICP}
          onChange={(value) => handleInputChange("priceICP", value)}
        /> */}
      <FormFieldInput
        type="number"
        label="Ticket Price(IDR)"
        value={formValues.priceIDR}
        onChange={(value) => handleInputChange("priceIDR", value)}
      />
      {/* </div> */}
      <FormFieldImageUpload
        label="Banner"
        image={formValues.banner}
        onChange={(file) => handleImageChange("banner", file)}
      />

      {/* Featured */}
      <div className="flex flex-col space-y-1">
        <div>Featured</div>
        <div className="relative flex w-fit items-center rounded-full">
          <button
            className={`${FEATURED_CLASSES} ${
              formValues.isFeatured && "text-white"
            }`}
            onClick={() => {
              handleInputChange("isFeatured", true);
            }}
          >
            <span className="relative z-10">Yes</span>
          </button>
          <button
            className={`${FEATURED_CLASSES} ${
              !formValues.isFeatured && "text-white"
            }`}
            onClick={() => {
              handleInputChange("isFeatured", false);
            }}
          >
            <span className="relative z-10">No</span>
          </button>
          <div
            className={`absolute inset-0 z-0 flex ${
              !formValues.isFeatured ? "justify-end" : "justify-start"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", damping: 15, stiffness: 250 }}
              className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full">
        <button
          className="bg-indigo-600 px-4 py-2 rounded-md text-white"
          disabled={createWahanaLoader}
          onClick={handleWahanSubmit}
        >
          {createWahanaLoader ? "Creating wahana..." : "Create wahana"}
        </button>
      </div>
    </div>
  );
};

export default CreateWahanaForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { createWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
// import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";
// import TextHint from "../../customer/Components/TextHint";

// const CreateWahanaForm = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const { backend } = useSelector((state) => state.authentication);
//   const { venues } = useSelector((state) => state.venues);
//   const [formErrors, setFormErrors] = useState({});
//   console.log("create wahana errors are", formErrors);
//   const [isToggled, setIsToggled] = useState(false);
//   console.log("logging wahana toggle", isToggled);

//   const handleToggle = () => {
//     setIsToggled((prevState) => !prevState);
//   };
//   const [formData, setFormData] = useState({
//     name: "",
//     symbol: "waha",
//     decimal: 8,
//     totalSupply: 1000000,
//     description: "",
//     price: "",
//     priceFiat: "",
//     featured: isToggled,
//     banner: {
//       data: "",
//       logo_type: "image",
//     },
//     venueId: "",

//     details: {
//       StartDate: 44,
//       StartTime: 44,
//       Location: "hyd",
//       EndDate: 44,
//       EndTime: 44,
//     },
//   });
//   const [error, setError] = useState("");
//   const [bannerPreview, setBannerPreview] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     dispatch(getAllVenues({ backend, pageLimit: 100, currPage: 0 }));
//   }, [dispatch, backend]);

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

//   // validation form
//   const validateForm = () => {
//     const errors = {};
//     console.log("create wahana errors are", errors);
//     // Validate title
//     if (!formData.name.trim()) {
//       errors.name = "wahana title is required";
//     }

//     // Validate description
//     if (!formData.description.trim()) {
//       errors.description = "wahana description is required";
//     }

//     // Validte price
//     if (!formData.price) {
//       errors.price = "price is required";
//     }
//     // price in Fiat currency
//     if (!formData.priceFiat) {
//       errors.priceFiat = "price is required";
//     }

//     // Validate banner image
//     if (!formData.banner.data) {
//       errors.banner = "wahana banner is required";
//     }
//     // if (!formData.banner.logo_type) {
//     //   errors.logo = "Event logo is required";
//     // }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     setError("");
//     setFormErrors((prevErrors) => ({
//       ...prevErrors,
//       banner: undefined,
//     }));
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
//         setFormData({
//           ...formData,
//           banner: { data: blob, logo_type: file.type },
//         }); // Set the banner preview
//         setBannerPreview(URL.createObjectURL(processedFile));

//         // Reading the image as an ArrayBuffer for backend submission
//       } catch (error) {
//         setError("Error processing image. Please try again.");
//         console.error("Error processing image:", error);
//       }
//     }
//   };

//   const handleCreateWahana = async (e) => {
//     e.preventDefault();
//     // setIsSubmitting(true);
//     if (!validateForm()) {
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       await dispatch(
//         createWahana({
//           backend,
//           venueId: formData.venueId,
//           ...formData,
//           featured: isToggled,
//         })
//       );

//       onClose();
//     } catch (error) {
//       console.error("Error creating wahana:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     console.log("input change is", value);

//     // Ensure that priceFiat is a valid number, or fallback to 0
//     const updatedValue =
//       name === "priceFiat"
//         ? value === ""
//           ? 0
//           : parseFloat(value) // If empty, set as 0
//         : name === "price"
//         ? value === ""
//           ? 0
//           : Number(value) // If empty, set as 0 for price
//         : value; // For other fields, just keep the value as is

//     console.log("Updated value is", updatedValue);

//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: updatedValue,
//     }));

//     if (formErrors[name]) {
//       setFormErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: undefined, // Clear any existing error for this field
//       }));
//     }
//   };

//   return (
//     <div>
//       <div className="space-y-4">
//         {/* Select Venue */}
//         <div className="flex flex-col gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Select Venue </label>
//             <TextHint text="Select the venue for which wahana needs to be created." />
//           </div>
//           <select
//             value={formData.venueId}
//             onChange={(e) =>
//               setFormData({ ...formData, venueId: e.target.value })
//             }
//             className="border border-border rounded-lg px-4 py-2 bg-card"
//             required
//           >
//             <option value="" disabled>
//               Select a venue
//             </option>
//             {venues?.map((venue) => (
//               <option className="bg-card" key={venue.id} value={venue.id}>
//                 {venue.Title}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex flex-col flex-auto gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Wahana Name </label>
//             <TextHint text="Enter the name of the wahana." />
//           </div>
//           <div
//             className={`border ${
//               formErrors.name ? "border-red-500" : "border-border"
//             } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//           >
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="my-3 outline-none w-full bg-transparent"
//               required
//             />
//           </div>
//           {formErrors.name && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
//           )}
//         </div>

//         <div className="flex flex-col gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Description </label>
//             <TextHint text="Enter the description of the wahana." />
//           </div>
//           <div
//             className={`border ${
//               formErrors.description ? "border-red-500" : "border-border"
//             } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//           >
//             <textarea
//               name="description"
//               rows={5}
//               value={formData.description}
//               onChange={handleInputChange}
//               className="mt-3 outline-none w-full bg-transparent"
//               required
//             />
//           </div>
//           {formErrors.description && (
//             <p className="text-red-500 text-sm mt-1">
//               {formErrors.description}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Price (IDR)</label>
//             <TextHint text="Enter the price of the wahana." />
//           </div>
//           <div
//             className={`border ${
//               formErrors.description ? "border-red-500" : "border-border"
//             } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//           >
//             <input
//               value={formData.price}
//               name="price"
//               type="number"
//               // onChange={(e) =>
//               //   setFormData({ ...formData, price: parseInt(e.target.value) })
//               // }
//               onChange={handleInputChange}
//               className="my-3 outline-none w-full bg-transparent"
//               required
//             />
//           </div>
//           {formErrors.price && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
//           )}
//         </div>

//         {/* price in Fiat currency */}

//         <div className="flex flex-col gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Price (FIAT)</label>
//             <TextHint text="Enter the price of the wahana." />
//           </div>
//           <div
//             className={`border ${
//               formErrors.priceFiat ? "border-red-500" : "border-border"
//             } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
//           >
//             <input
//               value={formData.priceFiat || ""}
//               type="number"
//               name="priceFiat"
//               step="0.01"
//               // onChange={(e) =>
//               //   setFormData({ ...formData, price: parseInt(e.target.value) })
//               // }
//               onChange={handleInputChange}
//               className="my-3 outline-none w-full bg-transparent"
//               required
//             />
//           </div>
//           {formErrors.priceFiat && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.priceFiat}</p>
//           )}
//         </div>

//         <div className="flex flex-col gap-1">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Banner </label>
//             <TextHint text="Upload the image of the wahana." />
//           </div>
//           <div
//             className={`flex flex-col items-center justify-center border border-gray-300 p-4 rounded ${
//               formErrors.banner ? "border-red-500" : "border-border"
//             }`}
//           >
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png"
//               className="hidden"
//               id="upload-image"
//               onChange={handleFileChange}
//               required
//             />
//             <label
//               htmlFor="upload-image"
//               className="cursor-pointer bg-gray-100 text-gray-800 py-2 px-4 rounded-md border border-gray-300"
//             >
//               Upload Banner
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
//           </div>
//           {formErrors.banner && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.banner}</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-5">
//         <div className="flex">
//           <label className="font-semibold mr-2">Featured </label>
//           <TextHint text="Upload the image of the wahana." />
//         </div>
//         <div
//           onClick={handleToggle}
//           className={`relative w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors my-2 duration-300 ${
//             isToggled ? "bg-orange-500" : "bg-gray-500"
//           }`}
//         >
//           <div
//             className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
//               isToggled ? "translate-x-6" : "translate-x-0"
//             }`}
//           ></div>
//         </div>
//       </div>

//       <div className="flex justify-end mt-6 space-x-4">
//         <button
//           className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full"
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-4 py-2 bg-orange-500 text-white rounded-full"
//           onClick={handleCreateWahana}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Creating..." : "Create Wahana"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateWahanaForm;
