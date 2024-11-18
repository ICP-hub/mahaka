import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";
import TextHint from "../../customer/Components/TextHint";

const CreateWahanaForm = ({ onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { venues } = useSelector((state) => state.venues);
  const [formErrors, setFormErrors] = useState({});
  console.log("create wahana errors are", formErrors)
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    decimal: 8,
    totalSupply: 1000000,
    description: "",
    price: "",
    banner: {
      data: "",
      logo_type: "image",
    },
    venueId: "",
  });
  const [error, setError] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllVenues({ backend, pageLimit: 100, currPage: 0 }));
  }, [dispatch, backend]);

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


  
// validation form
const validateForm = () => {
  const errors = {};
console.log("create wahana errors are", errors)
  // Validate title
  if (!formData.name.trim()) {
    errors.name = "wahana title is required";
  }

  // Validate description
  if (!formData.description.trim()) {
    errors.description = "wahana description is required";
  }

  // Validte price
  if (!formData.price) {
    errors.price = "price is required";
  }

  // Validate banner image
  if (!formData.banner.data) {
    errors.banner = "wahana banner is required";
  }
  // if (!formData.banner.logo_type) {
  //   errors.logo = "Event logo is required";
  // }
 
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};



  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setError("");
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      banner: undefined,
    }));
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
      setFormData({
        ...formData,
        banner: { data: blob, logo_type: file.type },
      });// Set the banner preview
      setBannerPreview(URL.createObjectURL(processedFile));

      // Reading the image as an ArrayBuffer for backend submission
    } catch (error) {
      setError("Error processing image. Please try again.");
      console.error("Error processing image:", error);
    }
  }
};

  const handleCreateWahana = async (e) => {
    e.preventDefault();
    // setIsSubmitting(true);
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(
        createWahana({
          backend,
          venueId: formData.venueId,
          ...formData,
        })
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating wahana:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleInputChange = (e) => {
    console.log("input change is",e.target.value)
    const { name, value } = e.target;
    const updatedValue = name === "price" ? Number(value) : value;
    console.log("input change is",value)
    setFormData((prevState) => ({
      ...prevState,
      [name]:  updatedValue,
    }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };


  

  return (
    <div>
      <div className="space-y-4">
        {/* Select Venue */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Select Venue </label>
            <TextHint text="Select the venue for which wahana needs to be created." />
            </div>
          <select
            value={formData.venueId}
            onChange={(e) =>
              setFormData({ ...formData, venueId: e.target.value })
            }
            className="border border-border rounded-lg px-4 py-2 bg-card"
            required
          >
            <option value="" disabled>
              Select a venue
            </option>
            {venues?.map((venue) => (
              <option className="bg-card" key={venue.id} value={venue.id}>
                {venue.Title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col flex-auto gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Wahana Name </label>
            <TextHint text="Enter the name of the wahana." />
            </div>
          <div 
           className={`border ${formErrors.name ? "border-red-500" : "border-border"
           } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
             
              onChange = {handleInputChange }
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
          {formErrors.name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
        )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Description </label>
            <TextHint text="Enter the description of the wahana." />
            </div>
          <div 
           className={`border ${formErrors.description ? "border-red-500" : "border-border"
           } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
          >
         
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange = {handleInputChange }
              className="mt-3 outline-none w-full bg-transparent"
              required
            />
            
          </div>
          {formErrors.description && (
          <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>)}
         
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Price (IDR)</label>
            <TextHint text="Enter the price of the wahana." />
            </div>
          <div
           className={`border ${formErrors.description ? "border-red-500" : "border-border"
           } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
          >
            <input
              value={formData.price}
              name = "price"
              type ="number"
              // onChange={(e) =>
              //   setFormData({ ...formData, price: parseInt(e.target.value) })
              // }
              onChange = {handleInputChange }
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
          {formErrors.price && (
          <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>)}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Banner </label>
            <TextHint text="Upload the image of the wahana." />
            </div>
          <div className={`flex flex-col items-center justify-center border border-gray-300 p-4 rounded ${formErrors.banner?"border-red-500":"border-border"}`}>
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
              className="cursor-pointer bg-gray-100 text-gray-800 py-2 px-4 rounded-md border border-gray-300"
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
         {formErrors.banner && (
          <p className="text-red-500 text-sm mt-1">{formErrors.banner}</p>)} 
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-full"
          onClick={handleCreateWahana}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Wahana"}
        </button>
      </div>
    </div>
  );
};

export default CreateWahanaForm;
