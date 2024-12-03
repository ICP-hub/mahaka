import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addBanner } from "../../redux/reducers/apiReducers/bannerApiReducer";
import flatpickr from "flatpickr";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
import { Principal } from "@dfinity/principal";
import TextHint from "../../customer/Components/TextHint";

const CreateBannerForm = ({ onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);

  // const { venues } = useSelector((state) => state.venues);
  const [formErrors, setFormErrors] = useState({});
  //console.log("create banner errors are", formErrors)

  const [error, setError] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const [bannerData, setBannerData] = useState({
    title: "",
    redirectUrl: "",
    description: "",
    category: { ThirdParty: null },
    image: "",
  });

  console.log("banner data is", bannerData);

  const validateForm = () => {
    // Check if all required fields are filled
    const errors = {};
    if (!bannerData.title) {
      errors.title = "Banner title is required";
    }
    if (!bannerData.redirectUrl) {
      errors.redirectUrl = "redirect url is required";
    }
    if (!bannerData.description) {
      errors.description = "Banner description is required";
    }
    if (!bannerData.image) {
      errors.image = "Banner Image is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setError("");
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          image: undefined,
        }));

        let processedFile = file;
        const maxSize = 200 * 1024; // 200KB

        // Resize the file if needed
        if (file.size > maxSize) {
          processedFile = await resizeImage(file);
        }

        // Convert the file to Base64 for backend
        const blob = await imageToFileBlob(processedFile);

        // Update form state
        setBannerData({
          ...bannerData,
          image: blob, // Base64 image for backend
        });

        // Update the preview
        setBannerPreview(URL.createObjectURL(processedFile));
      } catch (error) {
        setError("Error processing image. Please try again.");
        console.error("Error processing image:", error);
      }
    }
  };

  //

  const handleCreateBanner = async (e) => {
    console.log("submit is triggered", bannerData);
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(
        addBanner({
          backend,
          title: bannerData.title,
          redirectUrl: bannerData.redirectUrl,
          description: bannerData.description,
          category: bannerData.category,
          image: bannerData.image,
        })
      ).unwrap();

      onClose();
      console.log("Banner created successfully:");
    } catch (error) {
      console.error("Error creating banner:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    //  console.log("input change is",e.target.value)
    const { name, value } = e.target;
    // console.log("input change name  is",name)
    const updatedValue = value;
    // console.log("input change is",value)
    setBannerData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  return (
    <>
      <div>
        <div className="space-y-4">
          <div className="flex flex-col flex-auto gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Banner Name </label>
              <TextHint text="Enter the name of the banner." />
            </div>
            <div
              className={`border 
            rounded-lg px-4 ${
              formErrors.title ? "border-red-500" : "border-border"
            } focus-within:border-indigo-600 dark:focus-within:border-border`}
            >
              <input
                type="text"
                name="title"
                value={bannerData.title}
                onChange={handleInputChange}
                className="my-3 outline-none w-full bg-transparent"
                required
              />
            </div>
            {formErrors.title && (
              <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
            )}
          </div>

          {/* redirect url */}
          <div className="flex flex-col flex-auto gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Redirect URL</label>
              <TextHint text="Enter the Redirect URL." />
            </div>
            <div
              className={`border 
            rounded-lg px-4 ${
              formErrors.redirectUrl ? "border-red-500" : "border-border"
            } focus-within:border-indigo-600 dark:focus-within:border-border`}
            >
              <input
                type="text"
                name="redirectUrl"
                value={bannerData.redirectUrl}
                onChange={handleInputChange}
                className="my-3 outline-none w-full bg-transparent"
                required
              />
            </div>
            {formErrors.redirectUrl && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.redirectUrl}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Description </label>
              <TextHint text="Enter the description of the banner." />
            </div>
            <div
              className={`border ${
                formErrors.description ? "border-red-500" : "border-border"
              } rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border`}
            >
              <textarea
                type="text"
                name="description"
                rows={5}
                value={bannerData.description}
                onChange={handleInputChange}
                className="mt-3 outline-none w-full bg-transparent"
                required
              />
            </div>
            {formErrors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.description}
              </p>
            )}
          </div>

          {/* category */}

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Select Category </label>
              <TextHint text="Select the category for banner." />
            </div>
            <select
              value={Object.keys(bannerData.category)[0]} // Extracting the key from the category object
              onChange={(e) =>
                setBannerData({
                  ...bannerData,
                  category:
                    e.target.value === "ThirdParty"
                      ? { ThirdParty: null }
                      : { Attraction: null },
                })
              }
              className="border border-border rounded-lg px-4 py-2 bg-card"
              required
            >
              <option value="ThirdParty">ThirdParty</option>
              <option value="Attraction">Attraction</option>
            </select>
          </div>

          {/* banner section */}

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Banner </label>
              <TextHint text="Upload the image for the banner." />
            </div>
            <div
              className={`flex flex-col items-center justify-center border border-gray-300 py-4 rounded ${
                formErrors.image ? "border-red-500" : "border-border"
              }`}
            >
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
                  className="mt-2 w-full h-auto"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "96px",
                    minWidth: "96px",
                    minHeight: "96px",
                  }}
                />
              )}
            </div>
            {formErrors.image && (
              <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>
            )}
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
            onClick={handleCreateBanner}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Banner"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateBannerForm;
