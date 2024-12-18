import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createTestimonial } from "../../redux/reducers/apiReducers/testimonialApiReducer";
import flatpickr from "flatpickr";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
import { Principal } from "@dfinity/principal";
import TextHint from "../../customer/Components/TextHint";

const createTestimonialForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { backend, principal } = useSelector((state) => state.authentication);

  // const { venues } = useSelector((state) => state.venues);
  const [formErrors, setFormErrors] = useState({});
  //console.log("create banner errors are", formErrors)

  // const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [testimonialData, setTestimonialData] = useState({
    title: "",
    location: "",
    description: "",
  });

  const validateForm = () => {
    // Check if all required fields are filled
    const errors = {};
    if (!testimonialData.title) {
      errors.title = "testimonial title is required";
    }
    if (!testimonialData.description) {
      errors.description = "description is required";
    }
    if (!testimonialData.location) {
      errors.location = "location is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    //  console.log("input change is",e.target.value)
    const { name, value } = e.target;
    // console.log("input change name  is",name)
    const updatedValue = value;
    // console.log("input change is",value)
    setTestimonialData((prevState) => ({
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

  const handleCreateTestimonial = async (e) => {
    console.log("submit is triggered", testimonialData);
    e.preventDefault();
    //  setIsSubmitting(true);
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(
        createTestimonial({
          backend,
          user: principal,
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
    <>
      <div>
        <div className="space-y-4">
          <div className="flex flex-col flex-auto gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Testimonial Name </label>
              <TextHint text="Enter the name of the Testimonial." />
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

          {/* redirect url */}
          <div className="flex flex-col flex-auto gap-1">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Location</label>
              <TextHint text="Enter the Location." />
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
              <label className="font-semibold">Description </label>
              <TextHint text="Enter the description of the testimonial." />
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
            onClick={handleCreateTestimonial}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Testimonial"}
          </button>
        </div>
      </div>
    </>
  );
};

export default createTestimonialForm;
