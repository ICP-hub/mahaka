import React, { useState, useEffect, useMemo  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import { ImSpinner9 } from "react-icons/im";
import { getAllWahanasbyVenue } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { HiOutlineSelector } from "react-icons/hi";
import {
  getAllWahanas,
  setPage,
} from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { searchWahanas } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { deleteWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
// import { getWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import CreateWahanaForm from "../components/CreateWahanaForm";
import EditWahanaForm from "../components/EditWahanaForm";
import wahanaDummy1 from "../../assets/images/Frame10.png";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import {
  createStaggerContainer,
  createStaggerVariant,
} from "../../common/animationVariants";
// import wahanaDummy2 from "../../assets/images/Frame11.png";
// import wahanaDummy3 from "../../assets/images/Frame7.png";
// import wahanaDummy4 from "../../assets/images/Frame8.png";
// import { FaRupiahSign } from "react-icons/fa6";

// const wahanaData = [
//   {
//     id: 1,
//     title: "Wahana One",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit sunt aut explicabo magnam rem! Ipsam, enim. Ipsum cupiditate quo vero.",
//     price: 6,
//     event: "Event One",
//     image: wahanaDummy1,
//   },
//   {
//     id: 2,
//     title: "Wahana Two",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit sunt aut explicabo magnam rem! Ipsam, enim. Ipsum cupiditate quo vero.",
//     price: 8,
//     event: "Event Two",
//     image: wahanaDummy2,
//   },
//   {
//     id: 3,
//     title: "Wahana Three",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit sunt aut explicabo magnam rem! Ipsam, enim. Ipsum cupiditate quo vero.",
//     price: 10,
//     event: "Event Three",
//     image: wahanaDummy3,
//   },
//   {
//     id: 4,
//     title: "Wahana Four",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit sunt aut explicabo magnam rem! Ipsam, enim. Ipsum cupiditate quo vero.",
//     price: 12,
//     event: "Event Four",
//     image: wahanaDummy4,
//   },
// ];

const AdminWahana = () => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { wahanas, loading, currentPage, wahanasPerPage, totalPages, wahanaByVenue } =
    useSelector((state) => state.wahana);
  console.log("logging the  wahanas are", wahanas);
  console.log("logging the  wahanas by venue are", wahanaByVenue);
  const { venues } = useSelector((state) => state.venues);

 // const [selectedVenue, setSelectedVenue] = useState(null);
  //console.log("selected venue option is ", selectedVenue.option);
  const [selectedWahana, setSelectedWahana] = useState(null);
  //console.log("logging the selected wahana is", selectedWahana);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
 // console.log("edit modal open", editModalOpen);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteWahanaId, setDeleteWahanaId] = useState(null);
  const [deleteVenueId, setDeleteVenueId] = useState(null);
  const [wahanaDescription, setWahanaDescription] = useState("");
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState({
    option: "All",
    id: "",
  });

  const toggleOptionMenu = () => setIsOptionMenuOpen((pv) => !pv);
  const handleSelectOption = (option, id) => {
    setSelectedVenue((pv) => ({ ...pv, option: option, id: id }));
    setIsOptionMenuOpen(false);
  };


  
 // console.log("search wahanas is", searchInput);
  // const [editModalOpen, setEditModalOpen] = useState(false);

  // console.log("selected venue is",selectedVenue)

  useEffect(() => {
    if (searchInput) {
      dispatch(
        searchWahanas({
          backend,
          searchText: searchInput,
          chunkSize: 10,
          pageNo: 0,
        })
      );
    }
    //  else {
    //   dispatch(getAllWahanas({ backend, chunkSize: 3, pageNo: page - 1 }));
    // }
  }, [searchInput]);

  
  const filteredWahanas = useMemo(() => {
    if (selectedVenue.option === "All") {
      return wahanas;
    } else {
      return wahanaByVenue;
    }
  }, [selectedVenue, wahanas, wahanaByVenue]);

  useEffect(() => {
    if (selectedVenue.option !== "All") {
      fetchWahanas(selectedVenue);
      // setPage(page-1)
    } 
    // else {
    //   dispatch(getAllWahanas({ backend, chunkSize: 10, pageNo: 0 }));
    // }
  }, [selectedVenue, page]);

  // page sets to 1 when venue is selected
  // useEffect(() => {
  //   if (selectedVenue) {
  //     setPage(1);
  //   }
  // }, [selectedVenue]);

  const fetchWahanas = (selectedVenue) => {
    dispatch(
      getAllWahanasbyVenue({
        backend,
        chunkSize: 10,
        pageNo: 0,
        venueId: selectedVenue.id,
      })
    );
  };

  const handleDescription = (description) => {
   // console.log("wahana description is ", description);

    setDescriptionModal(true);
    setWahanaDescription(description);
  };

  const closeDescription = () => {
    setDescriptionModal(false);
  };

  

  const delete_Wahana = (wahanaId, venueId) => {
    // console.log("handle delete",selectedWahana)

    setDeleteWahanaId(wahanaId);
    setDeleteVenueId(venueId);
    setDeleteModalVisible(true);
  };

  const confirmDeleteWahana = () => {
   // console.log("handle delete ids are", deleteWahanaId);
    //console.log("handle delete ids are", deleteVenueId);
    dispatch(deleteWahana({ backend, deleteVenueId, deleteWahanaId }));
    setDeleteModalVisible(false); // Close the modal
  };
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  

  const containerVariants = createStaggerContainer(0.4);
  const cardVariants = createStaggerVariant(0.3);
  return (
    <div className=" flex flex-auto flex-col relative min-h-screen">
      {descriptionModal && (
        <div className="fixed inset-0 z-40 min-h-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg min-h-50 min-w-80 lg:min-h-50 lg:max-w-100 mx-4 overflow-y-auto">
            <div className="flex">
              <h1 className="text-gray-900 text-3xl mb-2 font-md">
                Description
              </h1>
              <div
                onClick={closeDescription}
                className="ml-auto flex justify-end hover:opacity-100 opacity-75"
              >
                <IoCloseCircle size={35} />
              </div>
            </div>
            <p className="text-lg text-slate-500">{wahanaDescription}</p>
          </div>
        </div>
      )}

      {/* delete modal */}
      {deleteModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center rounded justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">
              Are you sure you want to delete this wahana?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 mr-4 rounded-full"
                onClick={() => confirmDeleteWahana()}
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

      <div className="absolute inset-0 flex min-w-0 flex-col overflow-y-auto">
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
              Wahana
            </div>
          </div>
        </div>

        <WahanaMain
          wahanaData={filteredWahanas }
          venues={venues}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
          onCreateClick={() => setIsModalOpen(true)}
          loading={loading}
          onEditClick={() => setEditModalOpen(true)}
          setSelectedWahana={setSelectedWahana}
          initialLoad={initialLoad}
          delete_Wahana={delete_Wahana}
          selectedWahana={selectedWahana}
          handleDescription={handleDescription}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          containerVariants = {containerVariants }
          isOptionMenuOpen = {isOptionMenuOpen}
          handleSelectOption = { handleSelectOption }
          toggleOptionMenu = {toggleOptionMenu}
          cardVariants = {cardVariants}
        />
        <div className="flex justify-end m-6 items-center space-x-2">
          {/* Prev button */}
          <button
            className={`px-3 py-1 rounded ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          {/* Page number buttons */}
          {Array.from({ length: Number(totalPages) }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                className={`mx-1 px-3 py-1 rounded ${
                  page === pageNum ? "bg-[#564BF1] text-white" : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            )
          )}

          {/* Next button */}
          <button
            className={`px-3 py-1 rounded bg-gray-200`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === Number(totalPages)}
          >
            Next
          </button>
        </div>

        <ModalOverlay
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title="Create New Wahana"
        >
          <CreateWahanaForm onClose={() => setIsModalOpen(false)} />
        </ModalOverlay>

        {/* edit modal */}

        {editModalOpen && (
          <ModalOverlay
            isOpen={editModalOpen}
            setIsOpen={setEditModalOpen}
            title="Edit Wahana"
          >
            <EditWahanaForm
              onClose={() => setEditModalOpen(false)}
              selectedVenue={selectedVenue}
              selectedWahana={selectedWahana}
              wahanas={wahanas}

              // onSuccess={() => editWahanas(selectedWahana)}
            />
          </ModalOverlay>
        )}
      </div>
    </div>
  );
};

const WahanaMain = ({
  wahanaData,
  venues,
  selectedVenue,
  selectedWahana,
  setSelectedVenue,
  onCreateClick,
  onEditClick,
  loading,
  setSelectedWahana,
  delete_Wahana,
  initialLoad,
  handleDescription,
  searchInput,
  setSearchInput,
  containerVariants,
  isOptionMenuOpen,
  handleSelectOption,
  toggleOptionMenu,
  cardVariants
  
}) => {
  const SkeletonLoader = () => {
    return (
      <div className="animate-pulse flex flex-col p-4 bg-gray-400 rounded-lg shadow-md w-auto min-h-100 mt-8 mx-3">
        {/* title and delete btn */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-600 h-4 w-[25%] rounded-lg"></div>
          <div className="bg-gray-600 w-11 h-11 rounded-full"></div>
        </div>

        {/* Bottom section*/}
        <div className="space-y-2 mt-auto">
          <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          <div className="h-5 bg-gray-600 rounded w-1/2"></div>
          <div className="h-7 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  };

  // const containerVariants = createStaggerContainer(0.4);
  
  return (
    <div className="flex flex-auto p-6 sm:p-10">
      <div className="mx-auto flex w-full max-w-xs flex-auto flex-col sm:max-w-5xl">
        <div className="flex w-full max-w-xs flex-col justify-center sm:max-w-none sm:flex-row ">
          {/* <select
            value={selectedVenue || ""}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="bg-card text-icon px-4 min-h-12 rounded-full border border-border sm:w-36"
          >
            <option value="" className="min-h-12">
              All Wahanas
            </option>
            {venues?.map((venues) => (
              <option key={venues.id} value={venues.id} className="min-h-12">
                {venues.Title}
              </option>
            ))}
          </select> */}

<div className="sm:w-36 bg-card rounded-xl p-4 relative cursor-pointer">
                <div className="flex flex-auto">
                  <div className="flex flex-col absolute top-0 inset-x-0 rounded-xl bg-card z-20">
                    <div className="flex justify-between">
                      <div className="w-full">
                        <div
                          className="p-4 truncate flex"
                        onClick={toggleOptionMenu}
                        >
                          {selectedVenue.option}
                        

                        <div className = "ml-auto">
                        <HiOutlineSelector size={25}/>
                        </div>
                        </div>

                        {isOptionMenuOpen && (
                          <>
                            <div
                              className="py-4 hover:bg-hover last:rounded-b-xl"
                              onClick={() => handleSelectOption("All", "")}
                            >
                              <div className="px-4">All</div>
                            </div>
                            {venues.map(({ id, Title }) => (
                              <div
                                key={id}
                                className="py-4 hover:bg-hover last:rounded-b-xl"
                                onClick={() => handleSelectOption(Title, id)}
                              >
                                <div className="px-4">{Title}</div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex items-center">#</div>
                </div>
              </div>



          <div className="px-4 mt-4 sm:ml-4 sm:mt-0 sm:w-72 min-h-12 lg:min-w-[68%] md:min-w-[55%] rounded-full border border-border flex items-center bg-card text-icon">
            <HiMagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Search wahanas"
              className=" bg-transparent outline-none ml-4 lg:w-1000px"
              search={searchInput}
              // setSearchInput = {setSearchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <button className="mt-8 sm:ml-auto sm:mt-0" onClick={onCreateClick}>
            <div className="inline-flex items-center align-middle bg-secondary px-3 py-2 rounded-full text-white">
              + Add Wahana
            </div>
          </button>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : wahanaData && wahanaData.length === 0 ? (
          <div className="text-center text-gray-800 md:text-5xl text-3xl font-bold mt-10">
            No wahanas found!
          </div>
        ) : (
       


         

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
               className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
              >
            {wahanaData?.map((wahana) => (
               <motion.div key={wahana.id} variants={cardVariants}>
              <WahanaCard
                key={wahana.id}
                wahana={{
                  ...wahana,
                  title: wahana.ride_title,
                  price: wahana.price,
                  image: wahana.banner?.data,
                }}
                onEditClick={onEditClick}
                wahanaId={wahana.id}
                venueId={wahana.venueId}
                setSelectedWahana={setSelectedWahana}
                setSelectedVenue={setSelectedVenue}
                selectedVenue={selectedVenue}
                selectedWahana={selectedWahana}
                delete_Wahana={delete_Wahana}
                loading={loading}
                handleDescription={handleDescription}
              />
               </motion.div>
            ))}
             </motion.div>
         
        )}
      </div>
    </div>
  );
};

const WahanaCard = ({ wahana, delete_Wahana, loading, handleDescription }) => {
  const name = wahana.venueId.split("#")[0];
 // console.log("venue name is", name);

 // console.log("loginggg wahana check venue id ", wahana.venueId);
  // console.log("logging wahana price is",wahana?.price)
  // console.log("logging edited venue id is", venueId)
  //  console.log("wahana price is ", wahana.price)
  const bannerImage = wahana.image || wahanaDummy1;
  return (
    <div className="bg-card flex h-96 flex-col overflow-hidden rounded-2xl shadow relative group">
      <div className="flex flex-col relative">
        <div className="flex items-center justify-between p-6 z-10">
          <div className="rounded-full px-3 py-0.5 text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-blue-50">
            {name}
          </div>

          {/* <div className = "p-1" onClick={()=> setSelectedWahana(wahanaId)}>
          <button className =""  onClick={onEditClick}><FaEdit clasName ="opacity-80" size={25} onClick ={()=>setSelectedVenue(venueId)}/></button>
          </div> */}

          {/* <div className = " " onClick={()=> setSelectedWahana(wahana.id)}>
            <div className = "" onClick ={()=>setSelectedVenue(wahana.venueId)}> */}
          <div className="bg-blue-100 rounded-full h-7 w-7 text-center pt-1">
            <button
              onClick={() => delete_Wahana(wahana.id, wahana.venueId)}
              disabled={loading}
            >
              {loading ? (
                "Deleting..."
              ) : (
                <MdDelete className="text-blue-700" size={23} />
              )}
            </button>
          </div>
          {/* </div>
         </div> */}
        </div>
        <div
          className="absolute h-60 w-full inset-0 group-hover:scale-110 transition-all duration-500"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </div>
      <div className="mt-auto flex w-full flex-col p-6">
        <div className="text-lg font-medium">{wahana.ride_title}</div>
        <div className="text-secondary mt-0.5 line-clamp-1">
          <div
            className="flex"
            onClick={() => handleDescription(wahana.description)}
          >
            <p className="text-red-500 font-md">View description</p>
            <FaArrowRight className="mt-1 ml-1 text-red-500" />
          </div>
        </div>
        <div className="flex items-baseline whitespace-nowrap">
          <div className="mr-2 text-2xl">IDR</div>
          <div className="text-6xl font-semibold leading-tight tracking-tight">
            {parseInt(wahana?.priceICP)}
          </div>
          <div className="text-secondary text-2xl">/person</div>
          {/* <button className="mt-8 sm:ml-auto sm:mt-0" onClick={onEditClick}>
            <div className="inline-flex items-center align-middle bg-secondary px-3 py-2 rounded-full text-white">
              Edit Wahana
            </div>
           
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AdminWahana;
