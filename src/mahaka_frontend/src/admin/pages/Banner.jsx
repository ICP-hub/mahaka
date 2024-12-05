import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CreateBannerForm from "../components/CreateBannerForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import { createWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllBanners,
  clearAllAttractionBanners,
} from "../../redux/reducers/apiReducers/bannerApiReducer";
import { deleteBannerByImage } from "../../redux/reducers/apiReducers/bannerApiReducer";
import { MdDelete } from "react-icons/md";

const AdminBanner = () => {
  const dispatch = useDispatch();
  const { attractionbanners, attractionBannerLoading, banners, bannerLoading } =
    useSelector((state) => state.banner);
  const { backend } = useSelector((state) => state.authentication);
  console.log("Attraction Banners in baner:", attractionbanners);
  console.log("Third Party Banners in banner:", banners);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteSingleModalVisible, setDeleteSingleModalVisible] =
    useState(false);
  const [bannerDelete, setBannerDelete] = useState([]);
  const [singleBannerDelete, setSingleBannerDelete] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("delete category in banner.jsx", bannerDelete.category);

  const confirmDeleteBannerByImage = (singleBannerDelete) => {
    console.log("single banner delete", singleBannerDelete);

    dispatch(deleteBannerByImage({ backend, image: singleBannerDelete }));
    setDeleteSingleModalVisible(false); // Close the modal
  };

  const delete_banner = () => {
    // console.log("handle delete",selectedWahana)

    setDeleteModalVisible(true);
  };

  const confirmDeleteBanner = (bannerDelete) => {
    const categoryKey = Object.keys(bannerDelete?.category || {})[0]; // Get the first key of the category object

    if (categoryKey === "Attraction") {
      dispatch(clearAllAttractionBanners({ backend })); // For Attraction category
    } else {
      dispatch(clearAllBanners({ backend }));
    } // For ThirdParty category
    setDeleteModalVisible(false); // Close the modal
  };

  // if (bannerLoading) return <Loader />;

  return (
    <>
      <div>
        {/* single banner delete modal */}

        {deleteSingleModalVisible && (
          <div className="fixed inset-0 z-50 flex items-center rounded justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl mb-4">
                Are you sure you want to delete this banner?
              </h2>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-full mr-4"
                  onClick={() => confirmDeleteBannerByImage(singleBannerDelete)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-full"
                  onClick={() => setDeleteSingleModalVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteModalVisible && (
          <div className="fixed inset-0 z-50 flex items-center rounded justify-center bg-black bg-opacity-50">
            <div className="bg-card p-6 rounded shadow-lg">
              {/* select category */}
              <div className="flex flex-col gap-1 min-w-100">
                <div className="flex items-center gap-2">
                  <label className="font-semibold">Select Category </label>
                  {/* <TextHint text="Select the category for banner." /> */}
                </div>
                <select
                  value={
                    Object.keys(
                      bannerDelete?.category || { ThirdParty: null }
                    )[0]
                  } // Extracting the key from the category object
                  onChange={(e) =>
                    setBannerDelete({
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

              <div className="flex justify-end mt-10">
                <button
                  className="bg-red-600 text-white px-4 py-2 mr-4 rounded-full"
                  onClick={() => confirmDeleteBanner(bannerDelete)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-full"
                  onClick={() => setDeleteModalVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
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
            <div className="text-xl font-semibold">MAHAKA</div>
            <div className="text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
              BANNERS
            </div>
          </div>
        </div>

        <div className="flex w-full sm:flex-row bg-card p-7 justify-end items-center">
          <button className="mt-8 sm:mt-0 mr-4" onClick={() => delete_banner()}>
            <div className="bg-secondary px-3 py-2 rounded-full text-white">
              Clear Banners
            </div>
          </button>

          <button className="mt-8 sm:mt-0" onClick={() => setIsModalOpen(true)}>
            <div className="bg-secondary px-3 py-2 rounded-full text-white">
              + Add Banner
            </div>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {attractionBannerLoading ? (
            <Loader />
          ) : (
            <div className=" ">
              {/* First Section */}
              {attractionbanners?.length === 0 ? (
                <div>
                  <h1 className="text-2xl font-bold mx-3 flex justify-center text-gray-500 shadow-lg p-4 rounded-lg">
                    NO Attraction Banners
                  </h1>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 justify-start flex">
                    Attraction Banners
                  </h2>
                  {attractionbanners.map((banner, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-50 rounded-full p-4 hover:shadow-md transition-shadow duration-300"
                    >
                      <img
                        src={banner.image}
                        alt="banner"
                        className="h-16 w-16 rounded-full object-cover object-center border border-blue-600 "
                      />
                      <h3 className="ml-4 text-xl font-semibold text-gray-700">
                        {banner.title}
                      </h3>
                      {/* <div
                        className="ml-auto"
                        onClick={() => setSingleBannerDelete(banner.image)}
                      >
                        <button
                          className="ml-auto"
                          onClick={() => setDeleteSingleModalVisible(true)}
                        >
                          {" "}
                          <MdDelete size={25} />
                        </button>
                      </div> */}
                    </div>
                  ))}
                  {/* <div className = "flex justify-end">
     <button className = "bg-blue-500 p-3 rounded-lg  my-2 text-white">Delete</button>
     </div> */}
                </div>
              )}

              {/* Second Section */}
            </div>
          )}
          {bannerLoading ? (
            <div>
              <Loader />
            </div>
          ) : banners.length === 0 ? (
            <div>
              <h1 className="text-2xl font-bold mx-3 flex justify-center text-gray-500 shadow-lg p-4 rounded-lg">
                NO ThirdParty Banners
              </h1>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 justify-start flex">
                ThirdParty Banners
              </h2>
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 rounded-full p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={banner.image}
                    alt="banner"
                    className="h-16 w-16 rounded-full object-cover border border-blue-600"
                  />
                  <h3 className="ml-4 text-lg font-semibold text-gray-700">
                    {banner.title}
                  </h3>
                  {/* <div
                    className="ml-auto"
                    onClick={() => setSingleBannerDelete(banner.image)}
                  >
                    <button
                      className="ml-auto"
                      onClick={() => setDeleteSingleModalVisible(true)}
                    >
                      <MdDelete size={25} />
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          )}
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
  );
};

const Loader = () => {
  return (
    <div className=" ">
      <SkeletonLoader />
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="p-6 bg-gray-300 rounded-lg shadow-md w-full min-w-70 mx-auto">
      {/* <div className="bg-gray-500 h-5 w-[80%] rounded my-3"></div> */}

      {Array(4)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-4 rounded-full shadow-sm mb-4 last:mb-0"
          >
            {/* Left Image */}
            <div className="h-16 w-16 bg-gray-200 rounded-full border text-gray-500 flex-shrink-0"></div>

            {/* Right Heading */}

            <div className="bg-gray-200 h-5 w-[50%] rounded-md  mx-3"></div>
          </div>
        ))}
    </div>
  );
};

export default AdminBanner;
