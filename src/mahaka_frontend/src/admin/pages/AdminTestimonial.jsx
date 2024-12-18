import React from "react";

import CreateTestimonialForm from "../components/CreateTestimonialForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import { createWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Frame from "../../assets/images/Frame.png";
import { deleteTestimonial } from "../../redux/reducers/apiReducers/testimonialApiReducer";
import {
  HiArrowRightCircle,
  HiCheckBadge,
  HiChevronDown,
  HiChevronRight,
  HiChevronUp,
  // HiClock,
  HiMiniMapPin,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

const AdminTestimonial = () => {
  const dispatch = useDispatch();

  const { testimonials, testimonialLoading } = useSelector(
    (state) => state.testimonial
  );
  const { backend ,principal} = useSelector((state) => state.authentication);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const TestimonialCard = ({ testimonial, testimonialLoading }) => {
    return (
      <>
        <div className="flex flex-col p-8 shadow-lg rounded-lg bg-[#F9F9F9] dark:bg-slate-600">
          <img src={Frame} alt="frame" className="h-12 w-16 mb-4" />
          <p className="mb-4 text-2xl font-medium text-gray-700 text-justify dark:text-white">
            {testimonial?.title}
          </p>
          <p className="text-lg font-light text-gray-600 mt-12 dark:text-white">
            {testimonial?.location}
          </p>
          <p className="text-md text-gray-600 dark:text-white">
            {testimonial?.description}
          </p>
        </div>
      </>
    );
  };

  const onTestimonialDelete = () => {
    if (testimonials?.length > 0) {
      dispatch(
        deleteTestimonial({
          backend: backend,
          setDeleteModalVisible: setDeleteModalVisible,
        })
      );
    } else {
      setDeleteModalVisible(false);
    }
  };

  const SkeletonLoader = () => {
    return (
      <div className="animate-pulse flex flex-col p-4 bg-gray-400 rounded-xl shadow-md min-h-60">
        {/* title */}
        <div className="h-4 bg-gray-600 rounded w-1/3"></div>

        {/* Bottom section*/}
        <div className="space-y-2 mt-auto">
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2 "></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {deleteModalVisible && (
        <DeleteEventModal
          setDeleteModalVisible={setDeleteModalVisible}
          onTestimonialDelete={onTestimonialDelete}
        />
      )}
      <ModalOverlay
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Create New Testimonial"
      >
        <CreateTestimonialForm
          onClose={() => setIsModalOpen(false)}
          // onSuccess={() => fetchWahanas(selectedVenue)}
        />
      </ModalOverlay>

      <div className="dark relative flex-0 overflow-hidden bg-gray-800 px-4 py-8 sm:p-16">
        <svg
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 pointer-events-none"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
            className="text-gray-700 opacity-25"
          >
            <circle r="234" cx="196" cy="23"></circle>
            <circle r="234" cx="790" cy="491"></circle>
          </g>
        </svg>
        <div className="relative z-10 flex flex-col items-center text-text">
          <div className="text-xl font-semibold">MAHAKA'S</div>
          <div className="text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
            TESTIMONIAL
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col sm:flex-row bg-card p-7 justify-end items-center">
        {/* <div className="mt-4 border w-full sm:ml-4 sm:mt-0 sm:w-72 bg-card p-4 rounded-xl mr-auto">
                <div className="relative flex items-center flex-auto">
                  <div>
                    <HiOutlineMagnifyingGlass size={24} />
                  </div>
                  <div className="w-full mx-1">
                    <input
                      type="text"
                      placeholder="Search for Testimonials..."
                      className="outline-none bg-transparent w-full"
                     
                    />
                  </div>
                  <div className="ml-auto">
                    <HiArrowRightCircle
                      size={24}
                      className="cursor-pointer"
                     // onClick={handleSearch}
                    />
                  </div>
                </div>
              </div> */}
        <div>
          <div
            className="mt-8 sm:mt-0 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="bg-secondary px-7 py-2 rounded-full text-white mx-2 flex">
              Add Testimonial
            </div>
          </div>
        </div>

        <div>
          <div
            className="mt-8 sm:mt-0 mx-4 cursor-pointer"
            onClick={() => setDeleteModalVisible(true)}
          >
            <div className="bg-secondary px-7 py-2 rounded-full text-white md:min-w-full text-center">
              Clear Testimonial
            </div>
          </div>
        </div>
      </div>

      <div>
        {testimonialLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div> // Display a loading indicator
        ) : testimonials && testimonials?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial?.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 text-gray-600 text-3xl font-bold flex justify-center">
            No Testimonials Found
          </div> // Display a "No Testimonials" message
        )}
      </div>
    </div>
  );
};

export const DeleteEventModal = ({
  onTestimonialDelete,
  setDeleteModalVisible,
}) => {
  const { testimonialLoading } = useSelector((state) => state.testimonial);
  return (
    <div className="fixed inset-0 z-999 flex items-center rounded justify-center bg-black bg-opacity-50">
      <div className="bg-card p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl mb-4">
          Are you sure you want to Delete the Testimonials?
        </h2>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-xl mr-4"
            disabled={testimonialLoading}
            onClick={onTestimonialDelete}
          >
            {testimonialLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="px-4 py-2"
            onClick={() => setDeleteModalVisible(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonial;
