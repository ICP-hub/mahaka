import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTestimonial } from "../../redux/reducers/apiReducers/testimonialApiReducer";
import { Principal } from "@dfinity/principal";
import TextHint from "../../customer/Components/TextHint";

const CreateTestimonialForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { backend, principal } = useSelector((state) => state.authentication);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [testimonialData, setTestimonialData] = useState({
    title: "",
    location: "",
    description: "",
    principal: "",
  });

  const [wordCount, setWordCount] = useState(0); // Track word count for description

  const validateForm = () => {
    const errors = {};
    if (!testimonialData.title) {
      errors.title = "Testimonial title is required";
    }
    if (!testimonialData.description) {
      errors.description = "Description is required";
    } else if (wordCount > 100) {
      errors.description = "Description must be 100 words or less";
    }
    if (!testimonialData.location) {
      errors.location = "Location is required";
    }
    if (!testimonialData.principal) {
      errors.principal = "Principal is required";
    } else {
      try {
        Principal.fromText(testimonialData.principal);
      } catch {
        errors.principal = "Invalid Principal format";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      const words = value.trim().split(/\s+/); // Split description into words
      if (words.length > 100) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          description: "Description must be 100 words or less",
        }));
        return; // Prevent input beyond 100 words
      }
      setWordCount(words.length); // Update word count
    }

    setTestimonialData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleCreateTestimonial = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(
        createTestimonial({
          backend,
          user: testimonialData.principal,
          title: testimonialData.title,
          location: testimonialData.location,
          description: testimonialData.description,
        })
      ).unwrap();

      onClose();
      console.log("Testimonial created successfully:");
    } catch (error) {
      console.error("Error creating testimonial:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        {/* Testimonial Title */}
        <div className="flex flex-col flex-auto gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Testimonial Title</label>
            <TextHint text="Enter the name of the testimonial." />
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
              value={testimonialData.title}
              onChange={handleInputChange}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
          {formErrors.title && (
            <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col flex-auto gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Location</label>
            <TextHint text="Enter the location." />
          </div>
          <div
            className={`border 
            rounded-lg px-4 ${
              formErrors.location ? "border-red-500" : "border-border"
            } focus-within:border-indigo-600 dark:focus-within:border-border`}
          >
            <input
              type="text"
              name="location"
              value={testimonialData.location}
              onChange={handleInputChange}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
          {formErrors.location && (
            <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Description</label>
            <TextHint text="Enter the description of the testimonial (100 words max)." />
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
              value={testimonialData.description}
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
          <p className="text-sm text-gray-500 mt-1">{wordCount}/100 words</p>
        </div>

        {/* Principal */}
        <div className="flex flex-col flex-auto gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Principal</label>
            <TextHint text="Enter the Principal ID." />
          </div>
          <div
            className={`border 
            rounded-lg px-4 ${
              formErrors.principal ? "border-red-500" : "border-border"
            } focus-within:border-indigo-600 dark:focus-within:border-border`}
          >
            <input
              type="text"
              name="principal"
              value={testimonialData.principal}
              onChange={handleInputChange}
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
          {formErrors.principal && (
            <p className="text-red-500 text-sm mt-1">{formErrors.principal}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-full"
          onClick={handleCreateTestimonial}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Testimonial"}
        </button>
      </div>
    </div>
  );
};

export default CreateTestimonialForm;
