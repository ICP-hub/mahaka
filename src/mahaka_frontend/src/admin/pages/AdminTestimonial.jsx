import React from "react";

import CreateTestimonialForm from "../components/CreateTestimonialForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import { createWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllBanners } from "../../redux/reducers/apiReducers/bannerApiReducer";


const AdminTestimonial = ()=>{
    const dispatch = useDispatch()
  const {  attractionbanners, banners ,  bannerLoading} = useSelector((state) => state.banner);
  const { backend } = useSelector((state) => state.authentication);
  console.log("Attraction Banners in baner:", attractionbanners);
  console.log("Third Party Banners in banner:", banners);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [bannerDelete, setBannerDelete] = useState([]);
 const [isModalOpen, setIsModalOpen] = useState(false);
 





    return (
        <div>





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


        <div className="flex w-full sm:flex-row bg-card p-7 justify-end items-center">

  <button
    className="mt-8 sm:mt-0"
    onClick={() => setIsModalOpen(true)}
  >
    <div className="bg-secondary px-3 py-2 rounded-full text-white">
      + Add Testimonial
    </div>
  </button>
</div>

        </div>
    )
}

export default AdminTestimonial;