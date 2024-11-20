import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CreateBannerForm from "../components/CreateBannerForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import { createWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminBanner = ()=>{

    const [isModalOpen, setIsModalOpen] = useState(false);
console.log("modal open in banner.jsx",isModalOpen)


    return(
        <>
      <div>
        <h1 className = "text-4xl text-gray-800 mx-4 my-3 font-bold">Banner</h1>
        <div className="flex w-full max-w-xs flex-col justify-center sm:max-w-none sm:flex-row bg-white p-7">
          
          
          <div className="px-4 mt-4 sm:ml-4 sm:mt-0 sm:w-72 min-h-12 lg:min-w-[80%] md:min-w-[55%] rounded-full border border-border flex items-center bg-card text-icon">
            <HiMagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Search banners"
              className=" bg-transparent outline-none ml-4 lg:w-1000px"
              search= ""
              // setSearchInput = {setSearchInput}
            //   onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <button className="mt-8 sm:ml-auto sm:mt-0 mr-4" onClick = {()=>setIsModalOpen(true)}>
            <div className="inline-flex items-center align-middle bg-secondary px-3 py-2 rounded-full text-white" >
              + Add Banner
            </div>
          </button>
        </div>


        <ModalOverlay
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title="Create New Banner"
        >
          <CreateBannerForm
            onClose={() => setIsModalOpen(false)}
            // onSuccess={() => fetchWahanas(selectedVenue)}
          />
        </ModalOverlay>
        


      </div>
        </>
    )
}

export default AdminBanner;